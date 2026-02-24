import Sidebar from "@/widgets/Sidebar";

export default function MyApplicationsPage(): React.JSX.Element {
  const myApplications = [
    {
      id: 1,
      company: "Tech Corp",
      position: "Senior Frontend Developer",
      status: "Applied",
      date: "2024-01-15",
      platform: "LinkedIn",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "React Developer",
      status: "Interview",
      date: "2024-01-20",
      platform: "Indeed",
    },
    {
      id: 5,
      company: "Innovation Labs",
      position: "Software Engineer",
      status: "Offer",
      date: "2024-01-22",
      platform: "Jooble",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <h1 className="text-4xl font-bold mb-6">My Applications</h1>
        <p className="text-gray-400 mb-6">
          Applications you&apos;ve submitted through this platform
        </p>
        <div className="space-y-4">
          {myApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {app.position}
                  </h2>
                  <p className="text-gray-400 mt-1">{app.company}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Via {app.platform}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "Offer"
                      ? "bg-green-500/20 text-green-400"
                      : app.status === "Interview"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Applied on {app.date}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
