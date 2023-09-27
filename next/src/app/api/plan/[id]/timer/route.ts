import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PlanHistory } from "@/comman/model/plan";
import { getPlanTimer, updatePlanTimer } from "@/comman/service/plan";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const planId = req.nextUrl.pathname.split("/")[3];
  return getPlanTimer(planId, user.id).then((data) => NextResponse.json(data));
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const planId = req.nextUrl.pathname.split("/")[3];
  const timerData: PlanHistory = await req.json();

  return updatePlanTimer(planId, timerData).then((data) => {
    return NextResponse.json(data);
  });
}
