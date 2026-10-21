const NEWLINE_PATTERN = /(\r\n|\r|\n)/;

export const splitNewlines = (value: string): string[] => value.split(NEWLINE_PATTERN);

export const isNewline = (part: string): boolean =>
  part === '\r\n' || part === '\r' || part === '\n';
