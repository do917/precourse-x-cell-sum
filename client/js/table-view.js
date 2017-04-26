const { getLetterRange } = require('./array-util');
const { removeChildren, createTR, createTH, createTD } = require('./dom-util');

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
  }

  initCurrentCell() {
    this.currentCellLocation = { col: 0, row: 0 };
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
        const value = this.model.getValue(position);
        const td = createTD(value);

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
      const value = 'NO VALUE';
      const td = createTD(value);
      tr.appendChild(td);
    }
    
    //fragment.appendChild(tr);
    this.sumRowEl.appendChild(tr);
  }

  attachEventHandlers() {
    this.sheetBodyEl.addEventListener('click', this.handleSheetClick.bind(this));
  }

  isColumnHeaderRow(row) {
    return row < 1;
  }

  handleSheetClick(evt) {
    const col = evt.target.cellIndex;
    const row = evt.target.parentElement.rowIndex;

    if (!this.isColumnHeaderRow(row)) {
      this.currentCellLocation = { col: col, row: row};
      this.renderTableBody();
    }
  }
}

module.exports = TableView;