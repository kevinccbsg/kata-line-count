const fs = require('fs');
const { cleanComments, cleanLines, countLines } = require('./../lib');

const comment = `
/* this a comment */
This is not a comment
`;

const expected = 'This is not a comment';

describe('Line counter', () => {

  it('is a /* */ line comment', () => {
    const str = comment;
    const result = cleanComments(str);
    expect(result).toEqual(expected);
  });

  it('removes empty lines', () => {
    const input = `
      // This is a comment
      this is not a comment
        /**
         * count
         */`;
    const text = 'this is not a comment';
    const result = cleanComments(input);
    expect(result).toEqual(text);
  });

  it('removes empty lines', () => {
    const noLines = '';
    const emptyLines = `


    `;
    const result = cleanLines(emptyLines);
    expect(result).toEqual(noLines);
  });

  it('removes empty lines with content between', () => {
    const text = 'Line between';
    const emptyLines = `

      Line between
      

    `;
    const result = cleanLines(emptyLines);
    expect(result).toEqual(text);
  });

  it('should count lines', () => {
    const lines = 4;
    const input = `1
    2
    3
    4`;
    const result = countLines(input);
    expect(result).toEqual(lines);
  });
});