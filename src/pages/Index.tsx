import { useState } from "react";
import NavBar from "@/components/NavBar";
import HomeSection from "@/components/HomeSection";
import TeamSection from "@/components/TeamSection";
import TasksSection from "@/components/TasksSection";
import DiagnosticSection from "@/components/DiagnosticSection";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [active, setActive] = useState("Главная");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080C14] text-white font-golos overflow-x-hidden">
      <NavBar
        active={active}
        setActive={setActive}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="pt-20">
        {active === "Главная" && <HomeSection setActive={setActive} />}
        {active === "Команда" && <TeamSection />}
        {active === "Задачи" && <TasksSection />}
        {active === "Диагностика" && <DiagnosticSection setActive={setActive} />}
      </main>

      <footer className="border-t border-white/5 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#39FF8F] flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-[#080C14]" />
            </div>
            <span className="text-sm font-semibold">Nexus</span>
          </div>
          <span className="text-xs text-white/20">© 2026 Nexus. Все права защищены</span>
        </div>
      </footer>
    </div>
  );
}
