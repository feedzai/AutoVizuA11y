import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BarChartManual from "./BarChartManual";
import SingleSeriesTimelineManual from "./SingleTimelineManual";
import MultiSeriesTimelineManual from "./MultiTimelineManual";
import PieManual from "./PieManual";
import TreemapManual from "./TreeMapManual";
import Grid from "@mui/material/Grid";
import HeatmapManual from "./HeatmapManual";
import StackedBarManual from "./StackedBarManual";
import manualDescriptions from "../../data/manualDescriptions.json";
import ScatterplotManual from "./ScatterplotManual";

const manualDescsAux = manualDescriptions[0];

function CardGridManual({ setHome }) {
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
            <BarChartManual
              longDesc={manualDescsAux["longDesc1"]}
              shortDesc={manualDescsAux["shortDesc1"]}
            ></BarChartManual>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <SingleSeriesTimelineManual
              longDesc={manualDescsAux["longDesc2"]}
              shortDesc={manualDescsAux["shortDesc2"]}
            ></SingleSeriesTimelineManual>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <MultiSeriesTimelineManual
              longDesc={manualDescsAux["longDesc3"]}
              shortDesc={manualDescsAux["shortDesc3"]}
            ></MultiSeriesTimelineManual>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <PieManual
              longDesc={manualDescsAux["longDesc4"]}
              shortDesc={manualDescsAux["shortDesc4"]}
            ></PieManual>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <TreemapManual
              longDesc={manualDescsAux["longDesc5"]}
              shortDesc={manualDescsAux["shortDesc5"]}
            ></TreemapManual>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <HeatmapManual
              longDesc={manualDescsAux["longDesc6"]}
              shortDesc={manualDescsAux["shortDesc6"]}
            ></HeatmapManual>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <StackedBarManual
              longDesc={manualDescsAux["longDesc7"]}
              shortDesc={manualDescsAux["shortDesc7"]}
            ></StackedBarManual>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 275, width: 450 }}>
          <CardContent>
            <ScatterplotManual
              longDesc={manualDescsAux["longDesc8"]}
              shortDesc={manualDescsAux["shortDesc8"]}
            ></ScatterplotManual>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CardGridManual;
