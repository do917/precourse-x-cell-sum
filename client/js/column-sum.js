const columnSum = function(column) {
  // column is expected to be an array of all values of one column
  // each item in the array is expected to be a string type
  const sum = column.filter(num => num !== '' && isNum(num))
                    .reduce((sum, num) => sum + parseInt(num, 10), 0);

  if (column.some(eachBox => isNum(eachBox))) {
    return sum.toString();
  } else {
    return '';
  }
}

const isNum = function(phrase) {
  const numbers = '0123456789.-'
  if (phrase === '') {
    return false;
  } else {
  return phrase.split('').every(letter => numbers.includes(letter));
  }
}

module.exports = {
  columnSum: columnSum,
  isNum: isNum
};