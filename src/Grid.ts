import paper from 'paper';
import {
    horizontalBlockSize,
    verticalBlockSize
} from './constants'

import { layers } from './layers';

let gridRaster: paper.Raster;

export function toggleGrid()
{
    gridRaster.visible = !gridRaster.visible;
}

let gridGroup: paper.Group;

function createGrid()
{
    gridGroup = new paper.Group();
    gridGroup.applyMatrix = false;
    gridGroup.position = new paper.Point(0, 0);

    const lines: paper.Path[] = [];
    const horizontal = paper.view.size.width / horizontalBlockSize;
    const vertical = paper.view.size.height / verticalBlockSize;

    for (let i = 0; i < horizontal; i++)
    {
        const segment = [
            new paper.Point(i * horizontalBlockSize, 0),
            new paper.Point(i * horizontalBlockSize, paper.view.size.height),
        ]
        const line = new paper.Path(segment);
        line.strokeColor = new paper.Color(1, 1, 1);
        line.strokeWidth = 1;
        line.strokeCap = 'round';
        line.opacity = 1;
        lines.push(line);
    }

    for (let i = 0; i < vertical; i++)
    {
        const segment = [
            new paper.Point(0, i * verticalBlockSize),
            new paper.Point(paper.view.size.width, i * verticalBlockSize),
        ]
        const line = new paper.Path(segment);
        line.strokeColor = new paper.Color(1, 1, 1);
        line.strokeWidth = 1;
        line.strokeCap = 'round';
        line.opacity = 1;
        lines.push(line);
    }

    gridGroup.addChildren(lines);
}

export function DrawGrid()
{   
    layers.gridLayer.activate();
    createGrid();
}
