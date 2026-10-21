import { render } from '@testing-library/react';
import { isValidElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { Nl2br } from '../Nl2br';

describe('Nl2br', () => {
  it('renders a string with a line ending as text, <br> and text', () => {
    const { container } = render(<Nl2br>{'aaa\nbbb'}</Nl2br>);

    expect(container.innerHTML).toBe('aaa<br>bbb');
    expect(renderToStaticMarkup(<Nl2br>{'aaa\nbbb'}</Nl2br>)).toBe('aaa<br/>bbb');
  });

  it('understands \\n, \\r and \\r\\n line endings', () => {
    expect(renderToStaticMarkup(<Nl2br>{'a\nb'}</Nl2br>)).toBe('a<br/>b');
    expect(renderToStaticMarkup(<Nl2br>{'a\rb'}</Nl2br>)).toBe('a<br/>b');
    expect(renderToStaticMarkup(<Nl2br>{'a\r\nb'}</Nl2br>)).toBe('a<br/>b');
  });

  it('turns two consecutive line endings into two <br> elements', () => {
    expect(renderToStaticMarkup(<Nl2br>{'a\n\nb'}</Nl2br>)).toBe('a<br/><br/>b');
  });

  it('returns non-string children as they are', () => {
    const element = <span>text</span>;

    expect(Nl2br({ children: element })).toBe(element);
    expect(Nl2br({ children: 42 })).toBe(42);
    expect(Nl2br({ children: null })).toBeNull();
    expect(Nl2br({ children: undefined })).toBeUndefined();

    const array: ReactNode[] = [<span key="a">a</span>, <span key="b">b</span>];

    expect(Nl2br({ children: array })).toBe(array);
  });

  it('renders non-string children as they are', () => {
    expect(renderToStaticMarkup(<Nl2br>{42}</Nl2br>)).toBe('42');
    expect(renderToStaticMarkup(<Nl2br>{<span>text</span>}</Nl2br>)).toBe(
      '<span>text</span>'
    );
  });

  it('does not warn about the key of the generated <br> elements', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    try {
      render(<Nl2br>{'aaa\nbbb'}</Nl2br>);
      render(<Nl2br>{'aaa\r\n\rbbb'}</Nl2br>);

      expect(error).not.toHaveBeenCalled();
    } finally {
      error.mockRestore();
    }
  });

  it('wraps text chunks into keyed fragments', () => {
    const children = Nl2br({ children: 'a\nb' });

    expect(Array.isArray(children)).toBe(true);

    const parts = children as ReactNode[];

    expect(parts).toHaveLength(3);
    expect(isValidElement(parts[0])).toBe(true);
    expect(isValidElement(parts[1])).toBe(true);
    expect(isValidElement(parts[2])).toBe(true);
  });
});
