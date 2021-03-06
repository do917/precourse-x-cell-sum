const { columnSum,
        isNum } = require('../column-sum');

describe('columnSum()', () => {
  it('returns \'\' for an empty array', () => {
    expect(columnSum([])).toBe('');
  });

  it('returns \'\' for an array with only empty strings', () => {
    expect(columnSum(['', '', ''])).toBe('');
  });

  it('returns correct sum for an array with numbers that also includes empty string', () => {
    expect(columnSum(['33', '5', ''])).toBe('38');
  });

  it('returns correct sum for an array with numbers that also includes random strings', () => {
    expect(columnSum(['33', '5', 'randomwords', 'abc123'])).toBe('38');
  });

  it('returns \'\' for an array with no numbers', () => {
    expect(columnSum(['abc123', ''])).toBe('');
  });

  it('returns the number for a single item array', () => {
    expect(columnSum(['4'])).toBe('4');
  });

  it('returns the sum for array full of positive integers', () => {
    expect(columnSum(['4', '11', '5'])).toBe('20');
  });
  
  it('returns the sum for array full of pos/neg integers', () => {
    expect(columnSum(['4', '-15', '5'])).toBe('-6');
  });
});

describe('isNum()', () => {
  it('returns true for a string with only numbers', () => {
    expect(isNum('123')).toBe(true);
  });

  it('returns false for a string mixed with numbers', () => {
    expect(isNum('123string')).toBe(false);
  });

  it('returns false for a an empty string', () => {
    expect(isNum('')).toBe(false);
  });
});