import paper from 'paper';

import { eventEmitter } from './api/eventEmitter';

import { DrawBackground } from './background';
import { DrawGrid } from './grid'
import { DrawUI } from './ui';
import { playerState } from './state';
import { initLayers, layers } from './layers';
import { resizeConnrdinates } from './api/coordinate';

function onResize(event: any)
{
    DrawBackground();
    resizeConnrdinates();

    eventEmitter.emit("resize", event);
}

function onFrame(event: any)
{
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
    
    DrawBackground();
    DrawUI();
    DrawGrid();
    

    paper.view.onResize = onResize;
    paper.view.onFrame = onFrame;


    layers.uiLayer.activate();
    resizeConnrdinates();
}