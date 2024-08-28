export default function transformJSONmulti(multiLineData) {
  const multiData = [];

  for (const country in multiLineData) {
    for (const year in multiLineData[country]) {
      multiData.push({
        x: parseInt(year),
        y: multiLineData[country][year],
        series: country,
      });
    }
  }

  return multiData;
}
