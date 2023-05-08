# Markdown to Prismic RichText

For when you're importing a bunch of markdown into a prismic richtext field. Based on the import docs from [Prismic.io](https://user-guides.prismic.io/import/import-full-import-reference).

## Usage

```shell
yarn add @gijsbotje/md-to-prismic-richtext
// or
npm i @gijsbotje/md-to-prismic-richtext
```

```javascript 

import convert from '@gijsbotje/md-to-prismic-richtext';

const richText = convert(yourMarkdown);

// for example use prismic-dom to render
RichText.asHtml(richText);
```

## Development 

```bash 

yarn test --watch

```

Big thanks to [ueno-llc](https://github.com/ueno-llc/) for creating [markdown-to-prismic-richtext](https://github.com/ueno-llc/markdown-to-prismic-richtext).
This is a direct copy of that package, with a fix for code blocks. 