import paper from 'paper';
import { layers } from './layers';

let gridGroup: paper.Group;
function createGrid()
{
    gridGroup = new paper.Group();
    gridGroup.applyMatrix = false;
    gridGroup.position = paper.view.center;

    console.log(paper.view.size.width)

    const lines: paper.Path[] = [];
    for (let x = 0; x < 10; x++)
    {
        for (let y = 0; y < 10; y++)
        {
            const line = new paper.Path();
            line.strokeColor = new paper.Color(1, 1, 1);
            line.strokeWidth = 1;
            line.segments = [
                new paper.Segment(new paper.Point(0, 0)),
                new paper.Segment(new paper.Point(x * 100, y * 100)),
            ];

            lines.push(line);
        }
    }

    gridGroup.addChildren(lines);
}

export function DrawGrid()
{
    layers.gridLayer.activate();

    createGrid();
}
