import { Box, Typography } from "@silverstein-properties/inspirelabs-ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Data, type Task } from "../data";
import {
  StyledTable,
  StyledTableData,
  StyledTableHead,
} from "./ReactTable.styles";

const columnHelper = createColumnHelper<Task>();

const columns = [
  columnHelper.accessor("task", {
    cell: (info) => info.getValue(),
    header: () => <Typography variant="labelLarge">Task</Typography>,
    size: 350,
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue()?.name,
    header: () => <Typography variant="labelLarge">Status</Typography>,
    size: 150,
  }),
  columnHelper.accessor("due", {
    cell: (info) => info.getValue()?.toLocaleTimeString(),
    header: () => <Typography variant="labelLarge">Due</Typography>,
    size: 150,
  }),
  columnHelper.accessor("notes", {
    cell: (info) => info.getValue(),
    header: () => <Typography variant="labelLarge">Notes</Typography>,
  }),
];

const ReactTable = () => {
  const [data] = useState(() => [...Data]);
  // const renderer = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <Box>
      <StyledTable width={table.getTotalSize()}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <StyledTableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  width={header.getSize()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                  <Box
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    sx={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "4px",
                      transform: "translateX(2px)",
                      height: "100%",
                      backgroundColor: header.column.getIsResizing()
                        ? "#2eff31"
                        : "#27bbff",
                      cursor: "col-resize",
                      userSelect: "none",
                      touchAction: "none",
                      opacity: header.column.getIsResizing() ? 1 : 0,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  />
                </StyledTableHead>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <StyledTableData key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledTableData>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Box>
  );
};

export default ReactTable;
