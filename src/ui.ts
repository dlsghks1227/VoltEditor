import paper from 'paper';

import { layers }           from './layers';
import { objectMap }        from './api/asyncObject';
import { ActiveState, playerState, TileState }      from './state';
import { saveTileToFile }   from './save';
import { 
    horizontalBlockSize,
    verticalBlockSize 
}from  './constants';

import { createButton }     from './ui/button';
import { 
    createObjectIcon,
    createObject
} from './ui/object';

import * as TwinCity    from './pattern/TwinCity';
import * as Rome        from './pattern/Rome';
import * as Ruhrgebie   from './pattern/Ruhrgebie';
import * as Tokyo       from './pattern/Tokyo';
import * as Custom      from './pattern/Custom';

import TwinCityImg      from './img/1_TwinCity.png';
import RomeImg          from './img/2_Rome.png';
import RuhrgebieImg     from './img/3_Ruhrgebie.png';
import TokyoImg         from './img/4_Tokyo.png';
import ExitImg          from './img/5_Exit.png';
import CustomImg        from './img/6_CustomTile.png';

import inven            from './img/resources/Inven.png';
import GuideLine        from './img/resources/Guide Line.png';

import ArrowButton      from './img/resources/Arrow Button_ Default.png';
import ResetButton      from './img/resources/Reset.png';
import EraserButton     from './img/resources/Eraser.png';
import EraserButtonSel  from './img/resources/Eraser_selected.png';
import PaintButton      from './img/resources/Paint.png';
import PaintButtonSel   from './img/resources/Paint_selected.png';
import RotationButton   from './img/resources/Rotation.png';
import RotationBtnOff   from './img/resources/Rotation_X.png';
import RotationBtnSel   from './img/resources/Rotation_selected.png';
import PrintButton      from './img/resources/Print.png';

import LogoImg          from './img/resources/Volt_LOGO.png';
import CopyImg          from './img/resources/Copy.png';

import * as sound       from './sound';

let invenCount:         number = 0;
let tileGuideLine:      paper.Group;

let activePattern:      any;
let selectFolder:       boolean = false;

let folderGroup:        paper.Group;
let folderPos:          number = -357;

let exitGroup:          paper.Group;
let invenGroup:         paper.Group;

let leftArrowRaster:    paper.Group;
let rightArrowRaster:   paper.Group;

let rotationRaster:     paper.Group;
let eraserRaster:       paper.Group;
let paintRaster:        paper.Group;

export function createPatternUI(image: any, ptn: any){
    layers.uiLayer.activate();
    const folderIcon = new paper.Raster(image);
    const folderRaster = createButton(folderIcon, () => {

        sound.buttonClick.pause();
        sound.buttonClick.currentTime = 0;
        sound.buttonClick.play();

        folderGroup.visible = false;
        exitGroup.visible = true;
        selectFolder = true;

        ptn.Patterns.getAsyncValue((item: any) => {
            const patternButtons = objectMap(item, (def: any) => {
                const group = new paper.Group();

                const icon = createObjectIcon(def);
                const pattern = createObject(def);

                const bound = new paper.Path.Rectangle(
                    new paper.Point(0, 0),
                    new paper.Size(horizontalBlockSize, verticalBlockSize));
                bound.strokeColor = new paper.Color('white');
                bound.strokeColor.alpha = 0;
                bound.strokeWidth = 0.1;
                bound.fillColor = new paper.Color('white');
                bound.fillColor.alpha = 0;
                bound.position = icon.position;

                group.addChildren([bound, icon]);

                const button = createButton(group.rasterize(), () => {
                    playerState.switchPattern(pattern);

                    if (playerState.activeState === ActiveState.Paint)
                    {
                        sound.paintButton.pause();
                        sound.paintButton.currentTime = 0;
                        sound.paintButton.play();
                    }
                    else
                    {
                        sound.buttonClick.pause();
                        sound.buttonClick.currentTime = 0;
                        sound.buttonClick.play();
                    }

                    rotationRaster.data.select(false);
                    eraserRaster.data.select(false);
                    paintRaster.data.select(false);

                    rotationRaster.data.disable((pattern.data.tileState === TileState.Trap));

                    if (tileGuideLine) {
                        tileGuideLine.visible = true;
                        tileGuideLine.position = button.position;
                    }
                });
                group.remove();
                return button;
            });

            changeInven(patternButtons);

            if (!tileGuideLine)
            {
                const tileGuideLineIcon = new paper.Raster(GuideLine);
                tileGuideLine = createButton(tileGuideLineIcon, () => {

                    sound.buttonClick.pause();
                    sound.buttonClick.currentTime = 0;
                    sound.buttonClick.play();

                    tileGuideLine.visible = false;
                    playerState.onDefault();
                });
                
                tileGuideLine.visible = false;
                layers.uiLayer.addChild(tileGuideLine);
            }
        });
    });
    
    folderRaster.position = new paper.Point(folderPos, -10);
    folderPos += (714 / 4);
    folderGroup.addChild(folderRaster);
}

