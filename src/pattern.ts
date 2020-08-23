import { AsyncObject } from './api/asyncObject';
import color from './img/tool-color.png'
import flower from './img/tool-flower.png'

export const patternList = new AsyncObject();
patternList.value = {
    pattern_1: {
        img: color,
    },

    pattern_2: {
        img: flower,
    },


}

export function load() {
    Object.keys(patternList.value).forEach((type) => {
        const def = patternList.value[type];
        def.type = type;
        def.onSelect = () => {}
        const img = new paper.Raster(def.img);
        def.icon = img;
        def.icon.onLoad = () => {
            patternList.onLoad();
        }
        img.remove();
    });
}
