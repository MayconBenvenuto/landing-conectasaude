import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="Belz Conecta Saúde">
      <Image
        src="/images-conecta/logo-fundotransparente.png"
        alt="Logo Belz Conecta Saúde"
        width={240}
        height={80}
        priority
        className="h-32 w-auto object-contain"
      />
    </Link>
  );
}
