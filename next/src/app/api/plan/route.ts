import { createPlan, getPlanList } from "@/comman/service/plan";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ColorType, FormDataModel } from "@/comman/model/plan";

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getPlanList(user.id).then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const form = (await req.formData()) ?? "";
  const title = form.get("title")?.toString() ?? "";
  const memo = form.get("memo")?.toString() ?? "";
  const startDate = form.get("startDate")?.toString() ?? "";
  const endDate = form.get("endDate")?.toString() ?? "";
  const interval = Number(form.get("interval")?.toString());
  const focusTime = Number(form.get("focusTime")?.toString());
  const breakTime = Number(form.get("breakTime")?.toString());
  const color = (form.get("color")?.toString() as ColorType) ?? "red";
  const days =
    form
      .get("days")
      ?.toString()
      .split(",")
      .map((day) => +day) ?? [];

  const formData: FormDataModel = {
    title,
    memo,
    startDate,
    endDate,
    interval,
    focusTime,
    breakTime,
    color,
    days,
  };

  // console.log(formData);

  return createPlan(user.id, formData).then((data) => {
    console.log(NextResponse.json(data));
    NextResponse.json(data);
  });
}