function changeInven(tiles: any)
{
    layers.uiLayer.activate();
    objectMap(tiles, (def: any) => {
        def.visible = false;
    });

    if (!invenGroup)
    {
        invenGroup = new paper.Group();
    }
    else
    {
        invenGroup.visible = true;
        invenGroup.removeChildren();
    }

    invenCount = 0;
    activePattern = tiles;

    leftArrowRaster.data.disable(true);
    if (Object.keys(activePattern).length <= 7) {
        rightArrowRaster.data.disable(true);
    }
    else
    {
        rightArrowRaster.data.disable(false);
    }
    
    let pos = -357;
    //group.applyMatrix = false;
    for (let i = invenCount + 1; i < invenCount + 8; i++) {
        const key = 'tile' + i.toString();
        const tileButton = activePattern[key];
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

function moveInven(left: boolean)
{
    if (selectFolder && activePattern) {
        invenGroup.removeChildren();
        const itemLen = Object.keys(activePattern).length;
        if (left) {
            if (invenCount > 0) {
                invenCount -= 1;
            }
        }
        else {
            if (invenCount < itemLen - 7) {
                invenCount += 1;
            }
        }

        if (invenCount === 0) {
            leftArrowRaster.data.disable(true);
        }
        else if (invenCount === itemLen - 7){
            rightArrowRaster.data.disable(true);
        }
        else {
            leftArrowRaster.data.disable(false);
            rightArrowRaster.data.disable(false);
        }

        let pos = -357;
        for (let i = invenCount + 1; i < invenCount + 8; i++) {
            const key = 'tile' + i.toString();
            const tileButton = activePattern[key];
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
}

function init() {
    layers.uiLayer.activate();
    const background = new paper.Raster(inven);
    background.position = new paper.Point(0, 0);

    const logo = new paper.Raster(LogoImg);
    logo.position = new paper.Point(0, 1200);

    const copy  = new paper.Raster(CopyImg);
    const copyText = new paper.PointText({
        point: [103, 1305],
        content: 'https://heidelbaer.de/impressum/',
        fillColor: new paper.Color(1, 1, 1, 1),
        fontWeight: 'bold',
        fontSize: 20
    });
    const copyButton = createButton(copyText.rasterize(), () => {
        const element = document.createElement('a');
        element.setAttribute('href', 'https://heidelbaer.de/impressum/');
        element.setAttribute('target', '_blank');
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });
    copyText.remove();
    copy.addChild(copyButton);
    copy.position = new paper.Point(-162, 1300);

    folderGroup = new paper.Group();
    folderGroup.applyMatrix = false;

    exitGroup = new paper.Group();
    exitGroup.visible = false;
    exitGroup.applyMatrix = false;
    

    // Twin City.
    createPatternUI(TwinCityImg, TwinCity);

    // Rome
    createPatternUI(RomeImg, Rome);

    // Ruhrgebie
    createPatternUI(RuhrgebieImg, Ruhrgebie);

    // Tokyo
    createPatternUI(TokyoImg, Tokyo);

    // Custom
    createPatternUI(CustomImg, Custom);

    // Exit
    const exitIcon = new paper.Raster(ExitImg);
    const exitRaster = createButton(exitIcon, () => {

        sound.buttonClick.pause();
        sound.buttonClick.currentTime = 0;
        sound.buttonClick.play();

        folderGroup.visible = true;
        exitGroup.visible = false;

        if (invenGroup)
            invenGroup.visible = false;

        if (tileGuideLine)
            tileGuideLine.visible = false;

        leftArrowRaster.data.disable(true);
        rightArrowRaster.data.disable(true);

        rotationRaster.data.select(false);
        eraserRaster.data.select(false);
        paintRaster.data.select(false);

        rotationRaster.data.disable(false);

        playerState.onDefault();

        selectFolder = false;
    });
    exitRaster.position = new paper.Point(0, 90);
    exitGroup.addChild(exitRaster);

    const leftArrowIcon = new paper.Raster(ArrowButton);
    leftArrowRaster = createButton(leftArrowIcon, () => {

        sound.buttonClick.pause();
        sound.buttonClick.currentTime = 0;
        sound.buttonClick.play();

        moveInven(true);

        if (tileGuideLine)
        {
            tileGuideLine.visible = false;
        }

    });
    leftArrowRaster.position = new paper.Point(-550, 0);

    const rightArrowIcon = new paper.Raster(ArrowButton);
    rightArrowRaster = createButton(rightArrowIcon, () => {

        sound.buttonClick.pause();
        sound.buttonClick.currentTime = 0;
        sound.buttonClick.play();

        moveInven(false);

        if (tileGuideLine)
        {
            tileGuideLine.visible = false;
        }
    });
    rightArrowRaster.scaling = new paper.Point(-1, 1);
    rightArrowRaster.position = new paper.Point(550, 0);

    leftArrowRaster.data.disable(true);
    rightArrowRaster.data.disable(true);
}

export function DrawUI() {
    layers.uiLayer.activate();

    TwinCity.load();
    Rome.load();
    Ruhrgebie.load();
    Tokyo.load();
    Custom.load();
    
    // Rotation Button
    const rotationIcon = new paper.Raster(RotationButton);
    const rotationSelIcon = new paper.Raster(RotationBtnSel);
    const rotationOffIcon = new paper.Raster(RotationBtnOff);
    rotationRaster = createButton(rotationIcon, () => {
        playerState.onRotate(-90, rotationRaster);

        eraserRaster.data.select(false);
        paintRaster.data.select(false);

    }, rotationSelIcon, rotationOffIcon);
    rotationRaster.position = new paper.Point(-540, 220);

    // Eraser Button
    const eraserIcon = new paper.Raster(EraserButton);
    const eraserSelIcon = new paper.Raster(EraserButtonSel);
    eraserRaster = createButton(eraserIcon, () => {
        playerState.onEraser(eraserRaster);
        if (tileGuideLine)
            tileGuideLine.visible = false;

        rotationRaster.data.select(false);
        paintRaster.data.select(false);

    }, eraserSelIcon);
    eraserRaster.position = new paper.Point(-540, 330);

    // Paint Button
    const paintIcon = new paper.Raster(PaintButton);
    const paintSelIcon = new paper.Raster(PaintButtonSel);
    paintRaster = createButton(paintIcon, () => {
        playerState.onPaint(paintRaster);

        rotationRaster.data.select(false);
        eraserRaster.data.select(false);

    }, paintSelIcon);
    paintRaster.position = new paper.Point(540, 220);

    // Reset Button
    const resetIcon = new paper.Raster(ResetButton);
    const resetRaster = createButton(resetIcon, () => {
        playerState.onReset();

        if (tileGuideLine)
            tileGuideLine.visible = false;

        rotationRaster.data.select(false);
        eraserRaster.data.select(false);
        paintRaster.data.select(false);
    });
    resetRaster.position = new paper.Point(540, 330);
    
    // Print Button
    const printIcon = new paper.Raster(PrintButton);
    const printRaster = createButton(printIcon, () => {

        sound.printButton.pause();
        sound.printButton.currentTime = 0;
        sound.printButton.play();

        saveTileToFile();
        rotationRaster.data.select(false);
    });
    printRaster.position = new paper.Point(-540, 1200);
    
    init();
}