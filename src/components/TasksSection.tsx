import Icon from "@/components/ui/icon";

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

const COL_COLORS: Record<string, string> = {
  "К выполнению": "#4B5563",
  "В процессе": "#3B82F6",
  "Готово": "#39FF8F",
};

const COL_ICONS: Record<string, string> = {
  "К выполнению": "Circle",
  "В процессе": "Clock",
  "Готово": "CheckCircle2",
};

export default function TasksSection() {
  return (
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
        {Object.entries(TASKS).map(([col, tasks]) => (
          <div key={col} className="space-y-3">
            {/* Column header */}
            <div className="flex items-center gap-2.5 mb-4">
              <Icon
                name={COL_ICONS[col]}
                size={16}
                style={{ color: COL_COLORS[col] }}
              />
              <span className="font-semibold text-sm">{col}</span>
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: COL_COLORS[col] + "20", color: COL_COLORS[col] }}
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
        ))}
      </div>
    </div>
  );
}
