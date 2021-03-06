import paper from 'paper';

import { eventEmitter } from './api/eventEmitter';

import { 
    DrawBackground,
    DrawMapBackground
 } from './background';
import { DrawGrid }     from './Grid'
import { DrawUI }       from './ui';
import { Drawlogo }     from './logo';
import { playerState }  from './state';
import { initLayers, layers, resizeLayers } from './layers';

function onResize(event: any)
{
    DrawBackground();
    resizeLayers();

    eventEmitter.emit("resize", event);
}

let prevViewMatrix: paper.Matrix;
function onFrame(event: any)
{
    if (!paper.view.matrix.equals(prevViewMatrix)) {
        const inverted = paper.view.matrix.invert();
        layers.backgroundLayer.matrix = inverted;

        prevViewMatrix = paper.view.matrix.clone();
    }
}


export function Draws()
{
    paper.view.onMouseDown = (event: any) => {
        playerState.onDown(event);
    }
    
    paper.view.onMouseUp = (event: any) => {
        playerState.onUp(event);
    }
    
    paper.view.onMouseMove = (event: any) => {
        playerState.onMove(event);
    }

    initLayers();
    resizeLayers();
    
    DrawBackground();
    DrawMapBackground();

    Drawlogo();
    
    DrawUI();
    DrawGrid();

    paper.view.onResize = onResize;
    paper.view.onFrame = onFrame;

    resizeLayers();
    playerState.init();

    layers.uiLayer.activate();
    layers.guideLayer.activate();
}