import './index.css';

import { Setup } from './api/setup';
import { DrawBackground } from './api/background';

(async () => {
  await Setup();
  DrawBackground();
})();