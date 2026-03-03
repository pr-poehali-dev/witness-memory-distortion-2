import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = ["Главная", "Команда", "Задачи", "Диагностика"];

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

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Вы склонны задавать наводящие вопросы свидетелям, чтобы подтвердить уже сложившуюся версию событий?",
    answers: [
      { text: "А. Да, это помогает быстрее получить нужную информацию", score: 3 },
      { text: "Б. Иногда, если свидетель затрудняется с ответом", score: 2 },
      { text: "В. Нет, всегда задаю открытые нейтральные вопросы", score: 0 },
    ],
    tip: "Наводящие вопросы — одна из главных причин искажения памяти. Формулировка «Он был в красной куртке, правда?» уже содержит подсказку и подталкивает свидетеля к конкретному ответу, даже если он его не видел.",
  },
  {
    id: 2,
    question: "Если несколько свидетелей сходятся в одном мнении, вы считаете это мнение более достоверным?",
    answers: [
      { text: "А. Да, большинство не может ошибаться", score: 3 },
      { text: "Б. Скорее да, но с осторожностью", score: 2 },
      { text: "В. Нет, групповое согласие не гарантирует точность", score: 0 },
    ],
    tip: "Это «эффект конформности» — люди бессознательно подстраивают воспоминания под мнение группы. Даже искренние свидетели могут «вспомнить» детали, которых не видели, услышав версию других.",
  },
  {
    id: 3,
    question: "Вы рассказываете свидетелю, что другие очевидцы уже дали показания и назвали конкретного подозреваемого?",
    answers: [
      { text: "А. Да, это помогает освежить память", score: 3 },
      { text: "Б. Иногда, чтобы проверить реакцию", score: 2 },
      { text: "В. Никогда — это искажает восприятие", score: 0 },
    ],
    tip: "Сообщение о показаниях других людей до получения собственных — прямое введение постсобытийной информации. Мозг свидетеля интегрирует чужие слова в свою память как собственный опыт.",
  },
  {
    id: 4,
    question: "Если свидетель неуверен, вы поощряете его «попробовать вспомнить» и давите на то, что он обязан дать ответ?",
    answers: [
      { text: "А. Да, мне важно получить хоть какую-то информацию", score: 3 },
      { text: "Б. Иногда, если дело срочное", score: 2 },
      { text: "В. Нет, принимаю «не помню» как полноценный ответ", score: 0 },
    ],
    tip: "Давление на неуверенного свидетеля порождает «домысливание» — человек заполняет пробелы памяти правдоподобными догадками, которые затем воспринимает как реальные воспоминания.",
  },
  {
    id: 5,
    question: "Вы сообщаете свидетелю результат опознания («Вы правильно указали!»), когда он показывает на кого-либо из ряда?",
    answers: [
      { text: "А. Да, человек должен знать, что не ошибся", score: 3 },
      { text: "Б. Иногда, чтобы поддержать уверенность", score: 2 },
      { text: "В. Никогда до завершения всей процедуры", score: 0 },
    ],
    tip: "Позитивная обратная связь после опознания резко повышает субъективную уверенность свидетеля. В суде он даёт показания с твёрдостью, не соответствующей реальной точности воспоминания.",
  },
  {
    id: 6,
    question: "Насколько вы осведомлены о феномене «постсобытийной информации» (эффект Лофтус)?",
    answers: [
      { text: "А. Слышу впервые", score: 3 },
      { text: "Б. Слышал, но не изучал детально", score: 1 },
      { text: "В. Знаком и учитываю в работе со свидетелями", score: 0 },
    ],
    tip: "Элизабет Лофтус доказала, что информация, полученная после события, буквально переписывает воспоминание. В её эксперименте одно слово («врезался» vs «столкнулся») меняло «воспоминание» об осколках стекла, которых не было.",
  },
];

