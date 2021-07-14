export default function getJSONDataFromApi(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
}