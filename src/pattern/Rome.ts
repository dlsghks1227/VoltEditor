import paper from 'paper';
import { AsyncObject } from '../api/asyncObject';

const RomePath = "TileStyle2"

export const Patterns = new AsyncObject();
Patterns.value = {
    'tile1': {
        img: require(`../img/${RomePath}/001_1.png`),
    },
    'tile2': {
        img: require(`../img/${RomePath}/002_2.png`),
    },
    'tile3': {
        img: require(`../img/${RomePath}/003_3.png`),
    },
    'tile4': {
        img: require(`../img/${RomePath}/004_4.png`),
    },
    'tile5': {
        img: require(`../img/${RomePath}/005_5.png`),
    },
    'tile6': {
        img: require(`../img/${RomePath}/006_6.png`),
    },
    'tile7': {
        img: require(`../img/${RomePath}/007_start_01.png`),
    },
    'tile8': {
        img: require(`../img/${RomePath}/008_start_02.png`),
    },
    'tile9': {
        img: require(`../img/${RomePath}/009_start_03.png`),
    },
    'tile10': {
        img: require(`../img/${RomePath}/010_start_04.png`),
    },
    'tile11': {
        img: require(`../img/${RomePath}/011_start_05.png`),
    },
    'tile12': {
        img: require(`../img/${RomePath}/012_fix.png`),
    },
    'tile13': {
        img: require(`../img/${RomePath}/013_default_01.png`),
    },
    'tile14': {
        img: require(`../img/${RomePath}/014_default_02.png`),
    },
    'tile15': {
        img: require(`../img/${RomePath}/015_water_01.png`),
    },
    'tile16': {
        img: require(`../img/${RomePath}/016_water_02.png`),
    },
    'tile17': {
        img: require(`../img/${RomePath}/017_water_03.png`),
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