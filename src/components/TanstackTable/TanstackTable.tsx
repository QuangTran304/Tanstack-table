import { Box, Typography } from "@silverstein-properties/inspirelabs-ui";
import {
  RowData,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useRef, useState } from "react";
import { Data, type Task } from "../../data";
import {
  StyledResizeHandle,
  StyledTable,
  StyledTableData,
  StyledTableHead,
} from "./TanstackTable.styles";
import EditableCell from "./EditableCell";

// =========================================================================================================

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// =========================================================================================================

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

// =========================================================================================================

const columnHelper = createColumnHelper<Task>();

const columns = [
  columnHelper.accessor("task", {
    // cell: (info) => info.getValue(),
    cell: (info) => <EditableCell {...info} />,
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

const TanstackTable = () => {
  const [data, setData] = useState(() => [...Data]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // console.log("=====> Table data", data);

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
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex], // Spread old data of the row
                [columnId]: value, // Update the column with new data
              };
            }
            return row;
          })
        );
      },
    },
    // debugTable: true,
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
                  {/* ===== Header text/cell ===== */}
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {/* ===== Header sort button ===== */}
                  {header.column.getCanSort() && (
                    <Typography
                      onClick={header.column.getToggleSortingHandler()}
                      variant="labelLarge"
                      sx={{ cursor: "pointer" }}
                    >
                      {" "}
                      ~
                    </Typography>
                  )}
                  {/* ===== Header sort indicator ===== */}
                  {{
                    asc: " ⬆️",
                    desc: " ⬇️",
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

export default TanstackTable;
