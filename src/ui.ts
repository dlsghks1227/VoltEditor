import paper, { Point, PaperScope } from 'paper';

import * as pattern from './pattern';
import { layers } from './layers';
import { objectMap } from './api/asyncObject';
import { playerState } from './state';


export function createObjectIcon(item: any) {
    const icon = item.icon.clone({ insert: false });
    return icon;
}

export function createPattern(item: any) {
    const pattern = new paper.Raster(item.img);
    pattern.pivot = new Point(-pattern.size.width / 2, -pattern.size.height / 2);
    pattern.visible = false;
    return pattern;
}

type buttonOptions = {
    alpha?: number
    highlightedColor?: paper.Color
    selectedColor?: paper.Color
    disabledColor?: paper.Color
};
export function createButton(item: any, buttonSize: number, onClick: any, options?: buttonOptions) {
    layers.uiLayer.activate();
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

export function createPatternUI(item: any): paper.Group {
    layers.uiLayer.activate();
    let pos = 0;

    const group = new paper.Group();

    const path = new paper.Path();
    path.strokeColor = new paper.Color('white');
    path.strokeWidth = 130;
    path.strokeCap = 'round';
    path.segments = [
        new paper.Segment(new paper.Point(10, 10)),
        new paper.Segment(new paper.Point(1000, 10)),
    ]

    group.addChild(path);

    objectMap(item, (def: any) => {
        def.position = new paper.Point(pos, 0);
        group.addChild(def);
        pos += 100;
    });

    group.position = new paper.Point(paper.view.center.x, paper.view.size.height - 50);
    return group
}

function init() {
    pattern.patternList.getAsyncValue((item: any) => {
        const patternUI = createPatternUI(objectMap(item, (def: any) => {
            layers.gridLayer.activate();
            const icon = createObjectIcon(def);
            const pattern = createPattern(def);
            return createButton(icon, 20, () => playerState.switchPattern(pattern));
        }));
    });
}

export function DrawUI() {
    layers.uiLayer.activate();
    pattern.load();

   //createPatternUI();
    init();
}