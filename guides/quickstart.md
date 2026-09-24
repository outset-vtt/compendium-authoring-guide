# Your first compendium

Clone this repository, enter its directory, and run:

```sh
git clone https://github.com/outset-vtt/compendium-authoring-guide.git
cd compendium-authoring-guide
npm ci
npm run validate:examples
```

You should see four validated reading documents and one book.

## 1. Inspect one source entry

Open [the source bundle](../examples/lantern-marsh/source/bundle.json). Find `signal-lantern` inside `lantern-marsh-core`. Its identity is `lantern-marsh-core:item:signal-lantern`. The `data.description` holds the complete source prose; the entry is not an automated resource tracker.

## 2. Read its formatted edition

Open [the item edition](../examples/lantern-marsh/editions/item-signal-lantern.publication.md). It keeps the capacity, cost, duration, recharge condition, free shutter change, breakage restriction, and both signal colors. The edition links Marshlight by its exact identity. Formatting has not changed the source rules.

Its `sourceHash` comes from [the compiled snapshot](../examples/lantern-marsh/source/compiled-packs.json). Do not calculate or guess a replacement hash when editing prose.

## 3. Make a presentation-only edit

Copy the editions directory to a new working directory, change emphasis or a heading title while retaining its `{#section-id}`, and validate against the same snapshot:

```sh
cp -R examples/lantern-marsh/editions my-editions
npm run validate -- my-editions --snapshot examples/lantern-marsh/source/compiled-packs.json
```

Review your text against the source as well. The validator will not catch a changed quantity in otherwise valid Markdown.

## 4. Add references and book order

The [introduction](../examples/lantern-marsh/editions/introduction.publication.md) shows a source-pack-bound reference document. The [book](../examples/lantern-marsh/editions/lantern-marsh.book.md) orders it before the entry editions. Copy the pattern, keep identities unique, and validate the complete corpus after adding documents.

## 5. Author new rules

For new entries or changed mechanics, edit a supported source bundle in Outset's authoring workspace and use its diagnostics. Obtain the newly compiled packs through an available authorized artifact/export surface before binding reading editions. A raw bundle is not a compiled snapshot. If your deployment does not expose the snapshot you need, retain a draft without claiming source-bound validation. See [delivery](delivery.md).
