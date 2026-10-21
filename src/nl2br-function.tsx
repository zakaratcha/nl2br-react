import { type ReactElement } from 'react';

import { isNewline, splitNewlines } from './split';

export type Nl2brResult<T> = T extends string ? Array<string | ReactElement> : T;

export function nl2br<T>(value: T): Nl2brResult<T> {
  if (typeof value !== 'string') {
    return value as Nl2brResult<T>;
  }

  const parts = splitNewlines(value as string).map((part, index) =>
    isNewline(part) ? <br key={index} /> : part
  );

  return parts as unknown as Nl2brResult<T>;
}
