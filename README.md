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

The component renders non-string children as they are. Numbers, `null`, `undefined`, booleans, arrays, objects and ready-made React elements are rendered unchanged:

```tsx
<Nl2br>{42}</Nl2br>; // 42
<Nl2br>{<span>text</span>}</Nl2br>; // <span>text</span>
```

Every string child is converted, no matter how many children there are and no matter whether they are passed directly, as an array or nested in arrays:

```tsx
<Nl2br>{'first line\nsecond line'}</Nl2br>; // first line<br>second line
<Nl2br>{'first\nsecond'}{'third\nfourth'}</Nl2br>; // both are converted
<Nl2br>{['first\nsecond', 'third\nfourth']}</Nl2br>; // both are converted
```

The `nl2br` function leaves anything that is not a string alone, too:

```tsx
nl2br(42); // 42
nl2br(null); // null
nl2br(undefined); // undefined
nl2br(false); // false
```

## License

[MIT](./LICENSE)
