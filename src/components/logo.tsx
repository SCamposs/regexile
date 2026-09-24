import Image from "next/image";

export function Logo() {
  return (
    <span className="brand-logo" aria-label="Regexile">
      <Image src="/logo-dark-mode.png" alt="Regexile" width={145} height={109} priority />
    </span>
  );
}
