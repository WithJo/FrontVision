import {
  Box,
  Grid2,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import TopSearchBar from "../../components/TopSearchBar";
import NavBar from "../../components/NavBar";
import BottomPlayerBar from "../../components/BottomPlayerBar";

function Home() {
  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <TopSearchBar />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <NavBar />

        <Box sx={{ flexGrow: 1, p: 2, backgroundColor: "grey.200" }}>
          <Grid2 container spacing={2}>
            {["노래 1", "노래 2", "노래 3"].map((title) => (
              <Grid2 item xs={12} sm={6} md={4} key={title}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h5">{title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>

      <BottomPlayerBar />
    </Box>
  );
}

export default Home;
