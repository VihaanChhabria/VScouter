const TBA_BASE = "https://www.thebluealliance.com/api/v3";

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
  const apiKey = process.env.TBA_API_KEY || process.env.VITE_TBA_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "TBA_API_KEY not configured" }) };
  }
  try {
    const res = await fetch(`${TBA_BASE}/event/${eventKey}/teams/simple`, {
      headers: { "X-TBA-Auth-Key": apiKey },
    });
    const data = await res.json();
    return {
      statusCode: res.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
