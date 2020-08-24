// @ts-nocheck
import paper, { view } from 'paper';
import { 
    horizontalBlocks,
    horizontalBlockSize,
    verticaBlocks
 } from './constants';

export const layers: Record<
    | 'backgroundLayer'
    | 'gridLayer'
    | 'tileLayer' 
    | 'uiLayer',
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

    //layers.uiLayer.scaling = new paper.Point(0.5, 0.5);
    layers.tileLayer.pivot = new paper.Point(0, 0);
    layers.gridLayer.pivot = new paper.Point(0, 0);
}

let width = 0;
let height = 0;
let marginX = 0;
let marginY = 0;
export function resizeLayers() {
    const screenRatio = paper.view.size.width / paper.view.size.height;

    const viewWidth = paper.view.size.width * paper.view.scaling.x;
    const viewHeight = paper.view.size.height * paper.view.scaling.y;

    marginX = paper.view.size.width * 0.1;
    marginY = paper.view.size.height * 0.1;

    layers.gridLayer.position = new paper.Point(marginX, marginY);
    layers.gridLayer.scaling = new paper.Point(1, 1);

    layers.tileLayer.position = new paper.Point(marginX, marginY);
    layers.tileLayer.scaling = new paper.Point(1, 1);
}