import paper from 'paper';

import { layers } from './layers';
import { downloadDataURL } from './api/download';

export function saveTileToFile() {

    const raster = layers.tileLayer.rasterize();

    const test = raster.toDataURL();
    downloadDataURL("test.png", test);
}