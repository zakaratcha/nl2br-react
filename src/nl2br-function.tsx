import { type ComponentProps, type ReactElement } from 'react';

import { isNewline, splitNewlines } from './split';

export type Nl2brBreak = ReactElement<ComponentProps<'br'>, 'br'>;

export type Nl2brResult<T> = T extends string ? Array<string | Nl2brBreak> : T;

export function nl2br<T>(value: T): Nl2brResult<T>;
export function nl2br(value: unknown): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  return splitNewlines(value).map((part, index) =>
    isNewline(part) ? <br key={index} /> : part
  );
}
