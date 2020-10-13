import paper from 'paper';
import { layers } from './layers';
import {
    horizontalBlocks,
    horizontalBlockSize,
    verticalBlocks,
    verticalBlockSize,
} from './constants';

import CopyImg  from './img/resources/Copy.png';

export function Drawlogo() {
    layers.logoLayer.activate();

    const copy = new paper.Raster(CopyImg);
    copy.position= new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) - 10);
    
    copy.scaling = new paper.Point(0.6, 0.6);

    layers.logoLayer.visible = false;
}