import Image, { StaticImageData } from "next/image";
import { cn } from "@/helpers/utils";

interface LogoProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  src,
  alt,
  className,
  width = 80,
  height = 80,
}: LogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  );
}
