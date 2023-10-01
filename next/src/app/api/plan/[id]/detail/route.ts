import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDetailPlan } from "@/comman/service/result";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const planId = req.nextUrl.pathname.split("/")[3];

  return getDetailPlan(planId, user.id).then((data) => NextResponse.json(data));
}
