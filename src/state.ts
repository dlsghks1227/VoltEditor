// @ts-nocheck
import paper from 'paper';

import { getWorldPositionToGrid, getWorldPositionToLine, isometric } from './api/coordinate';
import {
    horizontalBlocks,
    verticalBlocks,
    horizontalBlockSize,
    verticalBlockSize,
} from './constants';
import { layers } from './layers';

import GuideLine from './img/resources/Guide Line.png';
import GuideLine2 from './img/resources/Guide Line-2.png';

import * as sound from './sound';

export enum TileState {
    Default = 0,
    Trap,
    Custom,
}

class PlayerState {
    activePattern:  any = null;
    
    tile:           number[] = new Array<number>();
    customTile:     number[] = new Array<number>();
    trapTile:       number[] = new Array<number>();
    
    isButtonDown:   Boolean = false;
    tileState:      TileState = TileState.Default;

    gridGuideLine: paper.Raster;
    gridGuideLine2: paper.Raster;

    init() {
        this.gridGuideLine = new paper.Raster(GuideLine);
        this.gridGuideLine.position = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);
        this.gridGuideLine.scaling = new paper.Size(horizontalBlockSize / 94, verticalBlockSize / 94);
        this.gridGuideLine.visible = false;

        this.gridGuideLine2 = new paper.Raster(GuideLine2);
        this.gridGuideLine2.position = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);
        this.gridGuideLine2.visible = false;

        layers.guideLayer.addChild(this.gridGuideLine);
        layers.guideLayer.addChild(this.gridGuideLine2);
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
        this.tileState = pattern.data.tileState;

        this.activePattern = pattern;

        this.activePattern.applyMatrix = false;
        this.activePattern.visible = true;

        this.activePattern.rotation = 0;
        this.activePattern.opacity = 0.7;

        switch (this.tileState) {
            case TileState.Default:
                // 일반 타일
                {
                    layers.tileLayer.activate();

                    this.activePattern.position = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);
                    this.gridGuideLine.position = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);

                    this.gridGuideLine.visible = true;
                    this.gridGuideLine2.visible = false;
                    break;
                }
            case TileState.Trap:
                // 트랩 타일
                {
                    layers.trapLayer.activate();

                    this.activePattern.position = new paper.Point(horizontalBlockSize, verticalBlockSize);

                    this.gridGuideLine.visible = false;
                    this.gridGuideLine2.visible = true;
                    break;
                }
            case TileState.Custom:
                {
                    layers.customLayer.activate();

                    this.activePattern.position = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);
                    this.gridGuideLine.position = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);

                    this.gridGuideLine.visible = true;
                    this.gridGuideLine2.visible = false;
                    break;
                }
        }

        this.isButtonDown = true;
    }

    placePattern(pattern: any, pos: paper.Point, tileState: TileState) {

        sound.placeTile.pause();
        sound.placeTile.currentTime = 0;
        sound.placeTile.play();

        const ptn = pattern;

        switch (tileState) {
            case TileState.Default:
                // 일반 타일
                {
                    layers.tileLayer.activate();

                    ptn.position = pos
                        .multiply(new paper.Point(horizontalBlockSize, verticalBlockSize))
                        .add(
                            new paper.Point(
                                (horizontalBlockSize / 2)   * ((pattern.scaling.x > 0) ? pattern.scaling.x : -pattern.scaling.x),
                                (verticalBlockSize / 2)     * ((pattern.scaling.y > 0) ? pattern.scaling.y : -pattern.scaling.y))
                        );
                    this.tile[pos.x + (pos.y * horizontalBlocks)] = ptn;
                    ptn.opacity = 1;
                    layers.tileLayer.addChild(ptn);
                    break;
                }
            case TileState.Trap:
                // 트랩 타일
                {
                    layers.trapLayer.activate();

                    ptn.position = pos.multiply(new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2));
                    this.trapTile[pos.x + (pos.y * horizontalBlocks)] = ptn;
                    ptn.opacity = 1;
                    layers.trapLayer.addChild(ptn);
                    break;
                }
            case TileState.Custom:
                {
                    layers.customLayer.activate();

                    ptn.position = pos
                        .multiply(new paper.Point(horizontalBlockSize, verticalBlockSize))
                        .add(
                            new paper.Point(
                                (horizontalBlockSize / 2)   * ((pattern.scaling.x > 0) ? pattern.scaling.x : -pattern.scaling.x),
                                (verticalBlockSize / 2)     * ((pattern.scaling.y > 0) ? pattern.scaling.y : -pattern.scaling.y))
                        );
                    this.customTile[pos.x + (pos.y * horizontalBlocks)] = ptn;
                    ptn.opacity = 1;
                    layers.customLayer.addChild(ptn);

                    break;
                }
        }
    }

    onDown(event: any) {
    }

    onUp(event: any) {
        if (this.activePattern && !this.isButtonDown) {
            switch (this.tileState) {
                case TileState.Default:
                    // 일반 타일
                    {
                        const pos = getWorldPositionToGrid(layers.gridLayer.globalToLocal(event.point));
                        if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                            if (!this.tile[pos.x + (pos.y * horizontalBlocks)]) {
                                this.placePattern(this.activePattern.clone(), pos, this.tileState);
                            } else {
                                this.tile[pos.x + (pos.y * horizontalBlocks)].remove();
                                this.placePattern(this.activePattern.clone(), pos, this.tileState);
                            }
                        }
                        break;
                    }
                case TileState.Trap:
                    // 트랩 타일
                    {
                        const pos = getWorldPositionToLine(layers.gridLayer.globalToLocal(event.point));
                        if ((pos.x >= 0 && pos.x < horizontalBlocks * 2) && (pos.y >= 0 && pos.y < verticalBlocks * 2)) {
                            const mousePos = layers.gridLayer.globalToLocal(event.point).divide(new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2));
                            const tilePos = isometric(pos, mousePos);
                            if (!this.trapTile[tilePos.x + (tilePos.y * horizontalBlocks)]) {
                                this.placePattern(this.activePattern.clone(), tilePos, this.tileState);
                            } else {
                                this.trapTile[tilePos.x + (tilePos.y * horizontalBlocks)].remove();
                                this.placePattern(this.activePattern.clone(), tilePos, this.tileState);
                            }
                        }
                        break;
                    }
                case TileState.Custom:
                    // 커스텀 타일
                    {
                        const pos = getWorldPositionToGrid(layers.gridLayer.globalToLocal(event.point));
                        if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                            if (!this.customTile[pos.x + (pos.y * horizontalBlocks)]) {
                                this.placePattern(this.activePattern.clone(), pos, this.tileState);
                            } else {
                                this.customTile[pos.x + (pos.y * horizontalBlocks)].remove();
                                this.placePattern(this.activePattern.clone(), pos, this.tileState);
                            }
                        }
                        break;
                    }
                    break;
            }
        }
        this.isButtonDown = false;
    }

    onMove(event: any) {
        if (this.activePattern && !this.isButtonDown) {
            let tilePos;

            switch (this.tileState) {
                case TileState.Default:
                    // 일반 타일
                    {
                        const pos = getWorldPositionToGrid(layers.gridLayer.globalToLocal(event.point));
                        if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                            tilePos = pos
                                .multiply(new paper.Point(horizontalBlockSize, verticalBlockSize))
                                .add(
                                    new paper.Point(
                                        (horizontalBlockSize / 2)   * ((this.activePattern.scaling.x > 0) ? this.activePattern.scaling.x : -this.activePattern.scaling.x),
                                        (verticalBlockSize / 2)     * ((this.activePattern.scaling.y > 0) ? this.activePattern.scaling.y : -this.activePattern.scaling.y))
                                );
                            this.gridGuideLine.position = tilePos;
                            this.activePattern.position = tilePos;
                        }
                        break;
                    }
                case TileState.Trap:
                    // 트랩 타일
                    {
                        const pos = getWorldPositionToLine(layers.gridLayer.globalToLocal(event.point));
                        if ((pos.x >= 0 && pos.x < horizontalBlocks * 2) && (pos.y >= 0 && pos.y < verticalBlocks * 2)) {
                            const mousePos = layers.gridLayer.globalToLocal(event.point).divide(new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2));
                            tilePos = isometric(pos, mousePos)
                            if ((tilePos.x & 1) === 1) {
                                this.gridGuideLine2.rotation = 90;
                                this.activePattern.rotation = 90;
                            } else {
                                this.gridGuideLine2.rotation = 0;
                                this.activePattern.rotation = 0;
                            }
                            const temp = tilePos.multiply(new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2));
                            this.gridGuideLine2.position = temp;
                            this.activePattern.position = temp;
                        }
                        break;
                    }
                case TileState.Custom:
                    // 커스텀 타일
                    {
                        const pos = getWorldPositionToGrid(layers.gridLayer.globalToLocal(event.point));
                        if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                            tilePos = pos
                                .multiply(new paper.Point(horizontalBlockSize, verticalBlockSize))
                                .add(
                                    new paper.Point(
                                        (horizontalBlockSize / 2)   * ((this.activePattern.scaling.x > 0) ? this.activePattern.scaling.x : -this.activePattern.scaling.x),
                                        (verticalBlockSize / 2)     * ((this.activePattern.scaling.y > 0) ? this.activePattern.scaling.y : -this.activePattern.scaling.y))
                                );
                            this.gridGuideLine.position = tilePos;
                            this.activePattern.position = tilePos;
                        }
                        break;
                    }
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

        layers.trapLayer.removeChildren();
        const trapBackground = new paper.Path.Rectangle(
            new paper.Rectangle(
                new paper.Point(0, 0),
                new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
            )
        );
        trapBackground.fillColor = new paper.Color(1, 1, 1, 0);
        layers.trapLayer.addChild(trapBackground);

        layers.customLayer.removeChildren();
        const customBackground = new paper.Path.Rectangle(
            new paper.Rectangle(
                new paper.Point(0, 0),
                new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
            )
        );
        customBackground.fillColor = new paper.Color(1, 1, 1, 0);
        layers.customLayer.addChild(trapBackground);
    }
}

export const playerState = new PlayerState();