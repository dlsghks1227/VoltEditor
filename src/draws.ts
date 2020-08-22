import paper from 'paper';

import { eventEmitter } from './api/eventEmitter';

import { initLayers, layers } from './layers';

import { DrawBackground } from './background';
import { DrawGrid } from './Grid';
import { DrawUI } from './ui';

function onResize(event: any)
{
    DrawBackground();
    eventEmitter.emit("resize", event);
}

let prevViewMatrix: paper.Matrix;
function onFrame()
{
    if (!paper.view.matrix.equals(prevViewMatrix)) {
        const inverted = paper.view.matrix.inverted();
        layers.backgroundLayer.matrix = inverted;
        
        prevViewMatrix = paper.view.matrix.clone();
      }
}

export function Draws()
{
    initLayers();
    
    DrawBackground();

    DrawGrid();
    DrawUI();

    paper.view.onResize = onResize;
    paper.view.onFrame = onFrame;
}