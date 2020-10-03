import paper from 'paper';
import { AsyncObject } from '../api/asyncObject';
import { TileState } from '../state';

const ruhrgebiePath = "TileStyle3"

export const Patterns = new AsyncObject();
Patterns.value = {
    'tile1': {
        img: require(`../img/${ruhrgebiePath}/001_1.png`),
    },
    'tile2': {
        img: require(`../img/${ruhrgebiePath}/002_2.png`),
    },
    'tile3': {
        img: require(`../img/${ruhrgebiePath}/003_3.png`),
    },
    'tile4': {
        img: require(`../img/${ruhrgebiePath}/004_4.png`),
    },
    'tile5': {
        img: require(`../img/${ruhrgebiePath}/005_5.png`),
    },
    'tile6': {
        img: require(`../img/${ruhrgebiePath}/006_6.png`),
    },
    'tile7': {
        img: require(`../img/${ruhrgebiePath}/007_start_01.png`),
    },
    'tile8': {
        img: require(`../img/${ruhrgebiePath}/008_start_02.png`),
    },
    'tile9': {
        img: require(`../img/${ruhrgebiePath}/009_default_00.png`),
    },
    'tile10': {
        img: require(`../img/${ruhrgebiePath}/009_start_03.png`),
    },
    'tile11': {
        img: require(`../img/${ruhrgebiePath}/010_default_01.png`),
    },
    'tile12': {
        img: require(`../img/${ruhrgebiePath}/011_default_02.png`),
    },
    'tile13': {
        img: require(`../img/${ruhrgebiePath}/012_default_03.png`),
    },
    'tile14': {
        img: require(`../img/${ruhrgebiePath}/013_default_04.png`),
    },
    'tile15': {
        img: require(`../img/${ruhrgebiePath}/014_fix.png`),
    },
    'tile16': {
        img: require(`../img/${ruhrgebiePath}/015_electric.png`),
    },
    'tile17': {
        img: require(`../img/${ruhrgebiePath}/016_electric trap_94px.png`),
        state: TileState.Trap,
    },
}

export function load() {
    Object.keys(Patterns.value).forEach((type) => {
        const def = Patterns.value[type];
        const img = new paper.Raster(def.img);

        def.type = type;
        def.offset = def.offset || new paper.Point(0, 0);
        def.tileState = def.state || TileState.Default;

        def.icon = img;
        def.icon.onLoad = () => {
            Patterns.onLoad();
        }

        img.remove();
    });
}