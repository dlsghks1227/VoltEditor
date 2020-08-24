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