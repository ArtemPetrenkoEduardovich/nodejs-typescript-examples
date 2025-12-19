import { LogMethod } from './LogMethod';

export class Example {
  @LogMethod
  sum(a: number, b: number): number {
    return a + b;
  }

  @LogMethod
  countWords(text: string): number {
    return text.trim().split(/\s+/).length;
  }

  @LogMethod
  sortWordsByLength(words: string[]): string[] {
    return [...words].sort((a, b) => a.length - b.length);
  }

  @LogMethod
  fibonacci(n: number): number[] {
    const seq = [0, 1];
    for (let i = 2; i < n; i++) {
      seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq.slice(0, n);
  }

  @LogMethod
  isPalindrome(word: string): boolean {
    const normalized = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normalized === [...normalized].reverse().join('');
  }

  @LogMethod
  generatePassword(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    return Array.from({ length })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
  }
}
