import { NavLink, Link } from 'react-router-dom';
import { Crosshair, X, Home } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Accueil', path: '/', icon: Home, end: true },
  { name: 'QuestTrack', path: '/quest-track', icon: Crosshair },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 flex flex-col border-r border-zinc-800 bg-zinc-900 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-black tracking-[0.15em] uppercase select-none hover:opacity-80 transition-opacity">
              <span className="text-zinc-100 drop-shadow-sm">SQWALO</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-600">FUS</span>
            </Link>
          </div>
          <button 
            onClick={onClose} 
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                  )
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
