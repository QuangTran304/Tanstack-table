import { Container, Typography } from "@silverstein-properties/inspirelabs-ui";
import { TanstackTable } from "./components";

function App() {
  return (
    <Container sx={{ paddingY: "50px" }}>
      <Typography variant="h2" mb={"50px"}>
        Data Table Demo
      </Typography>

      {/* <CustomHeadlessTable /> */}
      <TanstackTable />
    </Container>
  );
}

export default App;
