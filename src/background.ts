import paper from 'paper';
import { layers } from './layers';
import {
    horizontalBlocks,
    horizontalBlockSize,
    verticalBlocks,
    verticalBlockSize,
} from './constants';

import mapBackgroundImg from './img/resources/MapBackground.png';

let backgroundRect: paper.Path;
export function DrawBackground() {
    layers.backgroundLayer.activate();
    if (backgroundRect)
    {
        backgroundRect.remove();
    }
    backgroundRect = new paper.Path();
    backgroundRect.fillColor = new paper.Color('#000000');

    backgroundRect.segments = [
        new paper.Segment(new paper.Point(0, 0)),
        new paper.Segment(new paper.Point(paper.view.size.width * paper.view.scaling.x, 0)),
        new paper.Segment(new paper.Point(paper.view.size.width * paper.view.scaling.x,
            paper.view.size.height * paper.view.scaling.y)),
        new paper.Segment(new paper.Point(0, paper.view.size.height * paper.view.scaling.y)),
    ]
}

export function DrawMapBackground() {
    layers.mapBackgroundLayer.activate();
    
    const mapBackground = new paper.Raster(mapBackgroundImg);
    mapBackground.position= new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);
        
    layers.mapBackgroundLayer.visible = false;
}