build:
	npm run build;
zip:
	$$([ -f obsidian-by-d.zip ] && rm obsidian-by-d.zip || exit 0)
	zip obsidian-by-d.zip -r dist/ icons/ manifest.json options.* popup.*
package: build zip