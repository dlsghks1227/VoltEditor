import paper from 'paper';

import * as pattern from './tile';
import { layers } from './layers';
import { objectMap } from './api/asyncObject';
import { playerState } from './state';
import { saveTileToFile } from './save';

import inven from './img/resources/Inven.png';
import GuideLine from './img/resources/Guide Line.png';

import ArrowButton from './img/resources/Arrow Button_ Default.png';
import ResetButton from './img/resources/Reset.png';
import RotationButton from './img/resources/Rotation.png';
import PrintButton from './img/resources/Print.png';

import * as sound from './sound';

export function createObjectIcon(item: any) {
    layers.uiLayer.activate();

    const icon = item.icon.clone({ insert: false });
    return icon;
}

export function createPattern(item: any) {
    layers.patternLayer.activate();
    const group = new paper.Group();

    const pattern = new paper.Raster(item.img);
    pattern.pivot = new paper.Point(0, 0);
    pattern.position = item.offset;

    const bound = new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(94, 94));
    bound.strokeColor = new paper.Color('white');
    bound.strokeColor.alpha = 0;
    bound.strokeWidth = 0.1;
    bound.fillColor = new paper.Color('white');
    bound.fillColor.alpha = 0.0001;
    bound.position = new paper.Point(0, 0);

    group.addChildren([bound, pattern]);
    group.visible = false;

    return group;
}

type buttonOptions = {
    alpha?: number
    highlightedColor?: paper.Color
    selectedColor?: paper.Color
    disabledColor?: paper.Color
};
export function createButton(item: any, onClick: any, options?: buttonOptions) {
    const group = new paper.Group();

    const button = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(-item.size.width / 2, -item.size.height / 2),
            new paper.Point(item.size.width / 2, item.size.height / 2))
    );

    group.applyMatrix = false;
    group.addChildren([button, item]);

    group.data = {
        selected: false,
        hovered: false,
        pressed: false,
        disabled: false,
        select(isSelected: Boolean) {
            group.data.selected = isSelected;
        },
        hover(isHover: Boolean) {
            group.data.hovered = isHover;

        },
        press(isPressed: Boolean) {
            group.data.pressed = isPressed;

        },
        disable(isDisabled: Boolean) {
            group.data.disabled = isDisabled;
            item.opacity = isDisabled ? 0.5 : 1;

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

let invenCount: number = 0;
export function createPatternUI(item: any){
    layers.uiLayer.activate();
    const itemLen = Object.keys(item).length;
    const background = new paper.Raster(inven);
    background.position = new paper.Point(0, 0);

    const leftArrowIcon = new paper.Raster(ArrowButton);
    const leftArrowRaster = createButton(leftArrowIcon, () => {

        sound.buttonClick.pause();
        sound.buttonClick.currentTime = 0;
        sound.buttonClick.play();

        if (invenCount > 0){
            invenCount -= 1;
        }
        changeInven(invenCount);
        if (tileGuideLine)
        {
            tileGuideLine.visible = false;
        }

    });
    leftArrowRaster.position = new paper.Point(-550, 0);

    const rightArrowIcon = new paper.Raster(ArrowButton);
    const rightArrowRaster = createButton(rightArrowIcon, () => {

        sound.buttonClick.pause();
        sound.buttonClick.currentTime = 0;
        sound.buttonClick.play();

        if (invenCount < itemLen - 7){
            invenCount += 1;
        }
        
        changeInven(invenCount);

        if (tileGuideLine)
        {
            tileGuideLine.visible = false;
        }

    });
    rightArrowRaster.scaling = new paper.Point(-1, 1);
    rightArrowRaster.position = new paper.Point(550, 0);

    changeInven(0);
}

let tileButtons: any;
let tileGuideLine: paper.Raster;
let invenGroup: paper.Group;
function changeInven(index: number)
{
    layers.uiLayer.activate();
    objectMap(tileButtons, (def: any) => {
        def.visible = false;
    });
    if (!invenGroup)
    {
        invenGroup = new paper.Group();
    }
    else
    {
        invenGroup.removeChildren();
    }
    let pos = -357;
    //group.applyMatrix = false;
    for (let i = index + 1; i < index + 8; i++) {
        const key = 'tile' + i.toString();
        const tileButton = tileButtons[key];
        if (!tileButton)
        {
            return;
        }
        tileButton.visible = true;
        tileButton.position = new paper.Point(pos, -7);
        pos += 119;
        invenGroup.addChild(tileButton);
    }
}

function init() {
    pattern.patternList.getAsyncValue((item: any) => {
        tileButtons = objectMap(item, (def: any) => {
            const group = new paper.Group();

            const icon = createObjectIcon(def);
            const pattern = createPattern(def);

            const bound = new paper.Path.Rectangle(
                new paper.Point(0, 0),
                new paper.Size(94, 94));
            bound.strokeColor = new paper.Color('white');
            bound.strokeColor.alpha = 0;
            bound.strokeWidth = 0.1;
            bound.fillColor = new paper.Color('white');
            bound.fillColor.alpha = 0;
            bound.position = icon.position;

            group.addChildren([bound, icon]);      

            const button = createButton(group.rasterize(), () => {
                playerState.switchPattern(pattern);
                if (tileGuideLine)
                {
                    tileGuideLine.visible = true;
                    tileGuideLine.position = button.position;
                }
            });
            group.remove();
            return button;
        });
        createPatternUI(tileButtons);

        tileGuideLine = new paper.Raster(GuideLine);
        tileGuideLine.visible = false;
        layers.uiLayer.addChild(tileGuideLine);
    });    
}

export function DrawUI() {
    layers.uiLayer.activate();

    pattern.load();
    
    // Rotation Button
    const rotationIcon = new paper.Raster(RotationButton);
    const rotationRaster = createButton(rotationIcon, () => playerState.onRotate(-90));
    rotationRaster.position = new paper.Point(-550, 220);

    // Reset Button
    const resetIcon = new paper.Raster(ResetButton);
    const resetRaster = createButton(resetIcon, () => playerState.onReset());
    resetRaster.position = new paper.Point(550, 1100);
    
    // Print Button
    const printIcon = new paper.Raster(PrintButton);
    const printRaster = createButton(printIcon, () => {

        sound.printButton.pause();
        sound.printButton.currentTime = 0;
        sound.printButton.play();

        saveTileToFile();
    });
    printRaster.position = new paper.Point(-550, 1100);
    
    init();
}