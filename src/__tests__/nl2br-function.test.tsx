import { isValidElement } from 'react';
import { describe, expect, it } from 'vitest';

import { nl2br, type Nl2brBreak } from '../nl2br-function';

const isBr = (node: unknown): node is Nl2brBreak =>
  isValidElement(node) && node.type === 'br';

describe('nl2br', () => {
  it('splits a string into text chunks and <br> elements', () => {
    const result = nl2br('aaa\nbbb\nccc\nddd');

    expect(result).toHaveLength(7);
    expect(result[0]).toBe('aaa');
    expect(isBr(result[1])).toBe(true);
    expect(result[2]).toBe('bbb');
    expect(isBr(result[3])).toBe(true);
    expect(result[4]).toBe('ccc');
    expect(isBr(result[5])).toBe(true);
    expect(result[6]).toBe('ddd');
  });

  it('keeps the separators in order and keys every <br>', () => {
    const result = nl2br('aaa\nbbb\nccc\nddd');

    expect(result.filter((node) => isBr(node)).map((node) => node.key)).toEqual([
      '1',
      '3',
      '5'
    ]);
  });

  it('returns text chunks as plain strings, not elements', () => {
    const result = nl2br('aaa\nbbb');

    expect(typeof result[0]).toBe('string');
    expect(typeof result[2]).toBe('string');
    expect(isValidElement(result[0])).toBe(false);
    expect(isValidElement(result[2])).toBe(false);
  });

  it('returns non-string values as they are', () => {
    expect(nl2br(42)).toBe(42);
    expect(nl2br(undefined)).toBeUndefined();
    expect(nl2br(null)).toBeNull();
    expect(nl2br(false)).toBe(false);
  });

  it('returns the very same array, object and React element', () => {
    const array = ['a', 'b'];
    const object = { a: 1 };
    const element = <span>text</span>;

    expect(nl2br(array)).toBe(array);
    expect(nl2br(object)).toBe(object);
    expect(nl2br(element)).toBe(element);
  });

  it('understands \\r\\n line endings', () => {
    const result = nl2br('aaa\r\nbbb');

    expect(result).toHaveLength(3);
    expect(result[0]).toBe('aaa');
    expect(isBr(result[1])).toBe(true);
    expect(result[2]).toBe('bbb');
  });

  it('understands lone \\r line endings', () => {
    const result = nl2br('aaa\rbbb');

    expect(result).toHaveLength(3);
    expect(result[0]).toBe('aaa');
    expect(isBr(result[1])).toBe(true);
    expect(result[2]).toBe('bbb');
  });

  it('turns two consecutive line endings into two <br> elements', () => {
    const result = nl2br('aaa\n\nbbb');

    expect(result).toHaveLength(5);
    expect(result[0]).toBe('aaa');
    expect(isBr(result[1])).toBe(true);
    expect(result[2]).toBe('');
    expect(isBr(result[3])).toBe(true);
    expect(result[4]).toBe('bbb');
  });
});
