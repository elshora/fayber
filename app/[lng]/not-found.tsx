import Link from "next/link";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="flex flex-column items-center justify-center not-found">
      <Image src={"/images/404.png"} height={450} width={450} alt="404" />
      <Link href="/" className="btn bg-warning text-light">
        Return Home
      </Link>
    </div>
  );
}
