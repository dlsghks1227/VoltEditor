// @ts-nocheck
import paper from 'paper';
import test from './sound/Windows User Account Control.wav'

import { getWorldPositionToGrid } from './api/coordinate';
import {
    horizontalBlocks,
    verticalBlocks,
    horizontalBlockSize,
    verticalBlockSize,
} from './constants';
import { layers } from './layers';

let audio = new Audio();
audio.src = test;

class PlayerState {
    activePattern: any = null;
    tile: any[] = new Array<number>();
    isButtonDown: Boolean = false;

    switchPattern(pattern: any) {
        const oldPattern = this.activePattern;
        if (oldPattern) {
            oldPattern.visible = false;
        }
        this.activePattern = pattern;
        this.isButtonDown = true;
    }

    placePattern(pattern: any, pos: paper.Point) {
        layers.tileLayer.activate();
        const ptn = pattern;
        ptn.position = pos
        .multiply(new paper.Point(horizontalBlockSize, verticalBlockSize))
        .add(
            new paper.Point((pattern.size.width / 2) * pattern.scaling.x, (pattern.size.height / 2) * pattern.scaling.y)
        );
        this.tile[pos.x + (pos.y * horizontalBlocks)] = ptn;
        layers.tileLayer.addChild(ptn);
    }

    onDown(event: any) {
    }

    onUp(event: any) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        if (this.activePattern && !this.isButtonDown) {
            const pos = getWorldPositionToGrid(layers.gridLayer.globalToLocal(event.point));
            if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                if(!this.tile[pos.x + (pos.y * horizontalBlocks)]) {
                    this.placePattern(this.activePattern.clone(), pos);
                }
                else
                {
                    this.tile[pos.x + (pos.y * horizontalBlocks)].remove();
                    this.placePattern(this.activePattern.clone(), pos);
                }
            }
        }
        this.isButtonDown = false;
    }

    onMove(event: any) {
        if (this.activePattern && !this.isButtonDown) {
            layers.tileLayer.activate();
            this.activePattern.visible = true;
            const pos = layers.gridLayer
            .globalToLocal(event.point)
            this.activePattern.position = pos;
        }
    }

    onRotate(angle: number) {
        if (this.activePattern) {
            layers.tileLayer.activate();
            this.activePattern.rotate(angle);
        }
    }

    onFilp(isVertical: Boolean) {
    }

    onReset() {
        layers.tileLayer.removeChildren();
        const tileBackground = new paper.Path.Rectangle(
            new paper.Rectangle(
                new paper.Point(0, 0),
                new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
            )
        );
        tileBackground.fillColor = new paper.Color(1, 1, 1, 0.00001);
        layers.tileLayer.addChild(tileBackground);
    }
}

export const playerState = new PlayerState();