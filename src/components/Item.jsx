import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemType, ColumnType } from "../data/Types";

const Item = ({ item, index, moveItem, columnType }) => {
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
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex, item.id, true);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemType, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveItem(droppedId, originalIndex, item.id, false);
      }
    },
  });

  drag(drop(ref));

  return (
    <>
      {columnType === ColumnType.chart ? (
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
          <p>{item.graph}</p>
        </div>
      ) : (
        <div
          ref={ref}
          style={{
            border: "0.5px solid pink",
            margin: `8px 4px`,
            height: 36,
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
