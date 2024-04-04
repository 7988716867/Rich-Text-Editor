let cursorIndicator = document.getElementById('cursor-indicator');
let fontColorInput = document.querySelector('input[type="color"]');
let fontSizeInput = document.querySelector('input[type="number"]');

function execCmd(command) {
  document.execCommand(command, false, null);
}

function highlightText() {
  let selection = window.getSelection();
  if (selection.rangeCount > 0) {
    let range = selection.getRangeAt(0);
    document.execCommand('hiliteColor', false, 'yellow');
  }
}

function setFontColor(color) {
  execCmd('foreColor', color);
}

function setFontSize(size) {
  execCmd('fontSize', size);
}

document.addEventListener('mousemove', (event) => {
  cursorIndicator.style.left = `${event.clientX}px`;
});

document.addEventListener('keydown', () => {
  setTimeout(() => {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0).getBoundingClientRect();
    cursorIndicator.style.top = `${range.top}px`;
  }, 100);
});

let undoStack = [];
let redoStack = [];

function undo() {
  if (undoStack.length > 0) {
    let command = undoStack.pop();
    redoStack.push(command);
    document.execCommand('undo');
  }
}

function redo() {
  if (redoStack.length > 0) {
    let command = redoStack.pop();
    undoStack.push(command);
    document.execCommand('redo');
  }
}

function saveDocument() {
  let content = document.getElementById('editor').innerHTML;
  localStorage.setItem('savedDocument', content);
}

function loadDocument() {
  let content = localStorage.getItem('savedDocument');
  if (content) {
    document.getElementById('editor').innerHTML = content;
  }
}
