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
        if (this.activePattern) {
            layers.tileLayer.activate();
            const group = new paper.Group();
            const pos = layers.gridLayer.globalToLocal(event.point);

            group.position = pos;
            group.addChild(this.activePattern.clone());
        }
    }

    onMove(event: any) {
        if (this.activePattern) {
            layers.tileLayer.activate();
            const pos = layers.gridLayer.globalToLocal(event.point);
            this.activePattern.position = getWorldPositionToGrid(pos).multiply(new paper.Point(horizontalBlockSize, verticalBlockSize));
        }
    }
}

export const playerState = new PlayerState();