import './index.scss';

import { Setup } from './setup';
import { Draws } from './draws';

import * as sound from './sound';

(async () => {
  await Setup();

  sound.init();

  Draws();
})();