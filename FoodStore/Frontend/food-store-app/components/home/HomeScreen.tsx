import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center px-7 h-full py-10">
      <h1 className="text-2xl font-semibold text-center px-2 py-2 rounded-md border-neutral-700 font-mono bg-neutral-700 text-neutral-200">
        Order Food <br/>We Are Here to Serve You.
      </h1>

      <div className="relative w-125 h-125">
        <Image
          src="/cup Cake.jpg"
          alt="Kitchen"
          fill
          className="object-cover rounded-md"
          priority
        />
      </div>
    </div>
  );
}