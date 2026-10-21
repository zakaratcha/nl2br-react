import { type FC, Fragment, type ReactNode } from 'react';

import { isNewline, splitNewlines } from './split';

export interface Nl2brProps {
  children?: ReactNode;
}

export const Nl2br: FC<Nl2brProps> = ({ children }) => {
  if (typeof children !== 'string') {
    return children;
  }

  return splitNewlines(children).map((part, index) =>
    isNewline(part) ? <br key={index} /> : <Fragment key={index}>{part}</Fragment>
  );
};
