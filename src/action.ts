import {
		Message
	, ClipOption
	, MESSAGE_GET_OPTIONS
	, MESSAGE_SELECT_OPTION
	, OPTION_CLIP_LINK
	, OPTION_CLIP_PAGE
	, OPTION_CLIP_SELECTION
	, GetOptionsMessage
	, Clipping
	, MESSAGE_SEND_CLIP
	, SendClipMessage
	, retrieveOptions
} from "./shared";

function activateOptions(opts: ClipOption[]): void {
	opts.forEach((value: ClipOption) => {
		switch (value) {
			case OPTION_CLIP_LINK:
				document.querySelector("#clip-link")?.classList.add("active")
				break;
			case OPTION_CLIP_PAGE:
				document.querySelector("#clip-page")?.classList.add("active")
				break;
			case OPTION_CLIP_SELECTION:
				document.querySelector("#clip-selection")?.classList.add("active")
				break;
			default:
				break;
		}
	})
}

function listenForClicks(sender: browser.runtime.MessageSender): void {
	document.querySelectorAll("li").forEach((node) => {
		let nodeId = node.id
		function listener(event: Event) {
			let e = event as MouseEvent
			switch (nodeId) {
				case "clip-link":
					makeSelection(sender.tab!.id!, OPTION_CLIP_LINK);
					break
				case "clip-selection":
					makeSelection(sender.tab!.id!, OPTION_CLIP_SELECTION);
					break
				case "clip-page":
					makeSelection(sender.tab!.id!, OPTION_CLIP_PAGE);
					break
			}
			e.target?.removeEventListener("click", listener);
		}
		node.addEventListener("click", listener);
	})
}

function makeSelection(id: number, opt: ClipOption) {
	browser.tabs.sendMessage(id, {
		messageType: MESSAGE_SELECT_OPTION,
		value: opt
	})
}

async function openObsidian(clip: Clipping) {
	let options = await retrieveOptions();
	let modifiedTitle = clip.title
		.split(":").join("")
		.split("/").join("");
	let encodedTitle = encodeURI(modifiedTitle);
	let encodedVault = encodeURI(options.vaultName);
	let encodedContent = encodeURIComponent(clip.content);
	let uri = `obsidian://new?vault=${encodedVault}&name=${encodedTitle}&content=${encodedContent}`;
	browser.tabs.create({url: uri, active: true}).then((tab: browser.tabs.Tab) => {
		// TODO: maybe close tab??
		console.log(tab)
	});
}

function listenForMessages(obj: object, sender: browser.runtime.MessageSender): void {
	let message = obj as Message
	switch (message.messageType) {
		case MESSAGE_GET_OPTIONS:
			activateOptions((message as GetOptionsMessage).value)
			listenForClicks(sender);
			break
		case MESSAGE_SEND_CLIP:
			openObsidian((message as SendClipMessage).value);
			break;
	}
}

browser.runtime.onMessage.addListener(listenForMessages);
browser.tabs.executeScript(undefined, {file: "/dist/content.js"});
