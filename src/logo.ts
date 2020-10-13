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

    const copy  = new paper.Raster(CopyImg);
    const logoText = new paper.PointText({
        content: 'https://heidelbaer.de/impressum/',
        fillColor: new paper.Color(1, 1, 1, 1),
        fontWeight: 'bold',
        fontSize: 18
    });
    copy.addChild(logoText);
    copy.scaling = new paper.Point(0.6, 0.6);
    copy.position= new paper.Point(
        (((horizontalBlocks * horizontalBlockSize) / 2) - ((260 - 96) * 0.6)),
        (verticalBlocks * verticalBlockSize) - 10);
    logoText.scaling = new paper.Point(0.6, 0.6);
    logoText.position= new paper.Point(
        (((horizontalBlocks * horizontalBlockSize) / 2) + ((96 + 161) * 0.6)),
        (verticalBlocks * verticalBlockSize) - 11);

    layers.logoLayer.visible = false;
}