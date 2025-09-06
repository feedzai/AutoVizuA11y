import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./assets/style/Options.css";

const KeyRequest = ({ apiKey, setApiKey, modelId, setModelId, baseUrl, setBaseUrl, setIsValid, setHome }) => {
	setHome(false);

	const isValidApiKey = (key) => {
		const apiKeyPattern = /^sk-(proj-)?[a-zA-Z0-9]{48}$/;
		return apiKeyPattern.test(key);
	};

	const isOpenAiApi = (baseUrl) => {
		return baseUrl === "https://api.openai.com/v1";
	}

	const handleApiKeyChange = (e) => {
		setApiKey(e.target.value);
	};

	const handleModelIdChange = (e) => {
		setModelId(e.target.value);
	};

	const handleBaseUrl = (e) => {
		setBaseUrl(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isOpenAiApi(baseUrl) && !isValidApiKey(apiKey)) {
			alert(
				"The OpenAI API key should start with 'sk-' and be followed by a string of exactly 48 alphanumeric characters.",
			);
			setIsValid(false);
		} else {
			setIsValid(true);
		}
	};

	return (
		<>
			<div id="cardContainer">
				<Card sx={{ maxWidth: 400 }}>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<h2>Option A</h2>
							<h3>Automatic Descriptions</h3>
							<Typography variant="body2" color="text.secondary" style={{ whiteSpace: "pre-wrap" }}>
								Please provide an{" "}
								<a href="https://platform.openai.com/account/api-keys" target="_blank">
									OpenAI
								</a>{" "}
								or OpenAI-compatible API key (the key is not saved). <br></br>The OpenAI API key should start with 'sk-' and be followed
								by a string of exactly 48 alphanumeric characters.
							</Typography>
							<br />
							<label>
								API Key:{" "}
								<input
									type="text"
									required
									placeholder="sk-... OR sk-proj-... OR ..."
									value={apiKey}
									onChange={handleApiKeyChange}
								/>
							</label>
							<br />
							<label>
								Model ID:{" "}
								<input
									type="text"
									required
									value={modelId}
									onChange={handleModelIdChange}
								/>
							</label>
							<br />
							<label>
								Base URL:{" "}
								<input
									type="url"
									required
									value={baseUrl}
									onChange={handleBaseUrl}
								/>
							</label>
							<br />
							<button type="submit" tabIndex={0}>
								Submit
							</button>
						</form>
						{apiKey.length > 0 && !isValidApiKey(apiKey) && isOpenAiApi(baseUrl) && (
							<p style={{ color: "red" }} role="alert">
								Invalid OpenAI API key format.
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default KeyRequest;
