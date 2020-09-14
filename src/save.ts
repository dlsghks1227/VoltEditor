import paper from 'paper';

import { layers } from './layers';
import { downloadDataURL } from './api/download';

export function saveTileToFile() {
    const clone = new paper.Group([layers.tileLayer.clone(), layers.trapLayer.clone()]);
    clone.scaling = new paper.Point(1, 1);
    const raster = clone.rasterize();

    const test = raster.toDataURL();
    downloadDataURL("Voltmap.png", test);
    clone.remove();
    raster.remove();
}