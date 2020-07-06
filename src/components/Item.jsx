import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemType, ColumnType } from "../types/Types.js";

const Item = ({ item, index, moveItem, columnType, onBegin }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      let hoverMiddle = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      let hoverClient = mousePosition.y - hoveredRect.top;
      if (columnType === ColumnType.number) {
        hoverMiddle = (hoveredRect.right - hoveredRect.left) / 2;
        hoverClient = mousePosition.x - hoveredRect.left;
      }

      if (dragIndex < hoverIndex && hoverClient < hoverMiddle) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClient > hoverMiddle) {
        return;
      }

      moveItem(dragIndex, hoverIndex, item.id, true, columnType);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemType, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin: () => {
      onBegin(columnType);
    },
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveItem(droppedId, originalIndex, item.id, false, columnType);
      }
    },
  });

  drag(drop(ref));

  return (
    <>
      {columnType === ColumnType.graph ? (
        <div
          ref={ref}
          style={{
            border: "0.5px solid magenta",
            marginTop: 4,
            marginBottom: 8,
            height: 36,
            opacity: isDragging ? 0 : 1,
          }}
        >
          <p>{item.graph}</p>
        </div>
      ) : columnType === ColumnType.text ? (
        <div
          ref={ref}
          style={{
            border: "0.5px solid pink",
            marginTop: 4,
            marginBottom: 8,
            height: 36,
            opacity: isDragging ? 0 : 1,
          }}
        >
          <p>{item.text}</p>
        </div>
      ) : (
        <div
          ref={ref}
          style={{
            border: "0.5px solid purple",
            margin: `8px 4px`,
            height: 50,
            width: 50,
            borderRadius: 25,
            opacity: isDragging ? 0 : 1,
          }}
        >
          <p>{item.value}</p>
        </div>
      )}
    </>
  );
};

export default Item;
