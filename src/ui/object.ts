import paper from 'paper';

import { layers }   from '../layers';
import { 
    horizontalBlockSize,
    verticalBlockSize 
}from  '../constants';

export function createObjectIcon(item: any) {
    layers.uiLayer.activate();

    const icon = item.icon.clone({ insert: false });
    return icon;
}

export function createObject(item: any) {
    layers.patternLayer.activate();
    const group = new paper.Group();

    const pattern = new paper.Raster(item.img);
    pattern.pivot = new paper.Point(0, 0);
    pattern.position = item.offset;

    const bound = new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(horizontalBlockSize, verticalBlockSize));
    bound.strokeColor = new paper.Color('white');
    bound.strokeColor.alpha = 0;
    bound.strokeWidth = 0.1;
    bound.fillColor = new paper.Color('white');
    bound.fillColor.alpha = 0.0001;
    bound.position = new paper.Point(0, 0);

    group.addChildren([bound, pattern]);
    group.visible = false;
    group.data.isTrap = item.isTrap;

    return group;
}