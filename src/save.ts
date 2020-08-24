import paper from 'paper';

import { layers } from './layers';
import { downloadDataURL } from './api/download';

export function saveTileToFile() {
    const clone = layers.tileLayer.clone();
    clone.scaling = new paper.Point(1, 1);
    const raster = clone.rasterize();

    const test = raster.toDataURL();
    downloadDataURL("test.png", test);
    clone.remove();
    raster.remove();
}