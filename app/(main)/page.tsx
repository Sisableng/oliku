import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-20">
      <section
        className="relative h-screen bg-no-repeat bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/bg.svg')",
        }}
      >
        <div className="absolute inset-0 max-w-4xl mx-auto space-y-8 z-10 grid place-content-center text-center">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Selamat datang di <span className="text-primary">Oliku</span>!
          </h1>
          <p className="max-w-lg mx-auto font-semibold">
            Oliku adalah aplikasi pengingat ganti oli buat kamu yang sering
            lupa, Oliku dibuat dengan Next.js dan Tailwind CSS.
          </p>
          <Button size={"lg"} className="w-max mx-auto" asChild>
            <Link href={"/auth/signup"}>Mulai Sekarang!</Link>
          </Button>
        </div>

        <div className="absolute top-0 inset-x-0 pointer-events-none h-52 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 pointer-events-none h-52 bg-gradient-to-t from-background to-transparent" />
      </section>
      <section className="h-screen"></section>
    </div>
  );
}
