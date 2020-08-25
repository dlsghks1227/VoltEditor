import paper from 'paper';

import * as pattern from './pattern';
import { layers } from './layers';
import { objectMap } from './api/asyncObject';
import { playerState } from './state';
import {
    horizontalBlockSize,
} from './constants'


export function createObjectIcon(item: any) {
    const icon = item.icon.clone({ insert: false });
    icon.scaling = new paper.Point(64 / icon.size.width, 64 / icon.size.height);
    return icon;
}

export function createPattern(item: any) {
    const pattern = new paper.Raster(item.img);
    pattern.pivot = new paper.Point(0, 0);
    pattern.scaling = new paper.Point(64 / pattern.size.width, 64 / pattern.size.height);
    pattern.visible = false;
    return pattern;
}

type buttonOptions = {
    alpha?: number
    highlightedColor?: paper.Color
    selectedColor?: paper.Color
    disabledColor?: paper.Color
};
export function createButton(item: any, onClick: any, options?: buttonOptions) {
    const alpha = options?.alpha ?? 0.0001;
    const highlightedColor = options?.highlightedColor?.clone() ?? new paper.Color('#eee9a9');
    const selectedColor = options?.selectedColor?.clone() ?? new paper.Color('#f8bd26');
    const disabledColor = options?.disabledColor?.clone() ?? null;

    const group = new paper.Group();

    const button = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(-item.size.width / 2, -item.size.height / 2),
            new paper.Point(item.size.width / 2, item.size.height / 2))
    );

    group.applyMatrix = false;
    group.addChildren([button, item]);

    function updateColor(btn: paper.Path.Circle) {
        btn.fillColor =
            (group.data.disabled && disabledColor) ? disabledColor
                : (group.data.selected || group.data.pressed) ? selectedColor
                    : highlightedColor;

        if (group.data.selected) {
            btn.fillColor.alpha = 1;
        } else if (group.data.pressed) {
            btn.fillColor.alpha = 0.5;
        } else if (group.data.hovered) {
            btn.fillColor.alpha = 1;
        } else {
            btn.fillColor.alpha = alpha;
        }
    }
    updateColor(button);

    group.data = {
        selected: false,
        hovered: false,
        pressed: false,
        disabled: false,
        select(isSelected: Boolean) {
            group.data.selected = isSelected;
            updateColor(button);
        },
        hover(isHover: Boolean) {
            group.data.hovered = isHover;
            updateColor(button);

        },
        press(isPressed: Boolean) {
            group.data.pressed = isPressed;
            updateColor(button);

        },
        disable(isDisabled: Boolean) {
            group.data.disabled = isDisabled;
            item.opacity = isDisabled ? 0.5 : 1;
            updateColor(button);

            if (isDisabled) {
                group.data.hover(false);
            }
        },
    };

    group.onMouseEnter = function () {
        if (group.data.disabled) {
            return;
        }
        group.data.hover(true);
    };
    group.onMouseLeave = function () {
        if (group.data.disabled) {
            return;
        }
        group.data.press(false);
        group.data.hover(false);
    };
    group.onMouseDown = function () {
        if (group.data.disabled) {
            return;
        }

        group.data.press(true);
    };
    group.onMouseUp = (event: any) => {
        if (group.data.disabled) {
            return;
        }
        if (group.data.pressed) {
            onClick(event, group);
        }
        group.data.press(false);
    };

    return group;
}

export function createPatternUI(item: any, position: paper.Point): paper.Group {
    layers.uiLayer.activate();
    const itemLen = Object.keys(item).length;
    console.log(itemLen);
    let pos = -(itemLen * horizontalBlockSize);

    const group = new paper.Group();

    const path = new paper.Path();
    path.strokeColor = new paper.Color('white');
    path.strokeWidth = 130;
    path.strokeCap = 'round';
    path.segments = [
        new paper.Segment(new paper.Point(-(itemLen * horizontalBlockSize), 0)),
        new paper.Segment(new paper.Point((itemLen * horizontalBlockSize), 0)),
    ]
    group.applyMatrix = false;
    group.addChild(path);
    group.position = position;

    objectMap(item, (def: any) => {
        def.position = new paper.Point(pos, 0);
        group.addChild(def);
        pos += (itemLen * horizontalBlockSize);
    });

    return group
}

function init() {
    pattern.patternList.getAsyncValue((item: any) => {
        const patternUI = createPatternUI(objectMap(item, (def: any) => {
            layers.gridLayer.activate();
            const icon = createObjectIcon(def);
            const pattern = createPattern(def);
            layers.uiLayer.activate();
            return createButton(icon, () => playerState.switchPattern(pattern));
        }), new paper.Point(paper.view.center.x, paper.view.size.height - 75));
    });
}

export function DrawUI() {
    layers.uiLayer.activate();
    pattern.load();

    init();

    layers.buttonLayer.activate();
    const saveButton = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(-25, -25),
            new paper.Point(25, 25)
        )
    );
    saveButton.fillColor = new paper.Color(1, 1, 1, 0.1);
    const saveRaster = createButton(saveButton.rasterize(), () => {});
    saveRaster.position = new paper.Point(100, 100);
    saveButton.remove();

    // ---------
    const resetButton = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(-25, -25),
            new paper.Point(25, 25)
        )
    );
    resetButton.fillColor = new paper.Color(1, 1, 1, 0.1);
    const resetRaster = createButton(resetButton.rasterize(), () => playerState.onReset());
    resetRaster.position = new paper.Point(100, 200);
    resetButton.remove();

    // ---------
    const leftRotationButton = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(-25, -25),
            new paper.Point(25, 25)
        )
    );
    leftRotationButton.fillColor = new paper.Color(1, 1, 1, 0.1);
    const leftRotationRaster = createButton(leftRotationButton.rasterize(), () => {});
    leftRotationRaster.position = new paper.Point(100, 300);
    leftRotationButton.remove();

    const RightRotationButton = new paper.Raster();
    RightRotationButton.position = new paper.Point(0, 0);
    
    // 상하
    const verticalFlip = new paper.Raster();

    // 좌우
    const HorizontalFlip = new paper.Raster();
}