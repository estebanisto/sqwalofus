import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-950 text-zinc-300">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center border-b border-zinc-800 bg-zinc-900 px-4 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-md"
          >
            <Menu size={24} />
          </button>
          <div className="ml-4 flex items-center">
            <Link to="/" className="text-xl font-black tracking-[0.15em] uppercase select-none hover:opacity-80 transition-opacity">
              <span className="text-zinc-100 drop-shadow-sm">SQWALO</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-600">FUS</span>
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
