# jsonviewer

## What?

jsonviewer is a blazingly fast component for creating cascade json view, written in solidjs.

## Features:
- fast, using solidjs
- easy to use
- lazy rendering, only renders the cascade you opened
- easy copy, double click on property to copy value
- full control on styling, using css variables
- control preview length


## Installation

yarn
`yarn add @frank-tomato/jsonviewer`

npm
`npm install @frank-tomato/jsonviewer`

## Usage 

### Solid

```tsx
import { JsonView } from '@frank-tomato/jsonviewer';

const data = {
  foo: 1,
  bar: 'text',
  arr: [
    'text in array',
    2,
    {}
  ],
  obj:{
    text: 'nested text',
    bool: true,
    null: null
  }
};

const json = JSON.stringify(data);

...

<JsonView json={json} {...props} />
```

### javascript

```ts
import { renderJsonView } from '@frank-tomato/jsonviewer';

const data = {
  foo: 1,
  bar: 'text',
  arr: [
    'text in array',
    2,
    {}
  ],
  obj:{
    text: 'nested text',
    bool: true,
    null: null
  }
};

const json = JSON.stringify(data);

renderJsonView(
  document.getElementById('jsonviewer'), 
  { json: json, ...props }
);

```

### Preview

![preview image](/assets/preview.PNG)

## Props

### `defaultOpen`

type: `boolean`

Should the component open first cascade when mounted.

default: false

Solid
```tsx
<JsonView json={json} defaultOpen />
```

JS
```ts
renderJsonView(
  document.getElementById('jsonviewer'), 
  { json: data, defaultOpen: true }
);
```

#### **showcase**
defaultOpen: false

![defaultOpen-false](/assets/defaultOpen-false.PNG)

defaultOpen: true

![preview image](/assets/preview.PNG)

### `depthIndicator`

type: `boolean`

Show depth indicator or not.

default: true

Solid
```tsx
<JsonView json={json} depthIndicator={false} />
```

JS
```ts
renderJsonView(
  document.getElementById('jsonviewer'), 
  { json: data, depthIndicator: false }
);
```

#### **showcase**

depthIndicator: true

![depthIndicator-true](/assets/depthIndicator-true.PNG)

depthIndicator: false

![depthIndicator-false](/assets/depthIndicator-false.PNG)

### `maxLength`

type: `number`

Control the length of the preivew text.

default: 100

Solid
```tsx
<JsonView json={json} maxLength={50} />
```

JS
```ts
renderJsonView(
  document.getElementById('jsonviewer'), 
  { json: data, maxLength: 50 }
);
```

#### **showcase**
maxLength: 100

![maxLength-100](/assets/maxLength-100.PNG)

maxLength: 50

![maxLength-50](/assets/maxLength-50.PNG)

## Styling 
To change the colors, simply overide the css variables of `.jsonView__details`

### Example

Change the marker color to red
```css
.jsonView__container{
  --marker-color: red;
}
```
All css variables visualized
![css-variables](/assets/css-variables.PNG)

### css variables default value

```css
  --name-color: rgb(20 133 189);
  --preview-name-color: rgb(163, 163, 163);
  --preview-color: rgb(107, 107, 107);
  --marker-color: rgb(170, 170, 170);
  --marker-open-color: rgb(8, 200, 226);
  --content-string-color: rgb(7, 124, 1);
  --content-boolean-color: rgb(125, 13, 153);
  --content-number-color: rgb(125, 13, 153);
  --content-null-color: rgb(109, 109, 109);
  --left-border-indicator-color: rgb(184, 182, 182);
```
### Font example

Change font
```css
.jsonView__container{
  font-family: ...;
}
```