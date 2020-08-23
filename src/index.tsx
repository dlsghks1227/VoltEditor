import './index.scss';

import { Setup } from './setup';
import { Draws } from './draws';


(async () => {
  await Setup();
  
  Draws();
})();