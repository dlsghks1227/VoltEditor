// @ts-nocheck
import paper from 'paper';

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
    | 'patternLayer'
    | 'uiLayer'
    | 'guideLayer',
    paper.Layer
> = {};

export function initLayers() {
    layers.backgroundLayer = paper.project.activeLayer;
    layers.backgroundLayer.applyMatrix = false;

    layers.gridLayer = new paper.Layer();
    layers.gridLayer.applyMatrix = false;

    layers.tileLayer = new paper.Layer();
    layers.tileLayer.applyMatrix = false;

    layers.patternLayer = new paper.Layer();
    layers.patternLayer.applyMatrix = false;

    const tileBackground = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(0, 0),
            new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
        )
    );
    tileBackground.fillColor = new paper.Color(1, 1, 1, 0);
    layers.tileLayer.addChild(tileBackground);

    layers.guideLayer = new paper.Layer();
    layers.guideLayer.applyMatrix = false;

    layers.uiLayer = new paper.Layer();
    layers.uiLayer.applyMatrix = false;

    layers.gridLayer.pivot = new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);

    layers.tileLayer.pivot = new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);

    layers.patternLayer.pivot = new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);

    layers.guideLayer.pivot = new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);

    layers.uiLayer.pivot = new paper.Point(0, 0);
}

let scaleX = 1;
let scaleY = 1;

export function resizeLayers() {
    scaleX = paper.view.size.width / ((horizontalBlocks * horizontalBlockSize) + 261);
    scaleY = paper.view.size.height / ((verticalBlocks * verticalBlockSize) + 500);

    if (scaleX >= 1) scaleX = 1;
    if (scaleY >= 1) scaleY = 1;

    if (scaleX / scaleY > 1) {
        scaleX = scaleY;
    }
    else {
        scaleY = scaleX;
    }

    layers.gridLayer.position = paper.view.center;
    layers.gridLayer.scaling = new paper.Point(scaleX, scaleY);

    layers.tileLayer.position = paper.view.center;
    layers.tileLayer.scaling = new paper.Point(scaleX, scaleY);

    layers.patternLayer.position = paper.view.center;
    layers.patternLayer.scaling = new paper.Point(scaleX, scaleY);

    layers.guideLayer.position = paper.view.center;
    layers.guideLayer.scaling = new paper.Point(scaleX, scaleY);

    layers.uiLayer.position = new paper.Point(paper.view.center.x, (scaleY * 80));
    layers.uiLayer.scaling = new paper.Point(scaleX, scaleY);

}