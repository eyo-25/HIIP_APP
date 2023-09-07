import { getProviders } from "next-auth/react";

import AuthButton from "@/components/ui/AuthButton";
import { WhiteLogo } from "@/assets";
import { Buttons } from "./Auth.data";

type Props = {
  searchParams: { callbackUrl: string };
};

export default async function AuthPage({
  searchParams: { callbackUrl },
}: Props) {
  const providers = await getProviders();

  return (
    <article className=" w-full z-10 flex-col-center text-white">
      <WhiteLogo className="mb-20pxr" />
      <h1 className="mb-20pxr">Interval Pomodoro Planner</h1>
      {providers &&
        Buttons.map(({ title, icon, provider }, i) => (
          <AuthButton
            key={i}
            title={title}
            icon={icon}
            provider={providers[provider]}
            callbackUrl={callbackUrl ?? "/"}
          />
        ))}
    </article>
  );
}
