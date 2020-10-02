const resetButtonSound  = require('./sound/reset.wav');
const placeTileSound    = require('./sound/타일 배치했을 때.wav');
const buttonSound       = require('./sound/buttonClick.wav');
const printButtonSound  = require('./sound/프린트 눌렀을 때.wav');

export const resetButton       = new Audio(resetButtonSound);
export const placeTile         = new Audio(placeTileSound);
export const buttonClick       = new Audio(buttonSound);
export const printButton       = new Audio(printButtonSound);