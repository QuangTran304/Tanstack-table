import { Box, Typography } from "@silverstein-properties/inspirelabs-ui";
import { CustomHeadlessTable } from "./components";
// import TanstackTable from "./components/ReactTable";

function App() {
  return (
    <>
      <Typography variant="h2" mb={"50px"}>
        Data Table Demo
      </Typography>

      {/* <TanstackTable /> */}
      <Box sx={{ padding: "35px" }}>
        <CustomHeadlessTable />
      </Box>
    </>
  );
}

export default App;
