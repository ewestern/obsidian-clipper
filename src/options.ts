import {Options, retrieveOptions} from "./shared";

function setFields(options: Options): void {
	let elt: HTMLInputElement | null;
	for (const [key, value] of Object.entries(options)) {
		switch (key) {
      case "vaultName":
        elt = document.querySelector(
          "input#vault-name"
        )! as HTMLInputElement;
				elt.value = value;
				break;
      case "renderingTemplate":
        elt = document.querySelector(
          "input#rendering-template"
        )! as HTMLInputElement;
				elt.value = value;
				break;
		}
	}
}

retrieveOptions().then(setFields);

document.querySelectorAll("input").forEach((node) => {
	node.addEventListener("input", (_: Event) => {
		switch (node.id) {
      case "vault-name":
        browser.storage.local.set({
          vaultName: node.value,
        });
        break;
      case "rendering-template":
        browser.storage.local.set({
          renderingTemplate: node.value,
        });
        break;
    }
	})
});
