import Mercury from "@postlight/mercury-parser";
import * as mustache from "mustache";

import {
  ClipOption,
  Clipping,
  Message,
  MESSAGE_GET_OPTIONS,
  MESSAGE_SELECT_OPTION,
  MESSAGE_SEND_CLIP,
  OPTION_CLIP_LINK,
  OPTION_CLIP_PAGE,
  OPTION_CLIP_TEMPLATE,
  OPTION_CLIP_SELECTION,
  retrieveOptions,
  SelectOptionMessage,
} from "./shared";

function getSelectionText(): string {
  return window.getSelection()!.toString();
}

function getLinkContent(url: string): string {
  return `Link:\n${url}`;
}

function getOptions(): ClipOption[] {
  switch (document.contentType) {
    case "application/pdf":
    case "image/jpeg":
      return [OPTION_CLIP_LINK];
    case "text/html":
      var options: ClipOption[] = [
        OPTION_CLIP_LINK,
        OPTION_CLIP_PAGE,
        OPTION_CLIP_TEMPLATE,
      ];
      if (getSelectionText() !== "") {
        options.push(OPTION_CLIP_SELECTION);
      }
      return options;
    default:
      return [];
  }
}

async function getClipping(option: ClipOption): Promise<Clipping> {
  switch (option) {
    case OPTION_CLIP_LINK:
      return {
        title: document.title,
        content: getLinkContent(document.URL),
      };
    case OPTION_CLIP_SELECTION:
      return {
        title: document.title,
        content: getSelectionText(),
      };
    case OPTION_CLIP_PAGE:
      let result = await Mercury.parse(document.URL, {
        contentType: "markdown",
      });
      return {
        title: result.title!,
        content: result.content!,
      };
    case OPTION_CLIP_TEMPLATE:
    default:
      return {
        title: document.title,
        content: await doTpl(),
      };
  }
}

async function doTpl(): Promise<string> {
  let options = await retrieveOptions();
  let data = await Mercury.parse(document.URL, {
    contentType: "markdown",
  });
	let sel = getSelectionText();
	let content =
    mustache.render(options.renderingTemplate, {
      ...data,
      link: getLinkContent(document.URL),
      selection: sel!==""?sel:data.content,
    }) || data.content!;
  return content;
}

function messageListener(obj: object) {
  let message = obj as Message;
  switch (message.messageType) {
    case MESSAGE_SELECT_OPTION:
      return getClipping((message as SelectOptionMessage).value).then(sendClip);
    default:
      return null;
  }
}

async function sendClip(clip: Clipping) {
  return browser.runtime
    .sendMessage({
      messageType: MESSAGE_SEND_CLIP,
      value: clip,
    })
    .then((_) => {
      browser.runtime.onMessage.removeListener(messageListener);
    });
}

browser.runtime.onMessage.addListener(messageListener);

browser.runtime.sendMessage({
  messageType: MESSAGE_GET_OPTIONS,
  value: getOptions(),
});
