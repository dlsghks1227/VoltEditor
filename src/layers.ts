// @ts-nocheck
import paper from 'paper';

export const layers: Record<
    | 'backgroundLayer'
    | 'uiLayer'
    | 'gridLayer',
    | 'tileLayer', 
    paper.Layer
> = {};

export function initLayers() {
    layers.backgroundLayer = paper.project.activeLayer;
    layers.backgroundLayer.applyMatrix = false;

    //layers.uiLayer.pivot = new paper.Point(0, 0);

    layers.gridLayer = new paper.Layer();
    layers.gridLayer.applyMatrix = false;

    layers.tileLayer = new paper.Layer();
    layers.tileLayer.applyMatrix = false;

    layers.uiLayer = new paper.Layer();
    layers.uiLayer.applyMatrix = false;
    //layers.gridLayer.pivot = new paper.Point(0, 0);
}