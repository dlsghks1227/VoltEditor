import './index.scss';

import { Setup } from './setup';
import { BackgroundRender } from './background';
import { UIRender } from './ui';
(async () => {
  await Setup();
  BackgroundRender();
  UIRender();
})();