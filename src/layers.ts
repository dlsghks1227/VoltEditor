// @ts-nocheck
import paper from 'paper';

export const layers: Record<
    | 'backgroundLayer'
    | 'uiLayer'
    | 'gridLayer',
    paper.Layer
> = {};

export function initLayers() {
    layers.backgroundLayer = paper.project.activeLayer;
    layers.uiLayer = new paper.Layer();
    layers.gridLayer = new paper.Layer();

    layers.backgroundLayer.applyMatrix = false;

    layers.uiLayer.applyMatrix = false;
    layers.uiLayer.pivot = new paper.Point(0, 0);

    layers.gridLayer.applyMatrix = false;
    layers.gridLayer.pivot = new paper.Point(0, 0);
}