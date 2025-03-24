export default async function handler(req, res) {
  const { query, id } = req.query;
  const API_KEY = "6ca3d9ec"; // Hardcoded API key
  let url = "";

  if (query) {
    url = `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
  } else if (id) {
    url = `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
  }

  if (url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
