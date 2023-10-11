import { Box, Typography } from "@silverstein-properties/inspirelabs-ui";
import Table from "./components/ReactTable";

function App() {
  return (
    <Box padding={"35px"}>
      <Typography variant="h2" mb={"50px"}>
        Data Table Demo
      </Typography>

      <Table />
    </Box>
  );
}

export default App;
