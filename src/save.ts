import paper from 'paper';

import { layers, resizeLayers } from './layers';
import {
    // downloadDataURL,
    downloadPDF
 } from './api/download';

export function saveTileToFile() {
    layers.mapBackgroundLayer.visible = true;
    layers.logoLayer.visible = true;

    layers.mapBackgroundLayer.scaling = new paper.Point(1, 1);
    layers.logoLayer.scaling = new paper.Point(1, 1);
    layers.trapLayer.scaling = new paper.Point(1, 1);
    layers.trapLayer.scaling = new paper.Point(1, 1);

    const clone = new paper.Group([
        layers.mapBackgroundLayer.clone(),
        layers.logoLayer.clone(),
        layers.tileLayer.clone(),
        layers.trapLayer.clone()
    ]);
    const raster = clone.rasterize();
    
    const test = raster.toDataURL();
    downloadPDF("Voltmap.pdf", test);
    
    resizeLayers();

    layers.mapBackgroundLayer.visible = false;
    layers.logoLayer.visible = false;

    clone.remove();
    raster.remove();
}