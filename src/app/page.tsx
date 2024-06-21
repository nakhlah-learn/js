import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1>Hello, Next.js!</h1>

      <Link href="/courses">
        <Button>الكورسات</Button>
      </Link>
    </main>
  );
}
