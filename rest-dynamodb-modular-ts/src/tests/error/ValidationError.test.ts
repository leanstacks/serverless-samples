import { ValidationError } from '../../error/ValidationError';

describe('ValidationError', () => {
  test('should have name', () => {
    const validationError = new ValidationError();
    expect(typeof validationError.name).toBe('string');
    expect(validationError.name).toEqual('ValidationError');
  });

  test('should have code', () => {
    const validationError = new ValidationError();
    expect(typeof validationError.code).toBe('number');
    expect(validationError.code).toEqual(400);
  });

  test('should have status', () => {
    const validationError = new ValidationError();
    expect(typeof validationError.status).toBe('number');
    expect(validationError.status).toEqual(400);
  });

  test('should have message', () => {
    const errorMessage = 'error message';
    const validationError = new ValidationError(errorMessage);
    expect(typeof validationError.message).toBe('string');
    expect(validationError.message).toEqual(errorMessage);
  });
});
