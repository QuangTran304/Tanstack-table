import { Box, styled } from "@silverstein-properties/inspirelabs-ui";

export const StyledTable = styled("table")((props) => ({
  width: props.width || "100%",
  borderCollapse: "collapse",
  borderSpacing: "0",
  borderRadius: "8px",
  overflow: "hidden", // This property is not valid for table, it's for div wrapper
}));

export const StyledTableHead = styled("th")(
  ({ width }: { width: number | string }) => ({
    border: "1px solid lightgray",
    textAlign: "left",
    padding: "12px 8px",
    width: width || "auto",
    position: "relative",
    backgroundColor: "#dedede",
  })
);

export const StyledTableData = styled("td")({
  border: "1px solid #ddd",
  textAlign: "left",
  // padding: "8px",
});

export const StyledResizeHandle = styled(Box)(
  ({
    backgroundColor,
    opacity,
  }: {
    backgroundColor: string;
    opacity: number;
  }) => ({
    position: "absolute",
    top: "0",
    right: "0",
    width: "4px",
    transform: "translateX(2px)",
    height: "100%",
    backgroundColor: backgroundColor,
    cursor: "col-resize",
    userSelect: "none",
    touchAction: "none",
    opacity: opacity,
    "&:hover": {
      opacity: 1,
    },
  })
);
