import React from "react";
import { useDrop } from "react-dnd";

import { ItemType } from "../types/Types.js";

const DropWrapper = ({ onDrop, children, onHover }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item, monitor) => {
      onDrop(item, monitor);
    },
    hover: (item, monitor) => {
      onHover(item, monitor);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ padding: 8 }}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper;
