import paper from 'paper';
import { CreatePattern } from './ui/createPattern'
import { eventEmitter } from './api/eventEmitter'



function createPatternUIBackground()
{
    const patternMenuBackground = new paper.Path();
    patternMenuBackground.strokeColor = new paper.Color(1, 1, 1);
    patternMenuBackground.strokeWidth = 150;
    patternMenuBackground.strokeCap = 'round';
    patternMenuBackground.segments = [
        new paper.Segment(new paper.Point(
            (paper.view.size.width * paper.view.scaling.x / 2) - (window.innerWidth / 4),
            (paper.view.size.height * paper.view.scaling.y))),
        new paper.Segment(new paper.Point(
            (paper.view.size.width * paper.view.scaling.x / 2) + (window.innerWidth / 4), 
            (paper.view.size.height * paper.view.scaling.y))),
    ];
}

export function UIRender()
{
    eventEmitter.on("resize", createPatternUIBackground);
    createPatternUIBackground();
}