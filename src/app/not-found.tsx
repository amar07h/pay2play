import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-darker p-6">
      <div className="max-w-xl w-full text-center">
        <div className="relative mb-6">
          <h1 className="text-[12rem] font-bold text-gaming-dark leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan/80 to-gaming-cyan/30 leading-none cyan-glow-text">
              404
            </h1>
          </div>
        </div>

        <div className="glass-effect p-8 rounded-xl border-gaming-cyan/20 shadow-lg shadow-gaming-cyan/5">
          <h2 className="text-2xl font-bold text-white mb-4">Game Over</h2>
          <p className="text-white/70 mb-6">
            The page you re looking for seems to have respawned elsewhere or
            doesn t exist.
          </p>

          <div className="grid gap-4 mb-6">
            <div className="bg-gaming-dark/60 border border-gaming-cyan/10 p-4 rounded-lg">
              <p className="text-white/60 text-sm text-left">
                <span className="text-red-400 font-mono">[ERROR]</span> Page not
                found at:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              prefetch={true}
              className="bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-darker py-2 px-6 rounded-md font-medium transition-colors"
            >
              Return to Home
            </Link>

            <Link
              href="/"
              prefetch={true}
              className="border border-gaming-cyan/30 text-gaming-cyan hover:bg-gaming-cyan/10 py-2 px-6 rounded-md transition-colors"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
