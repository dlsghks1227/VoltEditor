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
        (verticalBlocks * verticalBlockSize) - copy.size.height);
        
    layers.logoLayer.visible = false;
}