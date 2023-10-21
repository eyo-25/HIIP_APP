import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCalendarList } from "@/comman/service/calendar";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const date = req.nextUrl.searchParams.get("date");

  if (date) {
    return getCalendarList(user.id, date).then((data) =>
      NextResponse.json(data)
    );
  }
}
