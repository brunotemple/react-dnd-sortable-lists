import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropWrapper from "./DropWrapper";
import Column from "./Column";
import Item from "./Item";
import { dummyListBars, dummyListCircle } from "../data/dummyData";
import update from "immutability-helper";
import { ColumnType } from "../data/Types";

const ConfigureCard = () => {
  const [barList, setBarList] = useState(dummyListBars);
  const [circleList, setCircleList] = useState(dummyListCircle);

  const onDrop1 = (item, monitor) => {
    console.log("drop2:ITEM", item);
    console.log("drop2:MONITOR", monitor);
  };
  const onDrop2 = (item, monitor) => {
    console.log("drop3", item, monitor);
  };

  const moveItem1 = useCallback(
    (dragIndex, hoverIndex, itemId, isDragging) => {
      if (!hoverIndex && !isDragging) {
        console.log("002");
        const dragItemIndex = barList.findIndex(
          (itemInfo) => itemId === itemInfo.id
        );
        setBarList(
          update(barList, {
            $splice: [[dragItemIndex, 1]],
          })
        );
        return;
      }
      console.log("003");
      if (hoverIndex) {
        const dragItem = barList[dragIndex];
        setBarList(
          update(barList, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragItem],
            ],
          })
        );
      }
    },
    [barList]
  );

  const moveItem2 = useCallback(
    (dragIndex, hoverIndex, itemId, isDragging) => {
      if (!hoverIndex && !isDragging) {
        const dragItemIndex = circleList.findIndex(
          (itemInfo) => itemId === itemInfo.id
        );
        setCircleList(
          update(circleList, {
            $splice: [[dragItemIndex, 1]],
          })
        );
        return;
      }
      if (hoverIndex) {
        const dragItem = circleList[dragIndex];
        setCircleList(
          update(circleList, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragItem],
            ],
          })
        );
      }
    },
    [circleList]
  );

  const onHover1 = (item, monitor) => {
    if (!barList.some((barItem) => barItem.id === item.id)) {
      console.log("000");
      const dragItem = circleList.find(
        (circleItem) => item.id === circleItem.id
      );
      const barListUpdate = [...barList];
      barListUpdate.splice(item.index, 0, dragItem);

      const indexCircleList = circleList.findIndex(
        (barItem) => barItem.id === item.id
      );
      if (indexCircleList >= 0) {
        console.log("001");
        const circleListUpdate = [...circleList];
        circleListUpdate.splice(indexCircleList, 1);
        setCircleList(
          update(circleList, {
            $set: circleListUpdate,
          })
        );
      }
      setBarList(
        update(barList, {
          $set: barListUpdate,
        })
      );
    }
  };

  const onHover2 = (item, monitor) => {
    if (!circleList.some((barItem) => barItem.id === item.id)) {
      const dragItem = barList.find((circleItem) => item.id === circleItem.id);
      const circleListUpdate = [...circleList];
      circleListUpdate.splice(item.index, 0, dragItem);

      const indexBarList = barList.findIndex(
        (barItem) => barItem.id === item.id
      );
      if (indexBarList >= 0) {
        const barListUpdate = [...barList];
        barListUpdate.splice(indexBarList, 1);
        setBarList(
          update(barList, {
            $set: barListUpdate,
          })
        );
      }
      setCircleList(
        update(circleList, {
          $set: circleListUpdate,
        })
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <DropWrapper
          onDrop={onDrop1}
          onHover={onHover1}
          columnType={ColumnType.chart}
        >
          <Column columnType={ColumnType.chart}>
            {barList.map((item, index) => (
              <Item
                key={item.id}
                item={item}
                index={index}
                moveItem={moveItem1}
                columnType={ColumnType.chart}
              />
            ))}
          </Column>
        </DropWrapper>
        <DropWrapper
          onDrop={onDrop2}
          onHover={onHover2}
          columnType={ColumnType.number}
        >
          <Column columnType={ColumnType.number}>
            {circleList.map((item, index) => (
              <Item
                key={item.id}
                item={item}
                index={index}
                moveItem={moveItem2}
                columnType={ColumnType.number}
              />
            ))}
          </Column>
        </DropWrapper>
      </div>
    </DndProvider>
  );
};

export default ConfigureCard;
