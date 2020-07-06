import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

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
  const [sourceColumn, setSourceColumn] = useState(ColumnType.text);

  const onBegin = (columnType) => {
    setSourceColumn(columnType);
  };

  const moveItem = useCallback(
    (dragIndex, hoverIndex, itemId, isDragging, currentColumn) => {
      if (currentColumn === ColumnType.text) return;
      if (currentColumn === ColumnType.graph) {
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
          if (dragItem) {
            setBarList(
              update(barList, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, dragItem],
                ],
              })
            );
          }
        }
      }

      if (currentColumn === ColumnType.number) {
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
          if (dragItem) {
            setCircleList(
              update(circleList, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, dragItem],
                ],
              })
            );
          }
        }
      }
    },
    [barList, circleList]
  );

  const onHover = (item, currentColumn) => {
    if (currentColumn === ColumnType.text) return;
    if (currentColumn === ColumnType.graph) {
      if (!barList.some((listItem) => listItem.id === item.id)) {
        const dragItem = textList.find((listItem) => item.id === listItem.id);
        const barListUpdate = [...barList];
        barListUpdate.splice(item.index, 0, dragItem);

        if (sourceColumn !== ColumnType.text) {
          const indexCircleList = circleList.findIndex(
            (barItem) => barItem.id === item.id
          );
          if (indexCircleList >= 0) {
            const circleListUpdate = [...circleList];
            circleListUpdate.splice(indexCircleList, 1);
            setCircleList(
              update(circleList, {
                $set: circleListUpdate,
              })
            );
          }
        }
        setBarList(
          update(barList, {
            $set: barListUpdate,
          })
        );
      }
    }
    if (currentColumn === ColumnType.number) {
      if (!circleList.some((listItem) => listItem.id === item.id)) {
        const dragItem = textList.find((listItem) => item.id === listItem.id);
        const circleListUpdate = [...circleList];
        circleListUpdate.splice(item.index, 0, dragItem);

        if (sourceColumn !== ColumnType.text) {
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
        }
        setCircleList(
          update(circleList, {
            $set: circleListUpdate,
          })
        );
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <div>
          <h2>Main List</h2>
          <Column onHover={onHover} columnType={ColumnType.text}>
            {textList.map((item, index) => (
              <Item
                key={item.id}
                item={item}
                index={index}
                moveItem={moveItem}
                columnType={ColumnType.text}
                onBegin={onBegin}
              />
            ))}
          </Column>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>List as a graph</h2>
          <Column onHover={onHover} columnType={ColumnType.graph}>
            {barList.map((item, index) => (
              <Item
                key={item.id}
                item={item}
                index={index}
                moveItem={moveItem}
                columnType={ColumnType.graph}
                onBegin={onBegin}
              />
            ))}
          </Column>
          <h2>List as a number</h2>
          <Column onHover={onHover} columnType={ColumnType.number}>
            {circleList.map((item, index) => (
              <Item
                key={item.id}
                item={item}
                index={index}
                moveItem={moveItem}
                columnType={ColumnType.number}
                onBegin={onBegin}
              />
            ))}
          </Column>
        </div>
      </div>
    </DndProvider>
  );
};

export default ConfigureCard;
