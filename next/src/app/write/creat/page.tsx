"use client";

import PlanWriter from "@/components/write/PlanWriter";

type Props = {
  params: {
    slug: string;
  };
};

function CreatPage({ params: { slug } }: Props) {
  return <PlanWriter />;
}

export default CreatPage;
