import Ably from "ably/promises";

export default async function handler(req, res) {
  const client = new Ably.Realtime(process.env.API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "chat-app-pierregueroult",
  });
  res.status(200).json(tokenRequestData);
}
