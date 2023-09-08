import { getProviders } from "next-auth/react";

import AuthButton from "@/components/ui/AuthButton";
import { Buttons } from "./Auth.data";

type Props = {
  searchParams: { callbackUrl: string };
};

export default async function AuthPage({
  searchParams: { callbackUrl },
}: Props) {
  const providers = await getProviders();

  return (
    <>
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
    </>
  );
}
