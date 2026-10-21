import { describe, expect, it } from 'vitest';

import * as packageRoot from '../index';

describe('package root', () => {
  it('exports the Nl2br component and the nl2br function', () => {
    expect(typeof packageRoot.Nl2br).toBe('function');
    expect(typeof packageRoot.nl2br).toBe('function');
  });

  it('exports Nl2br as the default export', () => {
    expect(packageRoot.default).toBe(packageRoot.Nl2br);
  });
});
