import * as React from 'react';
import * as ReactDOM from 'react-dom';
import paper from 'paper';

import { App } from './App';
import { store } from './store';

import { saveTileToFile } from './save';

export function Setup() {
    return new Promise((resolve) => {
        window.onload = function onload() {
            paper.install(window);

            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            paper.setup(canvas);
            store.canvas = canvas;

            // @ts-ignore
            paper.view.onKeyDown = function(event: any) {
                switch (event.key) {
                    case 's':
                        //saveTileToFile();
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