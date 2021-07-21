export default async function getJSONDataFromApi(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
}
