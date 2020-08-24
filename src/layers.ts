// @ts-nocheck
import paper, { view } from 'paper';

import {
    horizontalBlocks,
    horizontalBlockSize,
    verticalBlocks,
    verticalBlockSize,
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

    const tileBackground = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(0, 0),
            new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
        )
    );
    tileBackground.fillColor = new paper.Color(1, 1, 1, 0.00001);
    layers.tileLayer.addChild(tileBackground);

    layers.uiLayer = new paper.Layer();
    layers.uiLayer.applyMatrix = false;

    layers.uiLayer.pivot = new paper.Point(0, 0);
    layers.gridLayer.pivot = new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);

    layers.tileLayer.pivot = new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);
}

export function resizeLayers() {
    layers.gridLayer.position = paper.view.center;
    layers.gridLayer.scaling = new paper.Point(1, 1);

    layers.tileLayer.position = paper.view.center;
    layers.tileLayer.scaling = new paper.Point(1, 1);

    layers.uiLayer.position = new paper.Point(paper.view.center.x, paper.view.size.height - 75);
    layers.uiLayer.scaling = new paper.Point(1, 1);
}