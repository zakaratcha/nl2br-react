# nl2br-react

React component that turns newline characters into `<br>` elements, like PHP's `nl2br`.

## Installation

```bash
npm install nl2br-react
```

`react` (18 or 19) is a peer dependency, so it is not installed automatically — use the version of React your application already uses.

## Usage

### Component

Wrap the text you want to split into the `Nl2br` component:

```tsx
import { Nl2br } from 'nl2br-react';

const Example = () => <Nl2br>{'first line\nsecond line'}</Nl2br>;
```

The component renders `first line`, a `<br>` and `second line`.

The default export is the component as well:

```tsx
import Nl2br from 'nl2br-react';
```

### Function

If you need the result as data instead of markup, use the `nl2br` function. It returns an array of strings and `<br>` elements in the order of the split:

```tsx
import { nl2br } from 'nl2br-react';

const parts = nl2br('first line\nsecond line');
// ['first line', <br key="1" />, 'second line']
```

## Line endings

All the usual line endings are recognized:

| Sequence  | Result           |
| --------- | ---------------- |
| `\n`      | one `<br>`       |
| `\r`      | one `<br>`       |
| `\r\n`    | one `<br>`       |

Two consecutive line endings produce two `<br>` elements.

## Non-string values

Both the component and the function leave anything that is not a string alone. Numbers, `null`, `undefined`, booleans, arrays, objects and ready-made React elements are returned as they are, without copying:

```tsx
nl2br(42); // 42
nl2br(null); // null
nl2br(undefined); // undefined
nl2br(false); // false
```

The `Nl2br` component renders non-string children as they are:

```tsx
<Nl2br>{42}</Nl2br>; // 42
<Nl2br>{<span>text</span>}</Nl2br>; // <span>text</span>
```

## License

[MIT](./LICENSE)
