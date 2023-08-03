import React, { cloneElement, useState } from "react";
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  FloatingFocusManager,
  FloatingPortal,
  useFloatingNodeId,
  FloatingNode,
  FloatingTree,
  useFloatingParentNodeId
} from "@floating-ui/react-dom-interactions";

interface Props {
  render: (data: {
    close: () => void;
    labelId: string;
    descriptionId: string;
  }) => React.ReactNode;
  placement?: Placement;
  children: JSX.Element;
}

const Popover = ({ children, render, placement }: Props) => {
  const [open, setOpen] = useState(false);

  const nodeId = useFloatingNodeId();

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift()],
    placement,
    nodeId,
    whileElementsMounted: autoUpdate
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)
  ]);

  return (
    <FloatingNode id={nodeId}>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context}>
            <div
              {...getFloatingProps({
                className: "Popover",
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0
                },
                "aria-labelledby": labelId,
                "aria-describedby": descriptionId
              })}
            >
              {render({
                labelId,
                descriptionId,
                close: () => {
                  setOpen(false);
                }
              })}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </FloatingNode>
  );
};

export const NestedPopover: React.FC<Props> = (props) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <Popover {...props} />
      </FloatingTree>
    );
  }

  return <Popover {...props} />;
};
