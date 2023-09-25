import {
  createPlan,
  getDatePlanList,
  getPlanList,
} from "@/comman/service/plan";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const date = req.nextUrl.searchParams.get("date");
  if (date) {
    return getDatePlanList(user.id, date).then((data) =>
      NextResponse.json(data)
    );
  }

  return getPlanList(user.id).then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const formData = await req.json();

  return createPlan(user.id, formData).then((data) => {
    return NextResponse.json(data);
  });
}
