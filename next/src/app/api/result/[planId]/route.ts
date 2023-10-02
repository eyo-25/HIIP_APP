import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { updatePlanResult } from "@/comman/service/result";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const planId = req.nextUrl.pathname.split("/")[3];
  const { isSuccess } = await req.json();

  return updatePlanResult(planId, isSuccess).then((data) => {
    return NextResponse.json(data);
  });
}
