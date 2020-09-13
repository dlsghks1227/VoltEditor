import paper from 'paper';

export function createButton(item: any, onClick: any, disable?: any) {
    const group = new paper.Group();

    const button = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(-item.size.width / 2, -item.size.height / 2),
            new paper.Point(item.size.width / 2, item.size.height / 2))
    );

    group.applyMatrix = false;

    if (disable)
        disable.visible = false;

    group.addChildren([button, item, disable]);

    group.data = {
        selected: false,
        hovered: false,
        pressed: false,
        disabled: false,
        select(isSelected: Boolean) {
            group.data.selected = isSelected;
        },
        hover(isHover: Boolean) {
            group.data.hovered = isHover;

        },
        press(isPressed: Boolean) {
            group.data.pressed = isPressed;

        },
        disable(isDisabled: Boolean) {
            group.data.disabled = isDisabled;
            if (disable)
            {
                item.visible = !isDisabled;
                disable.visible = isDisabled;
            }
            else
            {
                item.opacity = isDisabled ? 0.5 : 1;
            }

            if (isDisabled) {
                group.data.hover(false);
            }
        },
    };

    group.onMouseEnter = function () {
        if (group.data.disabled) {
            return;
        }
        group.data.hover(true);
    };
    group.onMouseLeave = function () {
        if (group.data.disabled) {
            return;
        }
        group.data.press(false);
        group.data.hover(false);
    };
    group.onMouseDown = function () {
        if (group.data.disabled) {
            return;
        }

        group.data.press(true);
    };
    group.onMouseUp = (event: any) => {
        if (group.data.disabled) {
            return;
        }
        if (group.data.pressed) {
            onClick(event, group);
        }
        group.data.press(false);
    };

    return group;
}