import { SITE_NAME } from "@/app.config";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with anime-themed background */}
      <div className="hidden md:flex md:w-1/2 bg-gaming-darker relative overflow-hidden">
        {/*         <div className="absolute inset-0 bg-gradient-to-br from-gaming-cyan/30 to-purple-600/20 z-0"></div>
         */}
        <div
          className="absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: "url('/bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
          }}
        ></div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full p-12">
          <div className="glass-effect  rounded-xl p-8 text-center shadow-xl shadow-gaming-cyan/10 max-w-md border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4 cyan-glow-text">
              {SITE_NAME}
            </h2>
            <p className="text-white/90 mb-6">
              The ultimate destination for gamers seeking the best gear and
              experiences
            </p>
            <div className="grid grid-cols-2 gap-4 text-white/70 text-sm">
              <div className="flex flex-col items-center p-3 glass-effect rounded-lg">
                <span className="text-gaming-cyan font-bold text-xl mb-1">
                  500+
                </span>
                <span>Products</span>
              </div>
              <div className="flex flex-col items-center p-3 glass-effect rounded-lg">
                <span className="text-gaming-cyan font-bold text-xl mb-1">
                  24/7
                </span>
                <span>Support</span>
              </div>
              <div className="flex flex-col items-center p-3 glass-effect rounded-lg">
                <span className="text-gaming-cyan font-bold text-xl mb-1">
                  Fast
                </span>
                <span>Shipping</span>
              </div>
              <div className="flex flex-col items-center p-3 glass-effect rounded-lg">
                <span className="text-gaming-cyan font-bold text-xl mb-1">
                  Secure
                </span>
                <span>Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with authentication form */}
      <div className="flex flex-col w-full md:w-1/2 bg-gaming-darker relative">
        <div className="absolute inset-0 bg-gaming-darker/80 backdrop-blur-md z-0"></div>
        <div className="absolute inset-0 bg-[url('/bg.webp')] bg-cover opacity-10 z-0"></div>

        <div className="relative z-10">
          <div className="flex-1 flex flex-col mt-24 justify-center px-6 py-12 lg:px-8 max-w-md mx-auto w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-white text-center mb-2 animate-glow">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-white/70 text-center mb-6">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="glass-effect p-6 rounded-xl border border-white/10 backdrop-blur-lg animate-fade-in">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
