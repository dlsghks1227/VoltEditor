import paper from 'paper';
import { CreatePattern } from './ui/createPattern'

import img from './logo.svg'
import { eventEmitter } from './api/eventEmitter';

let patternUI: paper.Group;
function createPatternUIBackground()
{
    patternUI = new paper.Group();
    patternUI.applyMatrix = false;
    patternUI.position = new paper.Point(30, 0);

    const patternUIBackground = new paper.Path();
    patternUIBackground.strokeColor = new paper.Color(1, 1, 1);
    patternUIBackground.strokeWidth = 150;
    patternUIBackground.strokeCap = 'round';
    patternUIBackground.segments = [
        new paper.Segment(new paper.Point(
            300,
            (paper.view.size.height * paper.view.scaling.y))),
        new paper.Segment(new paper.Point(
            (paper.view.size.width * paper.view.scaling.x) - 300, 
            (paper.view.size.height * paper.view.scaling.y))),
    ];

    patternUI.addChild(patternUIBackground);
}

export function DrawUI()
{
    eventEmitter.on('resize', createPatternUIBackground);
    createPatternUIBackground();
    
    const ptn = new paper.Raster(img);
    ptn.scale(0.5);
    ptn.getAverageColor(new paper.Point(100, 100))
    
    CreatePattern(ptn, 20, () => {});
}