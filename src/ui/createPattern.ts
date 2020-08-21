import paper from 'paper';

type patternOption = {
    alpha?: number
};

export function CreatePattern(item: paper.Raster, onClick: any, options?: patternOption)
{
    const alpha = options?.alpha ?? 0.0001;

    const group = new paper.Group();
    group.applyMatrix = false;

    const pattern = new paper.Path.Rectangle(new paper.Point(0, 0));
    group.addChildren([pattern, item]);
}