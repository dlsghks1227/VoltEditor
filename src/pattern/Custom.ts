import paper from 'paper';
import { AsyncObject } from '../api/asyncObject';
import { TileState } from '../state';

const CustomPath = "TileStyle5"

export const Patterns = new AsyncObject();
Patterns.value = {
    'tile1': {
        img: require(`../img/${CustomPath}/Voltmap_custom-tile_circle.png`),
        state: TileState.Custom,
    },
    'tile2': {
        img: require(`../img/${CustomPath}/Voltmap_custom-tile_diamond.png`),
        state: TileState.Custom,
    },
    'tile3': {
        img: require(`../img/${CustomPath}/Voltmap_custom-tile_square.png`),
        state: TileState.Custom,
    },
    'tile4': {
        img: require(`../img/${CustomPath}/Voltmap_custom-tile_triangle_1.png`),
        state: TileState.Custom,
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