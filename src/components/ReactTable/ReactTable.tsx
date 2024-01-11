import { Box, Typography } from "@silverstein-properties/inspirelabs-ui";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Data, type Task } from "../../data";
import {
  StyledResizeHandle,
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
    size: 350,
  }),
];

// =========================================================================================================

const ReactTable = () => {
  const [data] = useState(() => [...Data]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
                  {header.column.getCanSort() && (
                    <Typography
                      onClick={header.column.getToggleSortingHandler()}
                      variant="labelLarge"
                    >
                      {" "}
                      -
                    </Typography>
                  )}
                  {{
                    asc: " 👆",
                    desc: " 👇",
                  }[header.column.getIsSorted() as string] ?? null}

                  <StyledResizeHandle
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    backgroundColor={
                      header.column.getIsResizing() ? "#2eff31" : "#27bbff"
                    }
                    opacity={header.column.getIsResizing() ? 1 : 0}
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
