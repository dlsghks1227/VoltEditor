import paper from 'paper';
import {
    horizontalBlockSize,
    verticalBlockSize
} from '../constants';
import { layers } from '../layers';

export function getWorldPositionToGrid(
    position: paper.Point,
): paper.Point {
    return position.divide(new paper.Point(horizontalBlockSize, verticalBlockSize)).floor();
}

export function resizeConnrdinates() {
    // layers.uiLayer.position = new paper.Point(0, 0);
    // layers.uiLayer.scaling = new paper.Point(1, 1);

    // layers.gridLayer.position = new paper.Point(0, 0);
    // layers.gridLayer.scaling = new paper.Point(1, 1);

    // layers.tileLayer.position = new paper.Point(0, 0);
    // layers.tileLayer.scaling = new paper.Point(1, 1);
}