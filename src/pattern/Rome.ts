import paper from 'paper';
import { AsyncObject } from '../api/asyncObject';

const Rome = "TileStyle2"

export const Patterns = new AsyncObject();
Patterns.value = {
    'tile1': {
        img: require(`../img/${Rome}/001_1.png`),
    },
    'tile2': {
        img: require(`../img/${Rome}/002_2.png`),
    },
    'tile3': {
        img: require(`../img/${Rome}/003_3.png`),
    },
    'tile4': {
        img: require(`../img/${Rome}/004_4.png`),
    },
    'tile5': {
        img: require(`../img/${Rome}/005_5.png`),
    },
    'tile6': {
        img: require(`../img/${Rome}/006_6.png`),
    },
    'tile7': {
        img: require(`../img/${Rome}/007_start.png`),
    },
    'tile8': {
        img: require(`../img/${Rome}/008_default.png`),
    },
    'tile9': {
        img: require(`../img/${Rome}/009_fix.png`),
    },
    'tile10': {
        img: require(`../img/${Rome}/010_coner.png`),
    },
    'tile11': {
        img: require(`../img/${Rome}/011_outline01.png`),
        offset: new paper.Point(-42, 0),
    },
    'tile12': {
        img: require(`../img/${Rome}/012_outline02.png`),
        offset: new paper.Point(-42, 0),
    },
    'tile13': {
        img: require(`../img/${Rome}/013_outline03.png`),
        offset: new paper.Point(-42, -42),
    },
}

export function load() {
    Object.keys(Patterns.value).forEach((type) => {
        const def = Patterns.value[type];
        const img = new paper.Raster(def.img);

        def.type = type;
        def.offset = def.offset || new paper.Point(0, 0);

        def.icon = img;
        def.icon.onLoad = () => {
            Patterns.onLoad();
        }

        img.remove();
    });
}