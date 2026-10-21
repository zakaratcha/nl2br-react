import { render } from '@testing-library/react';
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

  it('converts line endings in every string child of several children', () => {
    const { container } = render(
      <Nl2br>
        {'aaa\nbbb'}
        {'ccc\nddd'}
      </Nl2br>
    );

    expect(container.innerHTML).toBe('aaa<br>bbbccc<br>ddd');
  });

  it('converts line endings in every string of an array of children', () => {
    const { container } = render(<Nl2br>{['aaa\nbbb', 'ccc\nddd']}</Nl2br>);

    expect(container.innerHTML).toBe('aaa<br>bbbccc<br>ddd');
  });

  it('converts line endings in nested arrays of children', () => {
    const { container } = render(
      <Nl2br>{[['aaa\nbbb'], ['ccc\nddd']]}</Nl2br>
    );

    expect(container.innerHTML).toBe('aaa<br>bbbccc<br>ddd');
  });

  it('renders non-string children as they are', () => {
    expect(renderToStaticMarkup(<Nl2br>{42}</Nl2br>)).toBe('42');
    expect(renderToStaticMarkup(<Nl2br>{<span>text</span>}</Nl2br>)).toBe(
      '<span>text</span>'
    );
    expect(renderToStaticMarkup(<Nl2br>{null}</Nl2br>)).toBe('');
    expect(renderToStaticMarkup(<Nl2br>{undefined}</Nl2br>)).toBe('');
    expect(renderToStaticMarkup(<Nl2br>{false}</Nl2br>)).toBe('');
  });

  it('renders an element child and a string child side by side', () => {
    const { container } = render(
      <Nl2br>
        <span>text</span>
        {'aaa\nbbb'}
      </Nl2br>
    );

    expect(container.innerHTML).toBe('<span>text</span>aaa<br>bbb');
  });

  it('does not warn about the key of the generated <br> elements', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    try {
      render(<Nl2br>{'aaa\nbbb'}</Nl2br>);
      render(<Nl2br>{'aaa\r\n\rbbb'}</Nl2br>);
      render(
        <Nl2br>
          {'aaa\nbbb'}
          {'ccc\nddd'}
        </Nl2br>
      );
      render(<Nl2br>{['aaa\nbbb', 'ccc\nddd']}</Nl2br>);

      expect(error).not.toHaveBeenCalled();
    } finally {
      error.mockRestore();
    }
  });
});
