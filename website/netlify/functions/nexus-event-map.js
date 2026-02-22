const NEXUS_MAP_BASE = "https://frc.nexus/api/v1/event";

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const eventKey = event.queryStringParameters?.eventKey;
  if (!eventKey) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "eventKey query parameter required" }),
    };
  }
  const apiKey = process.env.NEXUS_API_KEY || process.env.VITE_NEXUS_API_KEY;
  try {
    const res = await fetch(`${NEXUS_MAP_BASE}/${eventKey}/map`, {
      headers: { "Nexus-Api-Key": apiKey || "" },
    });
    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { "Content-Type": res.headers.get("content-type") || "application/json" },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
