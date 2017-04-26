const TableModel = require('../table-model');

describe('table-model', () => {
  it('can set then get a value', () => {
    // set up the initial state
    const model = new TableModel();
    const location = { row: 3, col: 5 };

    // inspect the initial state
    expect(model.getValue(location)).toBeUndefined();

    // execute code under test
    model.setValue(location, 'foo');

    // inspect the resulting state
    expect(model.getValue(location)).toBe('foo');
  });


  it('can obtain all values in column', () => {
    // set up the initial state
    const model = new TableModel(1, 3);
    const cell1 = { row: 0, col: 0 };
    const cell2 = { row: 1, col: 0 };
    const cell3 = { row: 2, col: 0 };
    model.setValue(cell1, 5);
    model.setValue(cell2, 5);
    model.setValue(cell3, 5);

    //inspect the resulting state
    expect(model.getColValues(0)).toEqual([5, 5, 5]);
  });
});