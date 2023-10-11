import { Typography } from "@silverstein-properties/inspirelabs-ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Data, type Task } from "../data";

const columnHelper = createColumnHelper<Task>();

const columns = [
  columnHelper.accessor("task", {
    cell: (info) => info.getValue(),
    header: () => <Typography variant="labelMedium">Task</Typography>,
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue()?.name,
    header: () => <Typography variant="labelMedium">Status</Typography>,
  }),
  columnHelper.accessor("due", {
    cell: (info) => info.getValue()?.toLocaleTimeString(),
    header: () => <Typography variant="labelMedium">Due</Typography>,
  }),
  columnHelper.accessor("notes", {
    cell: (info) => info.getValue(),
    header: () => <Typography variant="labelMedium">Notes</Typography>,
  }),
];

const ReactTable = () => {
  const [data] = useState(() => [...Data]);
  // const renderer = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer
      sx={{
        maxWidth: "60vw",
        // border: "1px solid lightgray",
        // borderRadius: "8px",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{ border: "1px solid lightgray" }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} sx={{ border: "1px solid lightgray" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReactTable;
