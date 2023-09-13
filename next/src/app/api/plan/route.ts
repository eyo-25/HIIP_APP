import { getPlanList } from "@/comman/service/plan";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const date = req.nextUrl.searchParams.get("date") as string;

  return getPlanList(user.id, date).then((data) => NextResponse.json(data));
}
