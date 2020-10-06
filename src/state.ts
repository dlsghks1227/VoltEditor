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

export enum ActiveState {
    Default = 0,
    Tile,
    Paint,
    Rotate,
    Eraser,
}

class PlayerState {
    activePattern:  any = null;
    
    tile:           number[] = new Array<number>();
    customTile:     number[] = new Array<number>();
    trapTile:       number[] = new Array<number>();
    
    isButtonDown:   Boolean     = false;
    tileState:      TileState   = TileState.Default;
    activeState:    ActiveState = ActiveState.Default;

    isRotateTileClicked:        boolean = false;
    clickedRotateTilePosition:  paper.Point;

    gridGuideLine:  paper.Raster;
    gridGuideLine2: paper.Raster;

    init() {
        this.gridGuideLine              = new paper.Raster(GuideLine);
        this.gridGuideLine.position     = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);
        this.gridGuideLine.scaling      = new paper.Size(horizontalBlockSize / 94, verticalBlockSize / 94);
        this.gridGuideLine.visible      = true;

        this.gridGuideLine2             = new paper.Raster(GuideLine2);
        this.gridGuideLine2.position    = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);
        this.gridGuideLine2.visible     = false;

        layers.guideLayer.addChild(this.gridGuideLine);
        layers.guideLayer.addChild(this.gridGuideLine2);
        layers.guideLayer.addChild(this.activePattern);

        this.tile       = new Array<number>();
        this.customTile = new Array<number>();
        this.trapTile   = new Array<number>();
    }

    switchActiveState(state: ActiveState) {
        this.activeState = state;
    }

    switchPattern(pattern: any) {

        // sound.buttonClick.pause();
        // sound.buttonClick.currentTime = 0;
        // sound.buttonClick.play();

        layers.tileLayer.activate();

        // if (this.activePattern) {
        //     console.log(this.activePattern);
        //     if (this.activePattern === pattern)
        //     {
        //     }
        // }

        const oldPattern = this.activePattern;
        if (oldPattern) {
            oldPattern.visible = false;
        }

        if (!pattern) {
            this.activePattern = null;

            this.gridGuideLine.visible = true;
            this.gridGuideLine2.visible = false;
            return;
        }

        this.tileState = pattern.data.tileState;
        this.activePattern = pattern;

        this.activePattern.applyMatrix = false;
        this.activePattern.visible = true;

        this.activePattern.rotation = 0;
        this.activePattern.opacity = 0.7;
        
        if (this.activeState === ActiveState.Paint && this.activePattern.data.tileState === TileState.Default) {
            for (let x = 0; x < horizontalBlocks; x++) {
                for (let y = 0; y < verticalBlocks; y++) {
                    if (this.tile[x + (y * horizontalBlocks)] === undefined) {
                        const allPosition = new paper.Point(x, y);
                        this.placePattern(pattern.clone(), allPosition, this.activePattern.data.tileState);
                    }
                }
            }

            this.activePattern = null;

            this.gridGuideLine.visible = true;
            this.gridGuideLine2.visible = false;

            this.switchActiveState(ActiveState.Default);
            return;
        }

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

                    this.activePattern.position = new paper.Point(horizontalBlockSize, verticalBlockSize / 2);
                    this.gridGuideLine2.position = new paper.Point(horizontalBlockSize, verticalBlockSize / 2);


                    this.activePattern.rotation = 0;
                    this.gridGuideLine2.rotation = 0;

                    this.gridGuideLine.visible = false;
                    this.gridGuideLine2.visible = true;
                    break;
                }
            case TileState.Custom:
                // 커스텀 타일
                {
                    layers.customLayer.activate();

                    this.activePattern.position = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);
                    this.gridGuideLine.position = new paper.Point(horizontalBlockSize / 2, verticalBlockSize / 2);

                    this.gridGuideLine.visible = true;
                    this.gridGuideLine2.visible = false;
                    break;
                }
        }
        this.switchActiveState(ActiveState.Tile);

        this.isButtonDown = true;
    }

    placePattern(pattern: any, pos: paper.Point, tileState: TileState) {

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

                            sound.placeTile.pause();
                            sound.placeTile.currentTime = 0;
                            sound.placeTile.play();

                            // for (let x = 0; x < horizontalBlocks; x++) {
                            //     for (let y = 0; y < verticalBlocks; y++) {
                            //         if (this.tile[x + (y * horizontalBlocks)] === undefined)
                            //         {
                            //             const allPosition = new paper.Point(x, y);
                            //             this.placePattern(this.activePattern.clone(), allPosition, this.tileState);
                            //         }
                            //     }
                            // }

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
              
                            sound.placeTile.pause();
                            sound.placeTile.currentTime = 0;
                            sound.placeTile.play();

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
                            if (this.tile[pos.x + (pos.y * horizontalBlocks)]) {

                                sound.placeTile.pause();
                                sound.placeTile.currentTime = 0;
                                sound.placeTile.play();

                                if (!this.customTile[pos.x + (pos.y * horizontalBlocks)]) {
                                    this.placePattern(this.activePattern.clone(), pos, this.tileState);
                                } else {
                                    this.customTile[pos.x + (pos.y * horizontalBlocks)].remove();
                                    this.placePattern(this.activePattern.clone(), pos, this.tileState);
                                }
                            }
                        }
                        break;
                    }
            }
        }
        else if (this.activePattern === null)
        {

            const pos = getWorldPositionToGrid(layers.gridLayer.globalToLocal(event.point));
            if (this.activeState === ActiveState.Paint) {
                if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                    const currentTile = this.tile[pos.x + (pos.y * horizontalBlocks)];
                    if (currentTile)
                    {
                        for (let x = 0; x < horizontalBlocks; x++) {
                            for (let y = 0; y < verticalBlocks; y++) {
                                if (this.tile[x + (y * horizontalBlocks)] === undefined) {
                                    const allPosition = new paper.Point(x, y);
                                    this.placePattern(currentTile.clone(), allPosition, currentTile.data.tileState);
                                }
                            }
                        }

                        this.onDefault();
                    }
                }
            } else if (this.activeState === ActiveState.Eraser) {
                if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                    if (this.tile[pos.x + (pos.y * horizontalBlocks)]) {
                        this.tile[pos.x + (pos.y * horizontalBlocks)].remove();
                        this.tile[pos.x + (pos.y * horizontalBlocks)] = undefined;
                    }
                    if (this.customTile[pos.x + (pos.y * horizontalBlocks)]) {
                        this.customTile[pos.x + (pos.y * horizontalBlocks)].remove();
                        this.customTile[pos.x + (pos.y * horizontalBlocks)] = undefined;
                    }
                }
            } else if (this.activeState === ActiveState.Rotate) {
                if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                }
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
                            if (this.tile[pos.x + (pos.y * horizontalBlocks)])
                            {
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
                        }
                        break;
                    }
            }
        }
        else if (this.activePattern === null) {
            const pos = getWorldPositionToGrid(layers.gridLayer.globalToLocal(event.point));
            if ((pos.x >= 0 && pos.x < horizontalBlocks) && (pos.y >= 0 && pos.y < verticalBlocks)) {
                const tilePos = pos
                    .multiply(new paper.Point(horizontalBlockSize, verticalBlockSize))
                    .add(new paper.Point((horizontalBlockSize / 2), (verticalBlockSize / 2)))
                this.gridGuideLine.position = tilePos;
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
        else {
            if (this.activeState === ActiveState.Rotate) {
                this.onDefault();
                return;
            }

            this.switchPattern(null);
            this.switchActiveState(ActiveState.Rotate);
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

    onDefault() {
        this.switchPattern(null);
        this.switchActiveState(ActiveState.Default);
    }

    onEraser() {
        if (this.activeState === ActiveState.Eraser) {
            this.onDefault();
            return;
        }
        this.switchPattern(null);
        this.switchActiveState(ActiveState.Eraser);
    }

    onPaint() {
        if (this.activeState === ActiveState.Paint) {
            this.onDefault();
            return;
        }
        this.switchPattern(null);
        this.switchActiveState(ActiveState.Paint);
    }

    onToggleRotate() {
        this.switchPattern(null);
        this.switchActiveState(ActiveState.Rotate);
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

        this.tile       = new Array<number>();
        this.customTile = new Array<number>();
        this.trapTile   = new Array<number>();
    }
}

export const playerState = new PlayerState();