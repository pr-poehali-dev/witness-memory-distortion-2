import Icon from "@/components/ui/icon";

const TEAM = [
  { name: "Алексей Громов", role: "Тимлид", tasks: 12, done: 9, avatar: "AG", color: "#39FF8F" },
  { name: "Мария Соколова", role: "Дизайнер", tasks: 8, done: 6, avatar: "МС", color: "#FF6B6B" },
  { name: "Дмитрий Лунёв", role: "Backend-разработчик", tasks: 15, done: 11, avatar: "ДЛ", color: "#4ECDC4" },
  { name: "Ольга Нечаева", role: "Аналитик", tasks: 6, done: 6, avatar: "ОН", color: "#FFD93D" },
  { name: "Иван Борисов", role: "Frontend-разработчик", tasks: 10, done: 7, avatar: "ИБ", color: "#C77DFF" },
  { name: "Светлана Кузнецова", role: "QA-инженер", tasks: 9, done: 9, avatar: "СК", color: "#F96D00" },
];

export default function TeamSection() {
  return (
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
  );
}
