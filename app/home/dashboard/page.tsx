import Sidebar from "@/widgets/Sidebar";

export default function DashboardPage(): React.JSX.Element {
  const stats = [
    { label: "Total Applications", value: "24", change: "+5 this month" },
    { label: "Interviews", value: "8", change: "+2 this week" },
    { label: "Offers", value: "3", change: "+1 recently" },
    { label: "Response Rate", value: "45%", change: "+5% improvement" },
  ];

  const recentActivity = [
    {
      action: "Applied to",
      company: "Tech Corp",
      position: "Senior Frontend Developer",
      time: "2 hours ago",
    },
    {
      action: "Received response from",
      company: "StartupXYZ",
      position: "React Developer",
      time: "1 day ago",
    },
    {
      action: "Interview scheduled with",
      company: "Innovation Labs",
      position: "Software Engineer",
      time: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-green-400 text-sm">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="text-gray-400">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.company}</span> -{" "}
                    {activity.position}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
