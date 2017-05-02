const { columnSum,
        isOnlyNum } = require('../column-sum');

describe('columnSum()', () => {
  it('returns \'\' for an empty array', () => {
    expect(columnSum([])).toBe('');
  });

  it('returns \'\' for an array with only empty strings', () => {
    expect(columnSum(['', '', ''])).toBe('');
  });

  it('returns 38 for an array with numbers that also includes empty string', () => {
    expect(columnSum(['33', '5', ''])).toBe('38');
  });

  it('returns 38 for an array with numbers that also includes random strings', () => {
    expect(columnSum(['33', '5', 'randomwords', 'abc123'])).toBe('38');
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

describe('isOnlyNum()', () => {
  it('returns true for a string with only numbers', () => {
    expect(isOnlyNum('123')).toBe(true);
  });

  it('returns false for a string mixed with numbers', () => {
    expect(isOnlyNum('123string')).toBe(false);
  });
});