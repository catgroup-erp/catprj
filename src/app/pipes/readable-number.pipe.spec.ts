import { ReadableNumberPipe } from './readable-number.pipe';

describe('ReadableNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new ReadableNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
