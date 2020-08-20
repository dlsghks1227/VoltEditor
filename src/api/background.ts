import paper from 'paper';

let backgroundRect: paper.Path;
export function DrawBackground() {

    backgroundRect = new paper.Path();
    backgroundRect.fillColor = new paper.Color('#83e1c3');

    backgroundRect.segments = [
        new paper.Segment(new paper.Point(0, 0)),
        new paper.Segment(new paper.Point(paper.view.size.width * paper.view.scaling.x, 0)),
        new paper.Segment(new paper.Point(paper.view.size.width * paper.view.scaling.x,
            paper.view.size.height * paper.view.scaling.y)),
        new paper.Segment(new paper.Point(0, paper.view.size.height * paper.view.scaling.y)),
    ]
}