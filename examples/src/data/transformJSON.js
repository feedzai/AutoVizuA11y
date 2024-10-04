export default function transformJSON(inputJSON) {
  const outputArray = [];

  for (const key in inputJSON) {
    if (inputJSON.hasOwnProperty(key)) {
      outputArray.push({
        x: key,
        y: inputJSON[key],
      });
    }
  }

  return outputArray;
}
