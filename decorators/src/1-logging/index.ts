import { Example } from './Example';

export const apply = async () => {
  const example = new Example();
  example.sum(2, 3);
  example.countWords('TypeScript decorators are awesome');
  example.sortWordsByLength(['banana', 'apple', 'kiwi', 'strawberry']);
  example.fibonacci(7);
  example.isPalindrome('Level');
  example.generatePassword(8);
};
