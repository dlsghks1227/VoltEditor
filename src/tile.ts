import paper from 'paper';
import { AsyncObject } from './api/asyncObject';

const tileStyle1 = "TileStyle1"
const tileStyle2 = "TileStyle2"
const tileStyle3 = "TileStyle3"
const tileStyle4 = "TileStyle4"

export const patternList = new AsyncObject();
patternList.value = {
    'tile1': {
        img: require(`./img/${tileStyle1}/001_1.png`),
    },
    'tile2': {
        img: require(`./img/${tileStyle1}/002_2.png`),
    },
    'tile3': {
        img: require(`./img/${tileStyle1}/003_3.png`),
    },
    'tile4': {
        img: require(`./img/${tileStyle1}/004_4.png`),
    },
    'tile5': {
        img: require(`./img/${tileStyle1}/005_5.png`),
    },
    'tile6': {
        img: require(`./img/${tileStyle1}/006_6.png`),
    },
    'tile7': {
        img: require(`./img/${tileStyle1}/007_start.png`),
    },
    'tile8': {
        img: require(`./img/${tileStyle1}/008_default.png`),
    },
    'tile9': {
        img: require(`./img/${tileStyle1}/009_fix.png`),
    },
    'tile10': {
        img: require(`./img/${tileStyle1}/010_coner.png`),
    },
    'tile11': {
        img: require(`./img/${tileStyle1}/011_outline01.png`),
        offset: new paper.Point(-31.5, 0),
    },
    'tile12': {
        img: require(`./img/${tileStyle1}/012_outline02.png`),
        offset: new paper.Point(-31.5, 0),
    },
    'tile13': {
        img: require(`./img/${tileStyle1}/013_outline03.png`),
        offset: new paper.Point(-31.5, 0),
    },
    'tile14': {
        img: require(`./img/${tileStyle1}/014_outline04.png`),
        offset: new paper.Point(-31.5, -31.5),
    },

    'tile15': {
        img: require(`./img/${tileStyle2}/001_1.png`),
    },
    'tile16': {
        img: require(`./img/${tileStyle2}/002_2.png`),
    },
    'tile17': {
        img: require(`./img/${tileStyle2}/003_3.png`),
    },
    'tile18': {
        img: require(`./img/${tileStyle2}/004_4.png`),
    },
    'tile19': {
        img: require(`./img/${tileStyle2}/005_5.png`),
    },
    'tile20': {
        img: require(`./img/${tileStyle2}/006_6.png`),
    },
    'tile21': {
        img: require(`./img/${tileStyle2}/007_start.png`),
    },
    'tile22': {
        img: require(`./img/${tileStyle2}/008_default.png`),
    },
    'tile23': {
        img: require(`./img/${tileStyle2}/009_fix.png`),
    },
    'tile24': {
        img: require(`./img/${tileStyle2}/010_coner.png`),
    },
    'tile25': {
        img: require(`./img/${tileStyle2}/011_outline01.png`),
        offset: new paper.Point(-42, 0),
    },
    'tile26': {
        img: require(`./img/${tileStyle2}/012_outline02.png`),
        offset: new paper.Point(-42, 0),
    },
    'tile27': {
        img: require(`./img/${tileStyle2}/013_outline03.png`),
        offset: new paper.Point(-42, -42),
    },

    'tile28': {
        img: require(`./img/${tileStyle3}/001_1.png`),
    },
    'tile29': {
        img: require(`./img/${tileStyle3}/002_2.png`),
    },
    'tile30': {
        img: require(`./img/${tileStyle3}/003_3.png`),
    },
    'tile31': {
        img: require(`./img/${tileStyle3}/004_4.png`),
    },
    'tile32': {
        img: require(`./img/${tileStyle3}/005_5.png`),
    },
    'tile33': {
        img: require(`./img/${tileStyle3}/006_6.png`),
    },
    'tile34': {
        img: require(`./img/${tileStyle3}/007_start.png`),
    },
    'tile35': {
        img: require(`./img/${tileStyle3}/008_default.png`),
    },
    'tile36': {
        img: require(`./img/${tileStyle3}/009_fix.png`),
    },
    'tile37': {
        img: require(`./img/${tileStyle3}/010_corner.png`),
    },
    'tile38': {
        img: require(`./img/${tileStyle3}/011_outline01.png`),
        offset: new paper.Point(-42, 0),
    },
    'tile39': {
        img: require(`./img/${tileStyle3}/012_outline02.png`),
        offset: new paper.Point(-42, 0),
    },
    'tile40': {
        img: require(`./img/${tileStyle3}/013_outline03.png`),
        offset: new paper.Point(-42, -42),
    },

    'tile41': {
        img: require(`./img/${tileStyle4}/001_1.png`),
    },
    'tile42': {
        img: require(`./img/${tileStyle4}/002_2.png`),
    },
    'tile43': {
        img: require(`./img/${tileStyle4}/003_3.png`),
    },
    'tile44': {
        img: require(`./img/${tileStyle4}/004_4.png`),
    },
    'tile45': {
        img: require(`./img/${tileStyle4}/005_5.png`),
    },
    'tile46': {
        img: require(`./img/${tileStyle4}/006_6.png`),
    },
    'tile47': {
        img: require(`./img/${tileStyle4}/007_start.png`),
    },
    'tile48': {
        img: require(`./img/${tileStyle4}/008_default.png`),
    },
    'tile49': {
        img: require(`./img/${tileStyle4}/009_fix.png`),
    },
    'tile50': {
        img: require(`./img/${tileStyle4}/0010_corner.png`),
    },
    'tile51': {
        img: require(`./img/${tileStyle4}/0011_outline01.png`),
    },
    'tile52': {
        img: require(`./img/${tileStyle4}/0011_outline02.png`),
    },
    'tile53': {
        img: require(`./img/${tileStyle4}/0011_outline03.png`),
    },
    'tile54': {
        img: require(`./img/${tileStyle4}/0011_outline04.png`),
    },
    'tile55': {
        img: require(`./img/${tileStyle4}/0011_outline05.png`),
    },
    'tile56': {
        img: require(`./img/${tileStyle4}/0011_outline06.png`),
    },
    'tile57': {
        img: require(`./img/${tileStyle4}/0011_outline07.png`),
        offset: new paper.Point(-42, -0),
    },
    'tile58': {
        img: require(`./img/${tileStyle4}/0011_outline08.png`),
        offset: new paper.Point(-42, -0),
    },
    'tile59': {
        img: require(`./img/${tileStyle4}/0011_outline09.png`),
        offset: new paper.Point(-42, -42),
    },
}

export function load() {
    Object.keys(patternList.value).forEach((type) => {
        const def = patternList.value[type];
        def.type = type;
        def.offset = def.offset || new paper.Point(0, 0);
        const img = new paper.Raster(def.img);
        def.icon = img;
        def.icon.onLoad = () => {
            patternList.onLoad();
        }
        img.remove();
    });
}
