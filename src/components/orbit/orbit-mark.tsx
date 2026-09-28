import Image from "next/image";

const LIGHT_SRC = "/orbit-ai-light.webp";
const DARK_SRC = "/orbit-ai-dark.webp";

export function OrbitMark({
  size = 20,
  alt = "",
  className = "",
}: {
  size?: number;
  alt?: string;
  className?: string;
}) {
  const hidden = alt ? undefined : true;
  return (
    <>
      <Image
        src={LIGHT_SRC}
        alt={alt}
        aria-hidden={hidden}
        width={size}
        height={size}
        className={`block shrink-0 object-contain dark:hidden ${className}`}
      />
      <Image
        src={DARK_SRC}
        alt={alt}
        aria-hidden={hidden}
        width={size}
        height={size}
        className={`hidden shrink-0 object-contain dark:block ${className}`}
      />
    </>
  );
}
