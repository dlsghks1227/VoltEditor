// @ts-nocheck
import paper from 'paper';

import { getWorldPositionToGrid } from './api/coordinate';
import {
    horizontalBlocks,
    verticalBlocks,
    horizontalBlockSize,
    verticalBlockSize,
} from './constants';
import { layers } from './layers';

import GuideLine from './img/resources/Guide Line.png';

import * as sound from './sound';

class PlayerState {
    activePattern: any = null;
    tile: any[] = new Array<number>();
    isButtonDown: Boolean = false;

    gridGuideLine: paper.Raster;

    init() {
        this.gridGuideLine = new paper.Raster(GuideLine);
        this.gridGuideLine.position = new paper.Point(47, 47);
        this.gridGuideLine.visible = false;

        layers.guideLayer.addChild(this.gridGuideLine);
        layers.guideLayer.addChild(this.activePattern);
    }

    switchPattern(pattern: any) {

        sound.buttonClick.pause();
        sound.buttonClick.currentTime = 0;
        sound.buttonClick.play();

        layers.tileLayer.activate();
        const oldPattern = this.activePattern;
        if (oldPattern) {
            oldPattern.visible = false;
        }

        if (!pattern) {
            this.gridGuideLine.visible = false;
            return;
        }
        
        this.activePattern = pattern;
        this.activePattern.opacity = 0.7;
        this.activePattern.position = new paper.Point(47, 47);

        this.gridGuideLine.visible = true;
        this.activePattern.visible = true;
        this.isButtonDown = true;
    }

    placePattern(pattern: any, pos: paper.Point) {

        sound.placeTile.pause();
        sound.placeTile.currentTime = 0;
        sound.placeTile.play();

        layers.tileLayer.activate();
        const ptn = pattern;
        ptn.position = pos
            .multiply(new paper.Point(horizontalBlockSize, verticalBlockSize))
            .add(
                new paper.Point(
                    (horizontalBlockSize / 2) * ((pattern.scaling.x > 0) ? pattern.scaling.x : -pattern.scaling.x),
                    (verticalBlockSize / 2) * ((pattern.scaling.y > 0) ? pattern.scaling.y : -pattern.scaling.y))
            );
        this.tile[pos.x + (pos.y * horizontalBlocks)] = ptn;
        ptn.opacity = 1;
        layers.tileLayer.addChild(ptn);
    }

    onDown(event: any) {
    }

    onUp(event: any) {
        if (this.activePattern && !this.isButtonDown) {
            const pos = getWorldPositionToGrid(layers.gridLayer.globalToLocal(event.point));
            if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                if (!this.tile[pos.x + (pos.y * horizontalBlocks)]) {
                    this.placePattern(this.activePattern.clone(), pos);
                }
                else {
                    this.tile[pos.x + (pos.y * horizontalBlocks)].remove();
                    this.placePattern(this.activePattern.clone(), pos);
                }
            }
        }
        this.isButtonDown = false;
    }

    onMove(event: any) {
        if (this.activePattern && !this.isButtonDown) {
            const pos = getWorldPositionToGrid(layers.gridLayer.globalToLocal(event.point));
            if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                const tilePos = pos.multiply(new paper.Point(horizontalBlockSize, verticalBlockSize))
                    .add(
                        new paper.Point(
                            (horizontalBlockSize / 2) * ((this.activePattern.scaling.x > 0) ? this.activePattern.scaling.x : -this.activePattern.scaling.x),
                            (verticalBlockSize / 2) * ((this.activePattern.scaling.y > 0) ? this.activePattern.scaling.y : -this.activePattern.scaling.y))
                    );
                this.gridGuideLine.position = tilePos;
                this.activePattern.position = tilePos;
            }
        }
    }

    onRotate(angle: number) {

        sound.buttonClick.pause();
        sound.buttonClick.currentTime = 0;
        sound.buttonClick.play();

        if (this.activePattern) {
            layers.tileLayer.activate();
            this.activePattern.rotate(angle);
        }
    }

    onFilp(isVertical: Boolean) {
        if (this.activePattern) {
            layers.tileLayer.activate();
            if (isVertical) {
                this.activePattern.scale(new paper.Point(1, -1));
            }
            else {
                this.activePattern.scale(new paper.Point(-1, 1));
            }
        }
    }

    onReset() {

        sound.resetButton.pause();
        sound.resetButton.currentTime = 0;
        sound.resetButton.play();

        layers.tileLayer.removeChildren();
        const tileBackground = new paper.Path.Rectangle(
            new paper.Rectangle(
                new paper.Point(0, 0),
                new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
            )
        );
        tileBackground.fillColor = new paper.Color(1, 1, 1, 0);
        layers.tileLayer.addChild(tileBackground);
    }
}

export const playerState = new PlayerState();