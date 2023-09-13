import dayjs from "dayjs";
import { client } from "./sanity";

export async function getPlanList(userId: string, date: string) {
  const convertDate = date.replace(/[\{\}]/g, "").trim();
  const day = dayjs(convertDate).day();
  const searchDate = new Date(convertDate);

  return await client.fetch(
    `*[_type == "plan" && author._ref == $userId && startdate <= $searchDate && enddate >= $searchDate && $day in days[]] | order(_createdAt desc)`,
    {
      userId,
      searchDate,
      day,
    }
  );
}
