exports.handler = async (event) => {
  const API_KEY = process.env.ANTHROPIC_API_KEY;
  
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 100,
        messages: [{ role: "user", content: "Reply with: OK" }]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        status: "success", 
        api_response: data.content?.[0]?.text || "no content",
        has_key: !!API_KEY
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, has_key: !!API_KEY })
    };
  }
};
