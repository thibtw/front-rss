import Sidebar from "@/widgets/Sidebar";

export default function AllApplicationsPage(): React.JSX.Element {
  const applications = [
    {
      id: 1,
      company: "Tech Corp",
      position: "Senior Frontend Developer",
      status: "Applied",
      date: "2024-01-15",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "React Developer",
      status: "Interview",
      date: "2024-01-20",
    },
    {
      id: 3,
      company: "BigTech Inc",
      position: "Full Stack Engineer",
      status: "Applied",
      date: "2024-01-18",
    },
    {
      id: 4,
      company: "RemoteCo",
      position: "Frontend Engineer",
      status: "Rejected",
      date: "2024-01-10",
    },
    {
      id: 5,
      company: "Innovation Labs",
      position: "Software Engineer",
      status: "Offer",
      date: "2024-01-22",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <h1 className="text-4xl font-bold mb-6">All Applications</h1>
        <div className="space-y-4">
          {applications.map((app) => (
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
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "Offer"
                      ? "bg-green-500/20 text-green-400"
                      : app.status === "Interview"
                        ? "bg-blue-500/20 text-blue-400"
                        : app.status === "Rejected"
                          ? "bg-red-500/20 text-red-400"
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
