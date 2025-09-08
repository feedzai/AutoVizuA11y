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

function CardGrid({ apiKey, model, baseUrl, setHome }) {
	setHome(false);
	return (
		<Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
			<Grid item>
				<Card sx={{ minWidth: 275, width: 450 }}>
					<CardContent>
						<BarChart apiKey={apiKey} model={model} baseUrl={baseUrl}></BarChart>
					</CardContent>
				</Card>
			</Grid>
			<Grid item>
				<Card sx={{ minWidth: 275, width: 450 }}>
					<CardContent>
						<SingleSeriesTimeline
							apiKey={apiKey}
							model={model}
							baseUrl={baseUrl}
						></SingleSeriesTimeline>
					</CardContent>
				</Card>
			</Grid>
			<Grid item>
				<Card sx={{ minWidth: 275, width: 450 }}>
					<CardContent>
						<MultiSeriesTimeline
							apiKey={apiKey}
							model={model}
							baseUrl={baseUrl}
						></MultiSeriesTimeline>
					</CardContent>
				</Card>
			</Grid>

			<Grid item>
				<Card sx={{ minWidth: 275, width: 450 }}>
					<CardContent>
						<Pie_ apiKey={apiKey} model={model} baseUrl={baseUrl}></Pie_>
					</CardContent>
				</Card>
			</Grid>
			<Grid item>
				<Card sx={{ minWidth: 275, width: 450 }}>
					<CardContent>
						<Treemap_ apiKey={apiKey} model={model} baseUrl={baseUrl}></Treemap_>
					</CardContent>
				</Card>
			</Grid>
			<Grid item>
				<Card sx={{ minWidth: 275, width: 450 }}>
					<CardContent>
						<Heatmap apiKey={apiKey} model={model} baseUrl={baseUrl}></Heatmap>
					</CardContent>
				</Card>
			</Grid>
			<Grid item>
				<Card sx={{ minWidth: 275, width: 450 }}>
					<CardContent>
						<StackedBar apiKey={apiKey} model={model} baseUrl={baseUrl}></StackedBar>
					</CardContent>
				</Card>
			</Grid>
			<Grid item>
				<Card sx={{ minWidth: 275, width: 450 }}>
					<CardContent>
						<Scatterplot apiKey={apiKey} model={model} baseUrl={baseUrl}></Scatterplot>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default CardGrid;
