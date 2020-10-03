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
    | 'mapBackgroundLayer'
    | 'gridLayer'
    | 'tileLayer'
    | 'trapLayer'
    | 'customLayer'
    | 'patternLayer'
    | 'guideLayer'
    | 'uiLayer'
    | 'logoLayer',
    paper.Layer
> = {};

export function initLayers() {
    layers.backgroundLayer = paper.project.activeLayer;
    layers.backgroundLayer.applyMatrix = false;

    layers.mapBackgroundLayer = new paper.Layer();
    layers.mapBackgroundLayer.applyMatrix = false;

    layers.gridLayer = new paper.Layer();
    layers.gridLayer.applyMatrix = false;

    layers.tileLayer = new paper.Layer();
    layers.tileLayer.applyMatrix = false;

    layers.trapLayer = new paper.Layer();
    layers.trapLayer.applyMatrix = false;

    layers.customLayer = new paper.Layer();
    layers.customLayer.applyMatrix = false;

    layers.patternLayer = new paper.Layer();
    layers.patternLayer.applyMatrix = false;

    layers.guideLayer = new paper.Layer();
    layers.guideLayer.applyMatrix = false;

    layers.uiLayer = new paper.Layer();
    layers.uiLayer.applyMatrix = false;

    layers.logoLayer = new paper.Layer();
    layers.logoLayer.applyMatrix = false;

    // 타일 백그라운드 설정
    const tileBackground = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(0, 0),
            new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
        )
    );
    tileBackground.fillColor = new paper.Color(1, 1, 1, 0);
    layers.tileLayer.addChild(tileBackground);

    const trapBackground = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(0, 0),
            new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
        )
    );
    trapBackground.fillColor = new paper.Color(1, 1, 1, 0);
    layers.trapLayer.addChild(trapBackground);

    const customBackground = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(0, 0),
            new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
        )
    );
    customBackground.fillColor = new paper.Color(1, 1, 1, 0);
    layers.customLayer.addChild(customBackground);
    // -----------------

    // ----- pivot -----
    const Pivot = new paper.Point(
        (horizontalBlocks * horizontalBlockSize) / 2,
        (verticalBlocks * verticalBlockSize) / 2);

    layers.mapBackgroundLayer.pivot = Pivot;
    layers.gridLayer.pivot          = Pivot;
    layers.tileLayer.pivot          = Pivot;
    layers.trapLayer.pivot          = Pivot;
    layers.customLayer.pivot        = Pivot;
    layers.patternLayer.pivot       = Pivot;
    layers.guideLayer.pivot         = Pivot;
    layers.logoLayer.pivot          = Pivot;

    layers.uiLayer.pivot            = new paper.Point(0, 0);
    // ----- pivot -----
}

let scaleX = 1;
let scaleY = 1;

export function resizeLayers() {
    scaleX = paper.view.size.width / ((horizontalBlocks * horizontalBlockSize) + 310);
    scaleY = paper.view.size.height / ((verticalBlocks * verticalBlockSize) + 550);

    if (scaleX >= 1) scaleX = 1;
    if (scaleY >= 1) scaleY = 1;

    if (scaleX / scaleY > 1) {
        scaleX = scaleY;
    }
    else {
        scaleY = scaleX;
    }

    const layerOffset = new paper.Point(paper.view.center.x, (scaleY * 700));

    layers.mapBackgroundLayer.position = layerOffset;
    layers.mapBackgroundLayer.scaling = new paper.Point(scaleX, scaleY);

    layers.gridLayer.position   = layerOffset;
    layers.gridLayer.scaling    = new paper.Point(scaleX, scaleY);

    layers.tileLayer.position   = layerOffset;
    layers.tileLayer.scaling    = new paper.Point(scaleX, scaleY);

    layers.trapLayer.position   = layerOffset;
    layers.trapLayer.scaling    = new paper.Point(scaleX, scaleY);

    layers.customLayer.position = layerOffset;
    layers.customLayer.scaling  = new paper.Point(scaleX, scaleY);

    layers.patternLayer.position = layerOffset;
    layers.patternLayer.scaling = new paper.Point(scaleX, scaleY);

    layers.guideLayer.position  = layerOffset;
    layers.guideLayer.scaling   = new paper.Point(scaleX, scaleY);

    layers.uiLayer.position     = new paper.Point(paper.view.center.x, (scaleY * 80));
    layers.uiLayer.scaling      = new paper.Point(scaleX, scaleY);

    layers.logoLayer.position   = layerOffset;
    layers.logoLayer.scaling    = new paper.Point(scaleX, scaleY);

}