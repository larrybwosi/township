import { describe, it, expect } from 'vitest';
import { add, formatAppName } from './utils';

describe('utils in web app', () => {
  it('should correctly add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should correctly format the app name to uppercase', () => {
    expect(formatAppName('web')).toBe('WEB');
  });
});
