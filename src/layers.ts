// @ts-nocheck
import paper, { view, Color } from 'paper';

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
    | 'uiLayer'
    | 'buttonLayer',
    paper.Layer
> = {};

export function initLayers() {
    layers.backgroundLayer = paper.project.activeLayer;
    layers.backgroundLayer.applyMatrix = false;

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

    layers.buttonLayer = new paper.Layer();
    layers.buttonLayer.applyMatrix = false;

    layers.gridLayer.pivot = new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);

    layers.tileLayer.pivot = new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);

    layers.uiLayer.pivot = new paper.Point(0, 0);
    layers.buttonLayer.pivot = new paper.Point(0, 0);
}

let scaleX = 1;
let scaleY = 1;

export function resizeLayers() {
    scaleX = paper.view.size.width / ((horizontalBlocks * horizontalBlockSize) + 300);
    scaleY = paper.view.size.height / ((verticalBlocks * verticalBlockSize) + 300);
    
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

    layers.uiLayer.position = new paper.Point(paper.view.center.x, paper.view.size.height - (scaleY * 75));
    layers.uiLayer.scaling = new paper.Point(scaleX, scaleY);

    layers.buttonLayer.position = new paper.Point(0, 0);
    layers.buttonLayer.scaling = new paper.Point(scaleX, scaleY);

}