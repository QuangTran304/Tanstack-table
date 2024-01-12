import { CellContext } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Task } from "../../data";

const EditableCell = (props: CellContext<Task, string>) => {
  const { getValue, row, column, table } = props;
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    />
  );
};

export default EditableCell;
