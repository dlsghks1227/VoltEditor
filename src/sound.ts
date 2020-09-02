

const backgroundSound   = require('./sound/배경음악.wav');
const resetButtonSound  = require('./sound/리셋 버튼 눌렀을 때.wav');
const placeTileSound    = require('./sound/타일 배치했을 때.wav');
const buttonSound       = require('./sound/타일 선택했을 때와 회전 버튼 누를 때.wav');
const printButtonSound  = require('./sound/프린트 눌렀을 때.wav');

export const background        = new Audio(backgroundSound);
export const resetButton       = new Audio(resetButtonSound);
export const placeTile         = new Audio(placeTileSound);
export const buttonClick       = new Audio(buttonSound);
export const printButton       = new Audio(printButtonSound);


// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
export function init()
{
    background.loop = true;
    background.autoplay = true;
    const backgroundPromise = background.play();

    if (backgroundPromise !== undefined){
        backgroundPromise.then(_ => {
        })
        .catch(error => {
        });
    }
}