const QUIZ_RESULTS = [
  {
    range: [0, 4],
    level: "Низкий риск",
    color: "#39FF8F",
    icon: "ShieldCheck",
    title: "Вы понимаете механизмы памяти",
    desc: "Вы хорошо осведомлены о том, как социальное давление искажает воспоминания. Вы используете нейтральные вопросы, принимаете неопределённость и не навязываете свидетелям готовых ответов. Продолжайте изучать когнитивные исследования — это ваш актив.",
    actions: ["Изучите методику когнитивного интервью (CI)", "Познакомьтесь с работами Элизабет Лофтус", "Поделитесь знаниями с коллегами"],
  },
  {
    range: [5, 10],
    level: "Средний риск",
    color: "#FFD93D",
    icon: "AlertTriangle",
    title: "Есть зоны для улучшения",
    desc: "Вы знакомы с проблемой, но в отдельных ситуациях допускаете поведение, способное исказить показания. Нередко это происходит неосознанно — из желания быстрее получить результат. Важно выработать чёткий протокол работы со свидетелями.",
    actions: ["Изучите стандарты проведения опознания (PACE, NIJ)", "Практикуйте открытые вопросы: «Расскажите, что вы видели»", "Фиксируйте уверенность свидетеля сразу после показаний"],
  },
  {
    range: [11, 18],
    level: "Высокий риск",
    color: "#FF6B6B",
    icon: "AlertOctagon",
    title: "Высокий риск искажения памяти",
    desc: "Ваши практики создают серьёзный риск для достоверности свидетельских показаний. Многие из описанных действий являются главными причинами ошибочных осуждений. Это не вина — это пробел в знаниях, который легко устранить.",
    actions: ["Пройдите обучение по работе с памятью свидетелей", "Изучите кейсы Innocence Project (300+ оправданных по ДНК)", "Введите процедуру «слепого» опознания без ведения следователя"],
  },
];

const STATS = [
  { label: "Активных проектов", value: "24", icon: "FolderOpen" },
  { label: "Участников команды", value: "6", icon: "Users" },
  { label: "Задач выполнено", value: "48", icon: "CheckCircle2" },
  { label: "В этом месяце", value: "↑ 32%", icon: "TrendingUp" },
];

