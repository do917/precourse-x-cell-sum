class TableModel {
  constructor(numCols=10, numRows=20) {
    this.numCols = numCols;
    this.numRows = numRows;
    this.data = {};
  }

  _getCellId(location) {
    return `${location.col}:${location.row}`;
  }

  getValue(location) {
    return this.data[this._getCellId(location)];
  }

  setValue(location, value) {
    this.data[this._getCellId(location)] = value;
  }

  getColValues(col) {
    const colValues = [];

    for (let row = 0; row < this.numRows; row++) {
      const currentLocation = {col: col, row: row};
      colValues.push(this.getValue(currentLocation));
    }

    return colValues;
  }
}

module.exports = TableModel;