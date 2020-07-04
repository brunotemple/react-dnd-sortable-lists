import React from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "../data/Types";

const DropWrapper = ({ onDrop, children, onHover, columnType }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item, monitor) => {
      onDrop(item, monitor);
    },
    hover: (item, monitor) => {
      onHover(item, monitor, columnType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={"drop-wrapper"} style={{ padding: 8 }}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper;
