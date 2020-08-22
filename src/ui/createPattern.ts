import paper from 'paper';

type patternOption = {
  alpha?: number
  highlightedColor?: paper.Color
  selectedColor?: paper.Color
  disabledColor?: paper.Color
};

export function CreatePattern(item: paper.Raster, iconSize: number, onClick: any, options?: patternOption) {
  const alpha = options?.alpha ?? 0.0001;

  const group = new paper.Group();

  const pattern = new paper.Path.Circle(new paper.Point(0, 0), iconSize);
  group.applyMatrix = false;
  group.addChildren([pattern, item]);

  item.on('load', () => {
    item.size = new paper.Size(400, 300);
    item.position = paper.view.center;
  });

  console.log(paper.view.center);

  return group;
}