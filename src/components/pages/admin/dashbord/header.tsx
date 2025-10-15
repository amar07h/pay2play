import Image from "next/image";
export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
          Online
        </span> 
        <div className="w-10 h-10 rounded-full bg-gaming-dark border-2 border-gaming-cyan overflow-hidden">
         <Image
                height={500}
                width={500}
                src="/logo.webp"
                alt="Gaming Store Logo"
                className="h-16 w-auto"
              />
        </div>
      </div>
    </div>
  );
}
