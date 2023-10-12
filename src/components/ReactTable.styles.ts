import { styled } from "@silverstein-properties/inspirelabs-ui";

export const StyledTable = styled("table")((props) => ({
  width: props.width || "100%",
  borderCollapse: "collapse",
}));

export const StyledTableHead = styled("th")(
  ({ width }: { width: number | string }) => ({
    border: "1px solid #ddd",
    textAlign: "left",
    padding: "8px",
    width: width || "auto",
    position: "relative",
  })
);

export const StyledTableData = styled("td")({
  border: "1px solid #ddd",
  textAlign: "left",
  padding: "8px",
});
