import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import "./assets/style/Options.css";
import Typography from "@mui/material/Typography";

const Options = ({ setAutomatic, setManual }) => {
	const automaticChosen = () => {
		setAutomatic(true);
	};
	const manualChosen = () => {
		setManual(true);
	};
	return (
		<>
			<div id="cardContainer">
				<Card sx={{ maxWidth: 400 }}>
					<CardActionArea onClick={automaticChosen} data-testid="automatic-descriptions-option">
						<CardContent>
							<h2>Option A</h2> <h3>Automatic Descriptions</h3>
							<Typography variant="body2" color="text.secondary" style={{ whiteSpace: "pre-wrap" }}>
								The descriptions for each chart are generated in the moment using a GPT model.
								Because of that, <b> an OpenAI API key is needed.</b>
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
				<Card sx={{ maxWidth: 400 }}>
					<CardActionArea onClick={manualChosen} data-testid="manual-descriptions-option">
						<CardContent>
							<h2>Option B</h2>
							<h3>Manual Descriptions</h3>
							<Typography variant="body2" color="text.secondary" style={{ whiteSpace: "pre-wrap" }}>
								The descriptions for each chart were previously generated using a GPT model. They
								were then manually added to each chart. <b>No OpenAI API key is needed.</b>
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
		</>
	);
};
export default Options;
