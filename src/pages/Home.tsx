import { Crosshair, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in duration-700 relative pb-32">
      <h1 className="text-5xl md:text-7xl font-black tracking-[0.15em] uppercase select-none mt-8">
        <span className="text-zinc-100 drop-shadow-sm">SQWALO</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-600">FUS</span>
      </h1>
      
      <p className="text-zinc-400 max-w-lg mx-auto text-lg leading-relaxed mt-4 italic">
        "Salut Antho, avec cette application tu pourras moins te tirer les cheveux, il t'en reste déjà plus beaucoup !"
      </p>
      
      <div className="pt-8">
        <Link 
          to="/quest-track" 
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-medium rounded-lg border border-amber-500/20 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
        >
          <Crosshair size={20} />
          Accéder au Suivi de Quêtes
        </Link>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-3">
        <div className="flex gap-6">
          <ArrowDown size={36} className="text-red-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <ArrowDown size={36} className="text-red-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <ArrowDown size={36} className="text-red-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <Link 
          to="/secret"
          className="flex flex-col items-center gap-0.5 px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.8)] hover:shadow-[0_0_40px_rgba(220,38,38,1)] transition-all animate-pulse hover:scale-110 active:scale-95"
        >
          <span className="font-black tracking-widest uppercase">Ne pas cliquer</span>
          <span className="text-[10px] font-medium tracking-wide opacity-80">( sauf si tu veux cliquer )</span>
        </Link>
      </div>
    </div>
  );
}
