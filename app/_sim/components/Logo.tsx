import Image from "next/image";

/** The SocHub mark. Single source of truth for the logo across the app. */
export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/logo/sochub.svg"
      width={64}
      height={64}
      alt="SocHub logo"
      className={className}
      priority
    />
  );
}
