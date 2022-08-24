import { MoveableManagerInterface, Renderer } from "react-moveable";

export interface MoveableDeleteButtonProps {
  deleteButton?: boolean;
  setTarget?: (target: HTMLElement | undefined) => void;
}
export const MoveableDeleteButton = {
  name: "deleteButton",
  props: {
    deleteButton: Boolean,
  },
  events: {},
  render(
    moveable: MoveableManagerInterface<MoveableDeleteButtonProps>,
    React: Renderer
  ) {
    const rect = moveable.getRect();
    const { pos2 } = moveable.state;

    const DeleteButton = moveable.useCSS(
      "div",
      `
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
            width: 24px;
            height: 24px;
            background: #4af;
            background: var(--moveable-color);
            opacity: 0.9;
            border-radius: 4px;
            cursor:pointer;
        }
        :host:before, :host:after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 16px;
            height: 2px;
            background: #fff;
            border-radius: 1px;
        }
        :host:after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        `
    );
    return (
      <DeleteButton
        className={"moveable-delete-button"}
        onClick={() => {
          const target = moveable.props.target;
          const setTarget = moveable.props.setTarget;
          if (target && setTarget) {
            target.parentElement?.removeChild(target);
            setTarget(undefined);
          }
        }}
        style={{
          transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`,
        }}
      />
    );
  },
} as const;
