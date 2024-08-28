import "./assets/style/Homepage.css";
import { useState } from "react";
import Options from "./Options";
import KeyRequest from "./KeyRequest";
import CardGrid from "./components/automatic/ChartGrid";
import CardGridManual from "./components/manual/ChartGridManual";

function Homepage() {
	const [apiKey, setApiKey] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [automatic, setAutomatic] = useState(false);
	const [manual, setManual] = useState(false);
	const [home, setHome] = useState(true);

	const goBack = () => {
		setHome(true);
		setAutomatic(false);
		setManual(false);
		setIsValid(false);
	};

	return (
		<div className="Homepage">
			<h1>AutoVizuA11y — examples</h1>
			{home === false ? (
				<button onClick={goBack} tabIndex={0}>
					Go back
				</button>
			) : (
				<p>
					{" "}
					Choose one of the options to access a gallery of charts built using{" "}
					<a href="https://github.com/feedzai/AutoVizuA11y" target="_blank">
						AutoVizuA11y
					</a>{" "}
				</p>
			)}
			{isValid && apiKey !== "" ? (
				<>
					<div style={{ marginTop: 20 }}>
						<CardGrid apiKey={apiKey} setHome={setHome} />
					</div>
					<p>
						Data from{" "}
						<a href="https://data.un.org/" target="_blank">
							UN Data
						</a>
					</p>
				</>
			) : manual ? (
				<>
					<div style={{ marginTop: 20 }}>
						<CardGridManual setHome={setHome} />
					</div>
					<p>
						Data from{" "}
						<a href="https://data.un.org/" target="_blank">
							UN Data
						</a>
					</p>
				</>
			) : automatic ? (
				<div style={{ margin: 20 }}>
					<KeyRequest
						apiKey={apiKey}
						setApiKey={setApiKey}
						isValid={isValid}
						setIsValid={setIsValid}
						home={home}
						setHome={setHome}
						setAutomatic={setAutomatic}
					/>
				</div>
			) : home ? (
				<Options
					apiKey={apiKey}
					setApiKey={setApiKey}
					isValid={isValid}
					setIsValid={setIsValid}
					automatic={automatic}
					setAutomatic={setAutomatic}
					manual={manual}
					setManual={setManual}
				/>
			) : (
				<p></p>
			)}
		</div>
	);
}

export default Homepage;
