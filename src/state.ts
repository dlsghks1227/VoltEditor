import paper from 'paper';

import { getWorldPositionToGrid } from './api/coordinate';
import {
    horizontalBlockSize,
    verticalBlockSize
} from './constants';
import { layers } from './layers';

class PlayerState {
    activePattern: any = null;

    switchPattern(pattern: any) {
        this.activePattern = pattern;
        this.activePattern.visible = true;
    }

    onDown(event: any) {
    }

    onUp(event: any) {
        layers.tileLayer.activate();
        if (this.activePattern) {
            const group = new paper.Group();
            group.addChild(this.activePattern.clone());
        }
    }

    onMove(event: any) {
        layers.tileLayer.activate();
        if (this.activePattern) {
            this.activePattern.position = getWorldPositionToGrid(event.point).multiply(new paper.Point(horizontalBlockSize, verticalBlockSize));
        }
    }
}

export const playerState = new PlayerState();