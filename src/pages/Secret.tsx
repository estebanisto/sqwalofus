import { Link } from 'react-router-dom';

export function Secret() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in zoom-in duration-500 pb-20">
      <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] uppercase tracking-wide">
        Esteban + Antho = Amour
      </h1>
      
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <img 
          src="/prank.jpg" 
          alt="Amour" 
          className="relative w-80 md:w-[28rem] rounded-xl border-2 border-pink-500/50 shadow-2xl"
        />
      </div>

      <div className="pt-10">
        <Link 
          to="/" 
          className="text-zinc-500 hover:text-zinc-300 underline underline-offset-4 transition-colors text-sm"
        >
          Retourner discrètement à l'accueil...
        </Link>
      </div>
    </div>
  );
}
