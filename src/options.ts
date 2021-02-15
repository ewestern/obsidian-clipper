import {Options, retrieveOptions} from "./shared";




function setFields(options: Options): void {
	for (const [key, value] of Object.entries(options)) {
		switch (key) {
			case "vaultName":
				let element = document.querySelector("input#vault-name")! as HTMLInputElement;
				element.value = value;
		}
	}
}

retrieveOptions().then(setFields);

document.querySelectorAll("input").forEach((node) => {
	node.addEventListener("input", (_: Event) => {
		switch (node.id) {
			case "vault-name":
				browser.storage.local.set({
					'vaultName': node.value
				});
				break;
		}
	})
});
