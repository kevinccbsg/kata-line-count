const {promisify} = require('util');

const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const { getLineNumber } = require('./../lib');

describe('e2e', () => {
  it('should return 3 lines', () => {
    const expected = 3;
    const input = `
      public interface Dave {
        /**
         * count
         */
        int countLines(File inFile); // not the real signature
      }`;
    const result = getLineNumber(input);
    expect(result).toEqual(expected);
  });

  it('should return 3 lines', () => {
    const expected = 3;
    const input = `
      // This is a comment
      public interface Dave {
        /**
         * count
         */
        int countLines(File inFile); // not the real signature
      }`;
    const result = getLineNumber(input);
    expect(result).toEqual(expected);
  });

  it('should return 5 lines', () => {
    const expected = 5;
    const input = `
       /*****
       * This is a test program with 5 lines of code
       * \/* no nesting allowed!
       //*****//***/// Slightly pathological comment ending...
      
      public class Hello {
          public static final void main(String [] args) { // gotta love Java
              // Say hello
            System./*wait*/out./*for*/println/*it*/("Hello/*");
          }
      
      }`;
    const result = getLineNumber(input);
    expect(result).toEqual(expected);
  });

  it('should return 5 lines', async () => {
    const expected = 5;
    const input = await readFileAsync(__dirname + '/../mocks/program-5-lines.java');
    const result = getLineNumber(input.toString());
    expect(result).toEqual(expected);
  });

  it('should return 22 lines', async () => {
    const expected = 22;
    const input = await readFileAsync(__dirname + '/../mocks/felipe-fun-functional.js');
    const result = getLineNumber(input.toString());
    expect(result).toEqual(expected);
  });
});