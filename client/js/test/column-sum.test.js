const { columnSum } = require('../column-sum');

describe('columnSum()', () => {
  it('returns \'\' for an array with only empty strings', () => {
    expect(columnSum(['', '', ''])).toBe('');
  });

  it('returns \'\' for array including any non numbers', () => {
    expect(columnSum([33, 5, ''])).toBe('');
  });

  it('returns the number for a single item array', () => {
    expect(columnSum(['4'])).toBe('4');
  });

  it('returns the number for a single item array', () => {
    expect(columnSum(['4', '11', '5'])).toBe('20');
  });
  
  it('returns the number for a single item array', () => {
    expect(columnSum(['4', '-15', '5'])).toBe('-6');
  });
});