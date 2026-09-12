import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <div className="px-4">
        <div className="container mx-auto h-60 overflow-hidden">
          <Image
            src="/hero.webp"
            alt="Forest scene"
            width={1600}
            height={900}
            sizes="100vw"
            priority
            className="w-full h-full object-cover"
            />
          </div>
      </div>

      <main className="flex flex-1 w-full max-w-3xl mx-auto flex-col items-center py-16 px-16 bg-white">
        <h1 className="text-3xl font-bold text-center mb-4">
          Sacrament Meeting Planner
        </h1>
        <p className="text-center">
          Welcome to the Sacrament Meeting Planner! This app is designed to help
          bishopbrics plan, manage, and review sacrament meeting agendas as well
          as making them accessible to members of the congregation.
        </p>
      </main>
    </div>
  );
}
