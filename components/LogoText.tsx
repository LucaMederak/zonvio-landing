import type { ComponentProps } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import ZonvioTextLogo from "@/assets/logo/zonvio-logo-black.svg";

export default function LogoText({ className }: { className?: ComponentProps<"span">["className"] }) {
  return (
    <span className={twMerge("inline-block", className)}>
      <Image src={ZonvioTextLogo} alt="Zonvio" width={100} height={30} />
    </span>
  );
}
