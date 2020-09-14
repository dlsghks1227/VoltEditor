import paper from 'paper';
import { AsyncObject } from '../api/asyncObject';

const twinCityPath = "TileStyle1"

export const Patterns = new AsyncObject();
Patterns.value = {
    'tile1': {
        img: require(`../img/${twinCityPath}/001_1.png`),
    },
    'tile2': {
        img: require(`../img/${twinCityPath}/002_2.png`),
    },
    'tile3': {
        img: require(`../img/${twinCityPath}/003_3.png`),
    },
    'tile4': {
        img: require(`../img/${twinCityPath}/004_4.png`),
    },
    'tile5': {
        img: require(`../img/${twinCityPath}/005_5.png`),
    },
    'tile6': {
        img: require(`../img/${twinCityPath}/006_6.png`),
    },
    'tile7': {
        img: require(`../img/${twinCityPath}/007_start_01.png`),
    },
    'tile8': {
        img: require(`../img/${twinCityPath}/008_start_02.png`),
    },
    'tile9': {
        img: require(`../img/${twinCityPath}/009_start_03.png`),
    },
    'tile10': {
        img: require(`../img/${twinCityPath}/010_fix.png`),
    },
    'tile11': {
        img: require(`../img/${twinCityPath}/011_default_01.png`),
    },
    'tile12': {
        img: require(`../img/${twinCityPath}/012_default_02.png`),
    },
    'tile13': {
        img: require(`../img/${twinCityPath}/013_default_03.png`),
    },
    'tile14': {
        img: require(`../img/${twinCityPath}/014_default_04.png`),
    },
    'tile15': {
        img: require(`../img/${twinCityPath}/015_hole_01.png`),
    },
    'tile16': {
        img: require(`../img/${twinCityPath}/016_hole_02.png`),
    },
    // 'tile18': {
    //     img: require(`../img/${twinCityPath}/018_coner.png`),
    // },
    // 'tile19': {
    //     img: require(`../img/${twinCityPath}/019_outline01.png`),
    //     offset: new paper.Point(-31.5, 0),
    // },
    // 'tile20': {
    //     img: require(`../img/${twinCityPath}/020_outline02.png`),
    //     offset: new paper.Point(-31.5, 0),
    // },
    // 'tile21': {
    //     img: require(`../img/${twinCityPath}/021_outline03.png`),
    //     offset: new paper.Point(-31.5, 0),
    // },
    // 'tile22': {
    //     img: require(`../img/${twinCityPath}/022_outline04.png`),
    //     offset: new paper.Point(-31.5, -31.5),
    // },
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