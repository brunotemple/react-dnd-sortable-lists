import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

import DropWrapper from "./DropWrapper";
import Column from "./Column";
import Item from "./Item";
import { ColumnType } from "../types/Types.js";
import {
  dummyListBars,
  dummyListCircle,
  dummyListText,
} from "../data/dummyData";

const ConfigureCard = () => {
  const [textList] = useState(dummyListText);
  const [barList, setBarList] = useState(dummyListBars);
  const [circleList, setCircleList] = useState(dummyListCircle);

  const onDrop = (item, monitor) => {
    console.log("drop:ITEM", item);
    console.log("drop:MONITOR", monitor);
  };

  const onDrop1 = (item, monitor) => {
    console.log("drop2:ITEM", item);
    console.log("drop2:MONITOR", monitor);
  };
  const onDrop2 = (item, monitor) => {
    console.log("drop3:ITEM", item);
    console.log("drop3:MONITOR", monitor);
  };

  const moveItem = useCallback((dragIndex, hoverIndex, itemId, isDragging) => {
    console.log("moveItem");
  }, []);

  const moveItem1 = useCallback(
    (dragIndex, hoverIndex, itemId, isDragging) => {
      if (!hoverIndex && !isDragging) {
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

  const onHover = (item, monitor) => {
    console.log("onHover");
  };

  const onHover1 = (item, monitor) => {
    if (!barList.some((barItem) => barItem.id === item.id)) {
      const dragItem = textList.find((circleItem) => item.id === circleItem.id);
      const barListUpdate = [...barList];
      barListUpdate.splice(item.index, 0, dragItem);

      // const indexCircleList = circleList.findIndex(
      //   (barItem) => barItem.id === item.id
      // );
      // if (indexCircleList >= 0) {
      //   const circleListUpdate = [...circleList];
      //   circleListUpdate.splice(indexCircleList, 1);
      //   setCircleList(
      //     update(circleList, {
      //       $set: circleListUpdate,
      //     })
      //   );
      // }
      setBarList(
        update(barList, {
          $set: barListUpdate,
        })
      );
    }
  };

  const onHover2 = (item, monitor) => {
    if (!circleList.some((barItem) => barItem.id === item.id)) {
      const dragItem = textList.find((circleItem) => item.id === circleItem.id);
      const circleListUpdate = [...circleList];
      circleListUpdate.splice(item.index, 0, dragItem);

      // const indexBarList = barList.findIndex(
      //   (barItem) => barItem.id === item.id
      // );
      // if (indexBarList >= 0) {
      //   const barListUpdate = [...barList];
      //   barListUpdate.splice(indexBarList, 1);
      //   setBarList(
      //     update(barList, {
      //       $set: barListUpdate,
      //     })
      //   );
      // }
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
        <DropWrapper onDrop={onDrop} onHover={onHover}>
          <>
            <h2>Main List</h2>
            <Column columnType={ColumnType.text}>
              {textList.map((item, index) => (
                <Item
                  key={item.id}
                  item={item}
                  index={index}
                  moveItem={moveItem}
                  columnType={ColumnType.text}
                />
              ))}
            </Column>
          </>
        </DropWrapper>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <DropWrapper onDrop={onDrop1} onHover={onHover1}>
            <>
              <h2>List as a graph</h2>
              <Column columnType={ColumnType.graph}>
                {barList.map((item, index) => (
                  <Item
                    key={item.id}
                    item={item}
                    index={index}
                    moveItem={moveItem1}
                    columnType={ColumnType.graph}
                  />
                ))}
              </Column>
            </>
          </DropWrapper>
          <DropWrapper onDrop={onDrop2} onHover={onHover2}>
            <>
              <h2>List as a number</h2>
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
            </>
          </DropWrapper>
        </div>
      </div>
    </DndProvider>
  );
};

export default ConfigureCard;
