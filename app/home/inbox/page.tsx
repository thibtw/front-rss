import Sidebar from "@/widgets/Sidebar";

const actionItems = [
  {
    id: 1,
    company: "Spotify",
    role: "Senior NestJS Engineer",
    status: "interview",
    statusLabel: "Запросили • Завтра о 14:00",
    actionLabel: "Підготуватись",
    dotColor: "bg-green-500",
  },
  {
    id: 2,
    company: "Stripe",
    role: "Backend Engineer",
    status: "followup",
    statusLabel: "7 днів без відповіді",
    actionLabel: "Написати follow-up",
    dotColor: "bg-yellow-500",
  },
  {
    id: 3,
    company: "Revolut",
    role: "Lead Developer",
    status: "response",
    statusLabel: "Відповіли! Хочуть познайомитись",
    actionLabel: "Переглянути",
    dotColor: "bg-blue-500",
  },
];

export default function InboxPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Good morning, Олексій 👋</h1>
          <p className="text-gray-400">У тебе 3 речі що потребують уваги</p>
        </div>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
            🎯 ПОТРЕБУЮТЬ ДІЇ
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            {actionItems.map((item, index) => (
              <div
                key={item.id}
                className={`p-5 hover:bg-white/5 transition-colors ${
                  index < actionItems.length - 1
                    ? "border-b border-white/10"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${item.dotColor}`}
                    aria-hidden
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold">
                      {item.company} • {item.role}
                    </p>
                    <p className="text-gray-400 text-sm mt-0.5">
                      {item.statusLabel}
                    </p>
                    <button
                      type="button"
                      className="mt-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
                    >
                      [{item.actionLabel} →]
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
            📊 ТВІЙ ТИЖДЕНЬ
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="grid grid-cols-3 gap-6 mb-5">
              <div>
                <p className="text-gray-400 text-sm mb-1">Подано заявок</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Відповідей</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Інтервю</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/60 rounded-full"
                    style={{ width: "66%" }}
                  />
                </div>
                <span className="text-sm text-gray-400 shrink-0">CR: 25%</span>
              </div>
              <p className="text-sm text-green-400">↑ від минулого тижня</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
