import Ably from "ably/promises";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse) {
  const client = new Ably.Realtime(process.env.API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "chat-app-pierregueroult",
  });
  res.status("200").json(tokenRequestData);
}
