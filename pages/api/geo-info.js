export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const responce = await fetch("https://freegeoip.app/json/");
      const geoData = await responce.json();
      return res.status(200).json(geoData);
    } catch (error) {
      return res.status(500).json({ error: "Can't get the data!" });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
