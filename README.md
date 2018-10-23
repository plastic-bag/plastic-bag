# Plastic Bag

[![npm version](https://badge.fury.io/js/plastic-bag.svg)](https://badge.fury.io/js/plastic-bag)
[![Build Status](https://travis-ci.org/plastic-bag/plastic-bag.svg?branch=master)](https://travis-ci.org/plastic-bag/plastic-bag)
[![Known Vulnerabilities](https://snyk.io/test/github/plastic-bag/plastic-bag/badge.svg?targetFile=package.json)](https://snyk.io/test/github/plastic-bag/plastic-bag?targetFile=package.json)
[![BCH compliance](https://bettercodehub.com/edge/badge/plastic-bag/plastic-bag?branch=master)](https://bettercodehub.com/)

Plastic Bag is a Custom Element that uses different strategies to load Frontend applications/components.

## Installation

### Package

```sh
npm install plastic-bag
```

Registering the Custom Element `plastic-bag`:

```
import 'plastic-bag';
// or
require('plastic-bag');
```

### CDN

```html
<script src="https://unpkg.com/plastic-bag/dist/index.js" />
```

## Examples

```html
<plastic-bag type="script" src="/app.js">
    <div id="app-example">Loading...</div>
</plastic-bag>
```

```html
<plastic-bag type="html-fragment" src="/header.html">
</plastic-bag>
```

## Options

### src

URI of the resource that will be loaded.

### type

Each `type` uses a different strategy to load the application source. Default value: `"script"`.

- `"script"`: fetchs and execute `src`.
- `"iframe"`: uses `iframe` to display `src`.
- `"html-fragment"`: fetchs `src`, puts its content inside `plastic-bag` and executes `script` tags if present.

### Content

The content will be displayed as soon the tag is attatched.
