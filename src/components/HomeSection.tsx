import Icon from "@/components/ui/icon";

const STATS = [
  { label: "Активных проектов", value: "24", icon: "FolderOpen" },
  { label: "Участников команды", value: "6", icon: "Users" },
  { label: "Задач выполнено", value: "48", icon: "CheckCircle2" },
  { label: "В этом месяце", value: "↑ 32%", icon: "TrendingUp" },
];

interface HomeSectionProps {
  setActive: (item: string) => void;
}

export default function HomeSection({ setActive }: HomeSectionProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(https://cdn.poehali.dev/projects/ddee7a28-92ee-4092-bf1a-a52564310795/files/bcc328db-4281-437d-aa55-470c4584e94a.jpg)" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(57,255,143,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,143,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#39FF8F]/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#39FF8F]/10 border border-[#39FF8F]/30 rounded-full text-[#39FF8F] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#39FF8F] animate-pulse" />
            Платформа нового поколения
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Управляйте проектами{" "}
            <span className="text-[#39FF8F]">в одном месте</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nexus объединяет команду, задачи и аналитику — никаких лишних инструментов, только результат
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActive("Задачи")}
              className="px-8 py-4 bg-[#39FF8F] text-[#080C14] font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-200 text-base"
            >
              Открыть задачи
            </button>
            <button
              onClick={() => setActive("Команда")}
              className="px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200 text-base"
            >
              Познакомиться с командой
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="group bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-[#39FF8F]/40 hover:bg-[#39FF8F]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#39FF8F]/10 flex items-center justify-center group-hover:bg-[#39FF8F]/20 transition-colors">
                  <Icon name={s.icon} fallback="Circle" size={18} className="text-[#39FF8F]" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{s.value}</div>
              <div className="text-sm text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Всё что нужно команде</h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">Инструменты, которые реально используются в работе</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "Kanban", title: "Канбан-доски", desc: "Визуальное управление задачами с drag-and-drop и статусами в реальном времени" },
            { icon: "Users", title: "Управление командой", desc: "Назначайте роли, отслеживайте загруженность и эффективность каждого участника" },
            { icon: "BarChart3", title: "Аналитика", desc: "Дашборды с метриками прогресса, дедлайнов и производительности команды" },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/3 border border-white/8 rounded-2xl p-8 hover:border-[#39FF8F]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#39FF8F]/10 flex items-center justify-center mb-5 group-hover:bg-[#39FF8F]/20 transition-colors">
                <Icon name={f.icon} fallback="Circle" size={24} className="text-[#39FF8F]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
