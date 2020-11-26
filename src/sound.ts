const resetButtonSound  = require('./sound/reset.wav');
const placeTileSound    = require('./sound/tileLocated.wav');
const buttonSound       = require('./sound/buttonClick.wav');
const paintButtonSound  = require('./sound/paint.wav');
const eraserButtonSound = require('./sound/erase.wav');
const printButtonSound  = require('./sound/print.wav');

export const resetButton    = new Audio(resetButtonSound);
export const placeTile      = new Audio(placeTileSound);
export const buttonClick    = new Audio(buttonSound);
export const paintButton    = new Audio(paintButtonSound);
export const eraserButton   = new Audio(eraserButtonSound);
export const printButton    = new Audio(printButtonSound);