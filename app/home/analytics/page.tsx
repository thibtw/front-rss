import Sidebar from "@/widgets/Sidebar";

export default function AnalyticsPage(): React.JSX.Element {
  const platformStats = [
    { platform: "LinkedIn", applications: 12, responses: 6, rate: "50%" },
    { platform: "Indeed", applications: 8, responses: 3, rate: "37.5%" },
    { platform: "Jooble", applications: 4, responses: 2, rate: "50%" },
    { platform: "WeWorkRemotely", applications: 0, responses: 0, rate: "0%" },
  ];

  const statusDistribution = [
    { status: "Applied", count: 15, percentage: 62.5 },
    { status: "Interview", count: 6, percentage: 25 },
    { status: "Offer", count: 2, percentage: 8.3 },
    { status: "Rejected", count: 1, percentage: 4.2 },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <h1 className="text-4xl font-bold mb-6">Analytics</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Platform Performance</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="space-y-4">
              {platformStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-4 border-b border-white/10 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{stat.platform}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {stat.applications} applications, {stat.responses}{" "}
                      responses
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{stat.rate}</p>
                    <p className="text-gray-400 text-sm">Response Rate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Application Status Distribution
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="space-y-4">
              {statusDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">
                      {item.status}
                    </span>
                    <span className="text-gray-400">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
