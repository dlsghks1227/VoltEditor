import * as React from 'react';
import * as ReactDOM from 'react-dom';
import paper from 'paper';

import { App } from './App';
import { store } from './store';

import { saveTileToFile } from './save';
import { layers } from './layers';
import {
    horizontalBlocks,
    verticalBlocks,
    horizontalBlockSize,
    verticalBlockSize
} from './constants'
import { playerState } from './state';

export function Setup() {
    return new Promise((resolve) => {
        window.onload = function onload() {
            paper.install(window);

            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            paper.setup(canvas);
            store.canvas = canvas;

            // @ts-ignore
            paper.view.onKeyDown = function (event: any) {
                switch (event.key) {
                    case 's':
                        layers.tileLayer.removeChildren();
                        const tileBackground = new paper.Path.Rectangle(
                            new paper.Rectangle(
                                new paper.Point(0, 0),
                                new paper.Point(horizontalBlocks * horizontalBlockSize, verticalBlocks * verticalBlockSize)
                            )
                        );
                        tileBackground.fillColor = new paper.Color(1, 1, 1, 0.00001);
                        layers.tileLayer.addChild(tileBackground);
                        break;
                    case 'a':
                        saveTileToFile();
                        break;

                    case 'r':
                        playerState.onRotate();
                        break;
                }
            }

            resolve();

            ReactDOM.render(
                React.createElement(App, {}),
                document.getElementById('app')
            );
        }
    });
}