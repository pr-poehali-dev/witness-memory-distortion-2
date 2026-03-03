import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = ["Главная", "Команда", "Задачи"];

const TEAM = [
  {
    name: "Алексей Громов",
    role: "Тимлид",
    tasks: 12,
    done: 9,
    avatar: "AG",
    color: "#39FF8F",
  },
  {
    name: "Мария Соколова",
    role: "Дизайнер",
    tasks: 8,
    done: 6,
    avatar: "МС",
    color: "#FF6B6B",
  },
  {
    name: "Дмитрий Лунёв",
    role: "Backend-разработчик",
    tasks: 15,
    done: 11,
    avatar: "ДЛ",
    color: "#4ECDC4",
  },
  {
    name: "Ольга Нечаева",
    role: "Аналитик",
    tasks: 6,
    done: 6,
    avatar: "ОН",
    color: "#FFD93D",
  },
  {
    name: "Иван Борисов",
    role: "Frontend-разработчик",
    tasks: 10,
    done: 7,
    avatar: "ИБ",
    color: "#C77DFF",
  },
  {
    name: "Светлана Кузнецова",
    role: "QA-инженер",
    tasks: 9,
    done: 9,
    avatar: "СК",
    color: "#F96D00",
  },
];

const TASKS = {
  "К выполнению": [
    { id: 1, title: "Разработать API авторизации", priority: "Высокий", tag: "Backend" },
    { id: 2, title: "Написать спецификацию модуля отчётов", priority: "Средний", tag: "Аналитика" },
    { id: 3, title: "Настроить CI/CD пайплайн", priority: "Высокий", tag: "DevOps" },
  ],
  "В процессе": [
    { id: 4, title: "Редизайн дашборда", priority: "Высокий", tag: "Дизайн" },
    { id: 5, title: "Интеграция платёжной системы", priority: "Критичный", tag: "Backend" },
    { id: 6, title: "Тестирование форм регистрации", priority: "Средний", tag: "QA" },
  ],
  "Готово": [
    { id: 7, title: "Архитектура базы данных", priority: "Высокий", tag: "Backend" },
    { id: 8, title: "Брендбук и цветовая палитра", priority: "Низкий", tag: "Дизайн" },
    { id: 9, title: "Настройка окружения разработки", priority: "Средний", tag: "DevOps" },
  ],
};

const PRIORITY_COLORS: Record<string, string> = {
  Критичный: "#FF4757",
  Высокий: "#FF6B35",
  Средний: "#FFD93D",
  Низкий: "#39FF8F",
};

const STATS = [
  { label: "Активных проектов", value: "24", icon: "FolderOpen" },
  { label: "Участников команды", value: "6", icon: "Users" },
  { label: "Задач выполнено", value: "48", icon: "CheckCircle2" },
  { label: "В этом месяце", value: "↑ 32%", icon: "TrendingUp" },
];

export default function Index() {
  const [active, setActive] = useState("Главная");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080C14] text-white font-golos overflow-x-hidden">
      {/* NAV */}
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

      {/* PAGES */}
      <main className="pt-20">
        {/* ──────────── ГЛАВНАЯ ──────────── */}
        {active === "Главная" && (
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
        )}

        {/* ──────────── КОМАНДА ──────────── */}
        {active === "Команда" && (
          <div className="animate-fade-in max-w-6xl mx-auto px-6 py-16">
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#39FF8F]/10 border border-[#39FF8F]/30 rounded-full text-[#39FF8F] text-sm font-medium mb-5">
                <Icon name="Users" size={14} />
                6 специалистов
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Наша команда</h2>
              <p className="text-white/40 text-lg max-w-lg">Профессионалы, которые делают проект реальностью каждый день</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {TEAM.map((member, i) => {
                const pct = Math.round((member.done / member.tasks) * 100);
                return (
                  <div
                    key={i}
                    className="group bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:bg-white/5"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#080C14] font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">{member.name}</div>
                        <div className="text-sm text-white/40">{member.role}</div>
                      </div>
                      <div className="ml-auto flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#39FF8F]" title="Онлайн" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">Прогресс задач</span>
                        <span className="font-semibold" style={{ color: member.color }}>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: member.color }}
                        />
                      </div>
                      <div className="text-xs text-white/30 pt-1">
                        {member.done} из {member.tasks} задач
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Team summary */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { label: "Всего задач", value: TEAM.reduce((a, m) => a + m.tasks, 0) },
                { label: "Выполнено", value: TEAM.reduce((a, m) => a + m.done, 0) },
                { label: "Средний прогресс", value: Math.round(TEAM.reduce((a, m) => a + (m.done / m.tasks) * 100, 0) / TEAM.length) + "%" },
              ].map((s, i) => (
                <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#39FF8F]">{s.value}</div>
                  <div className="text-sm text-white/40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ──────────── ЗАДАЧИ ──────────── */}
        {active === "Задачи" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#39FF8F]/10 border border-[#39FF8F]/30 rounded-full text-[#39FF8F] text-sm font-medium mb-5">
                  <Icon name="Kanban" size={14} />
                  Канбан-доска
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">Задачи проекта</h2>
              </div>
              <button className="flex items-center gap-2 px-5 py-3 bg-[#39FF8F] text-[#080C14] font-semibold rounded-full hover:scale-105 active:scale-95 transition-all self-start sm:self-auto">
                <Icon name="Plus" size={18} />
                Новая задача
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(TASKS).map(([col, tasks]) => {
                const colColors: Record<string, string> = {
                  "К выполнению": "#4B5563",
                  "В процессе": "#3B82F6",
                  "Готово": "#39FF8F",
                };
                const colIcons: Record<string, string> = {
                  "К выполнению": "Circle",
                  "В процессе": "Clock",
                  "Готово": "CheckCircle2",
                };
                return (
                  <div key={col} className="space-y-3">
                    {/* Column header */}
                    <div className="flex items-center gap-2.5 mb-4">
                      <Icon
                        name={colIcons[col]}
                        size={16}
                        style={{ color: colColors[col] }}
                      />
                      <span className="font-semibold text-sm">{col}</span>
                      <span
                        className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: colColors[col] + "20", color: colColors[col] }}
                      >
                        {tasks.length}
                      </span>
                    </div>

                    {/* Cards */}
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white/3 border border-white/8 rounded-xl p-4 hover:border-white/20 hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-snug mb-3 group-hover:text-white transition-colors">
                              {task.title}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs px-2 py-0.5 bg-white/8 rounded-full text-white/50">
                                {task.tag}
                              </span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  backgroundColor: PRIORITY_COLORS[task.priority] + "20",
                                  color: PRIORITY_COLORS[task.priority],
                                }}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add btn */}
                    <button className="w-full py-3 border border-dashed border-white/10 rounded-xl text-sm text-white/30 hover:text-white/60 hover:border-white/25 transition-all flex items-center justify-center gap-2">
                      <Icon name="Plus" size={14} />
                      Добавить
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
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