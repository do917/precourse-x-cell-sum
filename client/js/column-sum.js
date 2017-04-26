const columnSum = function(column) {
  // column is expected to be an array of all values of one column
  // each item in the array is expected to be a string type
  const sum = column.filter(num => num !== '')
                    .reduce((sum, num) => sum + parseInt(num, 10), 0);

  if (column.every(num => num === '') || isNaN(sum)) {
    return '';
  } else {
    return sum.toString();
  }
}

module.exports = {
  columnSum: columnSum
};