import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

export default function TopNav() {
  return (
    <>
      <nav className="z-40 flex items-center justify-between p-4" dir="ltr">
        <Link
          href={"/"}
          className="flex items-center gap-2 hover:animate-pulse hover:text-primary"
        >
          <Image
            title="NakhlahJS logo"
            draggable="false"
            src="/logo.webp"
            alt="logo"
            width={50}
            height={50}
          />
          <h1 className="text-lg font-bold md:text-2xl">
            Nakhlah<span className="font-bold text-yellow-400">JS</span>
          </h1>
        </Link>
        {/* <Link href={"/docs"}>
          <Button variant="outline">Docs</Button>
        </Link> */}
      </nav>
      <Separator />
    </>
  );
}
