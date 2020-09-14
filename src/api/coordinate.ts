import paper from 'paper';
import {
    horizontalBlockSize,
    verticalBlockSize
} from '../constants';

export function getWorldPositionToGrid(
    position: paper.Point,
): paper.Point {
    return position.divide(new paper.Point(horizontalBlockSize, verticalBlockSize)).floor();
}

export function getWorldPositionToLine(
    position: paper.Point,
): paper.Point {
    return position.divide(new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2)).floor();
}

export function isometric(position: paper.Point, mousePos: paper.Point)
: paper.Point {
    const checkEven = (((position.x + position.y) & 1) === 1 ? 1 : -1);
    const direction = Math.floor(((mousePos.x - position.x) * checkEven) + (mousePos.y - position.y));

    let offsetX = 0;
    let offsetY = 0;

    if (checkEven === -1) {
        offsetX = direction * checkEven;
        offsetY = direction + 1;
    } else {
        offsetX = direction;
        offsetY = direction;
    }

    return position.add(new paper.Point(offsetX, offsetY));
}