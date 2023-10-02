import { deletePlan } from "@/comman/service/plan";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getPlan, updatePlan } from "@/comman/service/write";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const planId = req.nextUrl.pathname.split("/")[3];

  return getPlan(planId, user.id).then((data) => NextResponse.json(data));
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const planId = req.nextUrl.pathname.split("/")[3];
  const formData = await req.json();

  return updatePlan(planId, formData).then((data) => {
    return NextResponse.json(data);
  });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const planId = req.nextUrl.pathname.split("/")[3];

  return deletePlan(planId).then((data) => {
    return NextResponse.json(data);
  });
}
