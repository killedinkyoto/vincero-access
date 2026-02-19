export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    const response = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`,
        "revision": "2023-10-15"
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email: email
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error("Klaviyo error");
    }

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ error: "Subscription failed" });
  }
}
