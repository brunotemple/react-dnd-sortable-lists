import React from "react";
import { useDrop } from "react-dnd";

import { ItemType, ColumnType } from "../types/Types.js";

const Column = ({ children, onHover, columnType }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      onHover(item, columnType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ padding: 8 }}>
      {columnType !== ColumnType.number ? (
        <div
          style={{
            minHeight: 48,
            width: 220,
            margin: 8,
            padding: 8,
            border: "0.5px solid black",
            background: isOver ? "lightGrey" : "white",
          }}
        >
          {children}
        </div>
      ) : (
        <div
          style={{
            minHeight: 48,
            display: "flex",
            justifyContent: "center",
            width: 220,
            margin: 8,
            padding: 8,
            border: "0.5px solid black",
            background: isOver ? "lightGrey" : "white",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Column;
