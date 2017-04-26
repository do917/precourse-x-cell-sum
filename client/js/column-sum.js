const columnSum = function(column) {
  // column is expected to be an array of all values of one column
  // each item in the array is expected to be a string type
  const sum = column.reduce(function(sum, num) {
    return sum + parseInt(num, 10);
  }, 0);

  if (isNaN(sum)) {
    return '';
  } else {
    return sum.toString();
  }
}

module.exports = {
  columnSum: columnSum
};