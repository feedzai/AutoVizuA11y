import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BarChart from "./BarChartAutomatic";
import SingleSeriesTimeline from "./SingleTimelineAutomatic";
import MultiSeriesTimeline from "./MultiTimelineAutomatic";
import Pie_ from "./PieAutomatic";
import Treemap_ from "./TreeMapAutomatic";
import Grid from "@mui/material/Grid";
import Heatmap from "./HeatmapAutomatic";
import StackedBar from "./StackedBarAutomatic";
import Scatterplot from "./ScatterplotAutomatic";

function CardGrid({ apiKey, setHome }) {
  setHome(false);
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <BarChart apiKey={apiKey}></BarChart>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <SingleSeriesTimeline apiKey={apiKey}></SingleSeriesTimeline>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <MultiSeriesTimeline apiKey={apiKey}></MultiSeriesTimeline>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <Pie_ apiKey={apiKey}></Pie_>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <Treemap_ apiKey={apiKey}></Treemap_>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <Heatmap apiKey={apiKey}></Heatmap>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <StackedBar apiKey={apiKey}></StackedBar>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <Scatterplot apiKey={apiKey}></Scatterplot>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CardGrid;
