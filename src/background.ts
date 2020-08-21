import paper from 'paper';
import { eventEmitter } from './api/eventEmitter'

let backgroundRect: paper.Path;
function DrawBackground() {

    backgroundRect = new paper.Path();
    backgroundRect.fillColor = new paper.Color('#0f0f0f');

    backgroundRect.segments = [
        new paper.Segment(new paper.Point(0, 0)),
        new paper.Segment(new paper.Point(paper.view.size.width * paper.view.scaling.x, 0)),
        new paper.Segment(new paper.Point(paper.view.size.width * paper.view.scaling.x,
            paper.view.size.height * paper.view.scaling.y)),
        new paper.Segment(new paper.Point(0, paper.view.size.height * paper.view.scaling.y)),
    ]
}

function onResize(event: any) {
    DrawBackground();
    eventEmitter.emit("resize", event);

}

export function BackgroundRender() {
    DrawBackground();
    paper.view.onResize = onResize;
}