import React from "react";

import { ColumnType } from "../types/Types";

const Column = ({ children, columnType }) => {
  return columnType !== ColumnType.number ? (
    <div
      style={{
        minHeight: 48,
        width: 220,
        margin: 8,
        padding: 8,
        border: "0.5px solid black",
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
      }}
    >
      {children}
    </div>
  );
};

export default Column;
