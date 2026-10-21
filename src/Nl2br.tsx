import { Children, Fragment, type ReactElement, type ReactNode } from 'react';

import { isNewline, splitNewlines } from './split';

export interface Nl2brProps {
  children?: ReactNode;
}

const splitString = (value: string): ReactNode[] =>
  splitNewlines(value).map((part, index) =>
    isNewline(part) ? <br key={index} /> : part
  );

export const Nl2br = ({ children }: Nl2brProps): ReactElement => (
  <Fragment>
    {Children.map(children, (child): ReactNode =>
      typeof child === 'string' ? splitString(child) : child
    )}
  </Fragment>
);
