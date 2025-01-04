export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    // Call OpenAI API here
    const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