export default function Index() {
  const [active, setActive] = useState("Главная");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Quiz state
  const [quizStep, setQuizStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const quizResult = QUIZ_RESULTS.find(r => totalScore >= r.range[0] && totalScore <= r.range[1]) || QUIZ_RESULTS[2];

  function handleAnswer(score: number, idx: number) {
    setSelectedAnswer(idx);
    setShowTip(true);
  }

  function handleNext() {
    if (selectedAnswer === null) return;
    const score = QUIZ_QUESTIONS[currentQ].answers[selectedAnswer].score;
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    setShowTip(false);
    if (currentQ + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setQuizStep("result");
    }
  }

  function handleRestart() {
    setQuizStep("intro");
    setCurrentQ(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowTip(false);
  }

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

        {/* ──────────── ДИАГНОСТИКА ──────────── */}
        {active === "Диагностика" && (
          <div className="animate-fade-in max-w-3xl mx-auto px-6 py-16">

            {/* INTRO */}
            {quizStep === "intro" && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C77DFF]/10 border border-[#C77DFF]/30 rounded-full text-[#C77DFF] text-sm font-medium mb-8">
                  <Icon name="BrainCircuit" fallback="Brain" size={14} />
                  Образовательная диагностика
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Как социальное давление<br />
                  <span className="text-[#C77DFF]">искажает память свидетелей</span>
                </h2>
                <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                  Пройдите диагностику из 6 вопросов и узнайте, насколько ваши действия могут влиять на достоверность свидетельских показаний. После каждого ответа — научное объяснение механизма.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
                    { icon: "HelpCircle", label: "6 вопросов", sub: "с вариантами А, Б, В" },
                    { icon: "Lightbulb", label: "Научные факты", sub: "после каждого ответа" },
                    { icon: "BarChart2", label: "Результат", sub: "с рекомендациями" },
                  ].map((f, i) => (
                    <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-4 text-center">
                      <div className="w-10 h-10 rounded-xl bg-[#C77DFF]/10 flex items-center justify-center mx-auto mb-3">
                        <Icon name={f.icon} fallback="Circle" size={20} className="text-[#C77DFF]" />
                      </div>
                      <div className="text-sm font-semibold">{f.label}</div>
                      <div className="text-xs text-white/40 mt-1">{f.sub}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setQuizStep("quiz")}
                  className="px-10 py-4 bg-[#C77DFF] text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-all text-base"
                >
                  Начать диагностику
                </button>
                <p className="text-xs text-white/25 mt-4">Тест анонимен · Занимает ~3 минуты</p>
              </div>
            )}

            {/* QUIZ */}
            {quizStep === "quiz" && (
              <div>
                {/* Progress */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C77DFF] rounded-full transition-all duration-500"
                      style={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-white/40 flex-shrink-0">
                    {currentQ + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Question card */}
                <div className="bg-white/3 border border-white/8 rounded-2xl p-8 mb-5">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-7 h-7 rounded-lg bg-[#C77DFF]/20 text-[#C77DFF] text-xs font-bold flex items-center justify-center">
                      {currentQ + 1}
                    </span>
                    <span className="text-xs text-white/40 uppercase tracking-wider">Вопрос</span>
                  </div>
                  <p className="text-xl font-semibold leading-relaxed mb-8">
                    {QUIZ_QUESTIONS[currentQ].question}
                  </p>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[currentQ].answers.map((ans, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(ans.score, idx)}
                        disabled={selectedAnswer !== null}
                        className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                          selectedAnswer === null
                            ? "border-white/10 bg-white/3 hover:border-[#C77DFF]/50 hover:bg-[#C77DFF]/5"
                            : selectedAnswer === idx
                            ? ans.score === 0
                              ? "border-[#39FF8F] bg-[#39FF8F]/10 text-[#39FF8F]"
                              : ans.score === 3
                              ? "border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]"
                              : "border-[#FFD93D] bg-[#FFD93D]/10 text-[#FFD93D]"
                            : "border-white/5 bg-white/1 opacity-40"
                        }`}
                      >
                        {ans.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tip */}
                {showTip && (
                  <div className="bg-[#C77DFF]/8 border border-[#C77DFF]/25 rounded-2xl p-6 mb-5 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C77DFF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="BookOpen" size={16} className="text-[#C77DFF]" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#C77DFF] uppercase tracking-wider mb-2">Научный факт</div>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {QUIZ_QUESTIONS[currentQ].tip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {showTip && (
                  <button
                    onClick={handleNext}
                    className="w-full py-4 bg-[#C77DFF] text-white font-bold rounded-xl hover:bg-[#C77DFF]/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {currentQ + 1 < QUIZ_QUESTIONS.length ? "Следующий вопрос →" : "Узнать результат →"}
                  </button>
                )}
              </div>
            )}

            {/* RESULT */}
            {quizStep === "result" && (
              <div className="animate-fade-in text-center">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: quizResult.color + "20", border: `2px solid ${quizResult.color}40` }}
                >
                  <Icon name={quizResult.icon} fallback="Award" size={36} style={{ color: quizResult.color }} />
                </div>

                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4"
                  style={{ backgroundColor: quizResult.color + "15", color: quizResult.color, border: `1px solid ${quizResult.color}30` }}
                >
                  {quizResult.level}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4">{quizResult.title}</h3>
                <p className="text-white/50 leading-relaxed text-base max-w-xl mx-auto mb-8">
                  {quizResult.desc}
                </p>

                {/* Score bar */}
                <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-6 text-left">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-white/50">Ваш результат</span>
                    <span className="font-bold">{totalScore} / 18 баллов</span>
                  </div>
                  <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${(totalScore / 18) * 100}%`, backgroundColor: quizResult.color }}
                    />
                  </div>

                  <div className="text-sm font-semibold text-white/70 mb-3">Что делать дальше:</div>
                  <ul className="space-y-2">
                    {quizResult.actions.map((a, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="w-5 h-5 rounded-full bg-white/8 flex items-center justify-center text-xs flex-shrink-0 mt-0.5" style={{ color: quizResult.color }}>
                          {i + 1}
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={handleRestart}
                    className="px-7 py-3 bg-white/5 border border-white/15 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                  >
                    Пройти заново
                  </button>
                  <button
                    onClick={() => setActive("Главная")}
                    className="px-7 py-3 bg-[#C77DFF] text-white font-semibold rounded-full hover:bg-[#C77DFF]/90 transition-all hover:scale-105"
                  >
                    На главную
                  </button>
                </div>
              </div>
            )}
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