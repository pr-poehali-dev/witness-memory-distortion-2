import Icon from "@/components/ui/icon";

const NAV_ITEMS = ["Главная", "Команда", "Задачи", "Диагностика"];

interface NavBarProps {
  active: string;
  setActive: (item: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function NavBar({ active, setActive, mobileOpen, setMobileOpen }: NavBarProps) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#080C14]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#39FF8F] flex items-center justify-center">
            <Icon name="Zap" size={18} className="text-[#080C14]" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Nexus</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === item
                  ? "bg-[#39FF8F] text-[#080C14]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-white/60 hover:text-white transition-colors">Войти</button>
          <button className="px-4 py-2 bg-[#39FF8F] text-[#080C14] text-sm font-semibold rounded-full hover:bg-[#39FF8F]/90 transition-all hover:scale-105 active:scale-95">
            Начать бесплатно
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white/70"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#080C14]/95 flex flex-col items-center justify-center gap-6 md:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => { setActive(item); setMobileOpen(false); }}
              className={`text-2xl font-bold transition-colors ${
                active === item ? "text-[#39FF8F]" : "text-white/60"
              }`}
            >
              {item}
            </button>
          ))}
          <button className="mt-4 px-8 py-3 bg-[#39FF8F] text-[#080C14] font-semibold rounded-full">
            Начать бесплатно
          </button>
        </div>
      )}
    </>
  );
}
