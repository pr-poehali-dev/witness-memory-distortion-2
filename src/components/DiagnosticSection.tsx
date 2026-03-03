import { useState } from "react";
import Icon from "@/components/ui/icon";

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

interface DiagnosticSectionProps {
  setActive: (item: string) => void;
}

export default function DiagnosticSection({ setActive }: DiagnosticSectionProps) {
  const [quizStep, setQuizStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const quizResult = QUIZ_RESULTS.find(r => totalScore >= r.range[0] && totalScore <= r.range[1]) || QUIZ_RESULTS[2];

  function handleAnswer(_score: number, idx: number) {
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
  );
}
