const handler = require('../index');

test('should return greeting', () => {
  expect(handler.getGreeting()).toBe('Hello World!');
});