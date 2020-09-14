import paper from 'paper';
import { AsyncObject } from '../api/asyncObject';

const tokyoPath = "TileStyle4"

export const Patterns = new AsyncObject();
Patterns.value = {
    'tile1': {
        img: require(`../img/${tokyoPath}/001_1.png`),
    },
    'tile2': {
        img: require(`../img/${tokyoPath}/002_2.png`),
    },
    'tile3': {
        img: require(`../img/${tokyoPath}/003_3.png`),
    },
    'tile4': {
        img: require(`../img/${tokyoPath}/004_4.png`),
    },
    'tile5': {
        img: require(`../img/${tokyoPath}/005_5.png`),
    },
    'tile6': {
        img: require(`../img/${tokyoPath}/006_6.png`),
    },
    'tile7': {
        img: require(`../img/${tokyoPath}/007_default_01.png`),
    },
    'tile8': {
        img: require(`../img/${tokyoPath}/008_default_02.png`),
    },
    'tile9': {
        img: require(`../img/${tokyoPath}/009_fix.png`),
    },
    'tile10': {
        img: require(`../img/${tokyoPath}/010_start_01.png`),
    },
    'tile11': {
        img: require(`../img/${tokyoPath}/011_start_02.png`),
    },
    'tile12': {
        img: require(`../img/${tokyoPath}/012_start_03.png`),
    },
    'tile13': {
        img: require(`../img/${tokyoPath}/013_start_04.png`),
    },
    'tile14': {
        img: require(`../img/${tokyoPath}/014_start_05.png`),
    },
    'tile15': {
        img: require(`../img/${tokyoPath}/015_wall_01.png`),
        isTrap: true,
    },
    'tile16': {
        img: require(`../img/${tokyoPath}/016_wall_02.png`),
        isTrap: true,
    },
    'tile17': {
        img: require(`../img/${tokyoPath}/017_wall_03.png`),
        isTrap: true,
    },
}

export function load() {
    Object.keys(Patterns.value).forEach((type) => {
        const def = Patterns.value[type];
        const img = new paper.Raster(def.img);

        def.type = type;
        def.offset = def.offset || new paper.Point(0, 0);
        def.isTrap = def.isTrap || false;

        def.icon = img;
        def.icon.onLoad = () => {
            Patterns.onLoad();
        }

        img.remove();
    });
}