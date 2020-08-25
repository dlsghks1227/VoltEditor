import paper from 'paper';
import {
    horizontalBlocks,
    verticalBlocks,
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
    layers.gridLayer.activate();
    gridGroup = new paper.Group();
    gridGroup.applyMatrix = false;
    gridGroup.position = new paper.Point(0, 0);

    const lines: paper.Path[] = [];
    for (let i = 0; i <= horizontalBlocks; i++)
    {
        const segment = [
            new paper.Point(i * horizontalBlockSize, 0),
            new paper.Point(i * horizontalBlockSize, verticalBlockSize * verticalBlocks),
        ]
        const line = new paper.Path(segment);
        line.strokeColor = new paper.Color(1, 1, 1, 0.5);
        line.strokeWidth = 1;
        line.strokeCap = 'round';
        line.opacity = 1;
        lines.push(line);
    }

    for (let i = 0; i <= verticalBlocks; i++)
    {
        const segment = [
            new paper.Point(0, i * verticalBlockSize),
            new paper.Point(
                horizontalBlockSize * horizontalBlocks, i * verticalBlockSize),
        ]
        const line = new paper.Path(segment);
        line.strokeColor = new paper.Color(1, 1, 1, 0.5);
        line.strokeWidth = 1;
        line.strokeCap = 'round';
        line.opacity = 1;
        lines.push(line);
    }

    gridGroup.addChildren(lines);
    layers.gridLayer.addChild(gridGroup);
}

export function DrawGrid()
{   
    createGrid();
}
