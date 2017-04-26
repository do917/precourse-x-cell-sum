const { getLetterRange } = require('./array-util');
const { removeChildren, createTR, createTH, createTD } = require('./dom-util');
const { columnSum } = require('./column-sum');

class TableView {
  constructor(model) {
    this.model = model;
  }

  init() {
    this.initDomReferences();
    this.initCurrentCell();
    this.renderTable();
    this.attachEventHandlers();
  }

  initDomReferences() {
    this.headerRowEl = document.querySelector('#table-head');
    this.sheetBodyEl = document.querySelector('#table-body');
    this.sumRowEl = document.querySelector('#sum-row');
    this.formulaBarEl = document.querySelector('#formula-bar');
  }

  initCurrentCell() {
    this.currentCellLocation = { col: 0, row: 0 };
    this.renderFormulaBar();
  }

  normalizeValueForRendering(value) {
    return value || '';
  }

  renderFormulaBar() {
    const currentCellValue = this.model.getValue(this.currentCellLocation);
    this.formulaBarEl.value = this.normalizeValueForRendering(currentCellValue);
    this.formulaBarEl.focus();
  }

  renderTable() {
    this.renderTableHeader();
    this.renderTableBody();
    this.renderRowSum();
  }

  renderTableHeader() {
    removeChildren(this.headerRowEl);
    getLetterRange('A', this.model.numCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEl.appendChild(th))
  }

  isCurrentCell(col, row) {
    return this.currentCellLocation.col === col &&
           this.currentCellLocation.row === row;
  }

  renderTableBody() {
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < this.model.numRows; row++) {
      const tr = createTR();
      for (let col = 0; col < this.model.numCols; col++) {
        const position = { col: col, row: row };
        const value = this.model.getValue(position) || '' ;
        const td = createTD(value);
        this.model.setValue(position, value);

        if (this.isCurrentCell(col, row)) {
          td.className = 'current-cell';
        }

        tr.appendChild(td);
      }
      fragment.appendChild(tr);
    }
    removeChildren(this.sheetBodyEl);
    this.sheetBodyEl.appendChild(fragment);
  }

  renderRowSum() {
    //const fragment = document.createDocumentFragment();
    const tr = createTR();
    
    for (let col = 0; col < this.model.numCols; col++) {
      const position = { col: col, 'cellSum':'cellSum' };
      const value = columnSum(this.model.getColValues(col));
      const td = createTD(value);
      tr.appendChild(td);
    }
    
    //fragment.appendChild(tr);
    removeChildren(this.sumRowEl);
    //console.log(this.model.getColValues(0));
    this.sumRowEl.appendChild(tr);
  }

  attachEventHandlers() {
    this.sheetBodyEl.addEventListener('click', this.handleSheetClick.bind(this));
    this.formulaBarEl.addEventListener('keyup', this.handleFormulaBarChange.bind(this));
  }

  handleFormulaBarChange(evt) {
    const value = this.formulaBarEl.value;
    this.model.setValue(this.currentCellLocation, value);
    this.renderTableBody();
  }

  handleSheetClick(evt) {
    const col = evt.target.cellIndex;
    const row = evt.target.parentElement.rowIndex;
    
    this.currentCellLocation = { col: col, row: row};
    this.renderTableBody();
    this.renderFormulaBar();
    this.renderRowSum();
  }
}

module.exports = TableView;