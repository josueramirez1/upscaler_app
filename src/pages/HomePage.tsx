import {
  ActivityIcon,
  ArrowRightIcon,
  BellIcon,
  CheckCircle2Icon,
  LayoutDashboardIcon,
  SparklesIcon,
} from "lucide-react";
// Import Link from your router if you want to make the "Go to Boards" button functional
// import { Link } from "react-router-dom";

const HomePage = () => {
  // Mock data for the "Battle Station" - swap these out with Appwrite fetches later!
  const systemNews = [
    {
      id: 1,
      title: "Upscaler v1.2: Keyboard Shortcuts added! ⌨️",
      date: "Today",
    },
    {
      id: 2,
      title: "Maintenance: Scheduled downtime this Friday.",
      date: "Yesterday",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Refactor Kanban Board component",
      status: "In Progress",
      board: "Engineering",
    },
    {
      id: 2,
      title: "Design marketing assets",
      status: "To Do",
      board: "Design",
    },
    {
      id: 3,
      title: "Update Appwrite schema",
      status: "Done",
      board: "Engineering",
    },
    {
      id: 4,
      title: "Onboard new team members",
      status: "In Progress",
      board: "HR",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 min-h-[100vh] bg-background text-foreground">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, Upscaler!
        </h1>
        <p className="text-muted-foreground">
          Here is what is happening across Upscaler today.
        </p>
      </div>

      {/* Top Quick-Glance Row */}
      <div className="grid auto-rows-min gap-6 md:grid-cols-3">
        {/* Box 1: Upscaler News */}
        <div className="bg-muted/30 p-5 rounded-xl border shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 font-semibold text-lg pb-2 border-b">
            <SparklesIcon className="w-5 h-5 text-blue-500" />
            Upscaler News
          </div>
          <ul className="flex flex-col gap-3">
            {systemNews.map((news) => (
              <li key={news.id} className="flex flex-col gap-1">
                <span className="text-sm font-medium">{news.title}</span>
                <span className="text-xs text-muted-foreground">
                  {news.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Box 2: Quick Stats */}
        <div className="bg-muted/30 p-5 rounded-xl border shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 font-semibold text-lg pb-2 border-b">
            <ActivityIcon className="w-5 h-5 text-green-500" />
            Your Stats
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col items-center justify-center p-3 bg-background rounded-lg border">
              <span className="text-2xl font-bold">12</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Active Tasks
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-background rounded-lg border">
              <span className="text-2xl font-bold">3</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Boards
              </span>
            </div>
          </div>
        </div>

        {/* Box 3: Notifications / Alerts */}
        <div className="bg-muted/30 p-5 rounded-xl border shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 font-semibold text-lg pb-2 border-b">
            <BellIcon className="w-5 h-5 text-amber-500" />
            Recent Alerts
          </div>
          <div className="flex flex-1 items-center justify-center flex-col text-center gap-2 text-muted-foreground py-4">
            <CheckCircle2Icon className="w-10 h-10 opacity-50 text-green-500" />
            <p className="text-sm mt-2">You're all caught up!</p>
          </div>
        </div>
      </div>

      {/* Bottom Area: Recent Tasks Feed */}
      <div className="bg-muted/30 flex-1 p-6 rounded-xl border shadow-sm flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <LayoutDashboardIcon className="w-6 h-6 text-indigo-500" />
            Recent Tasks
          </div>
          <button className="text-sm flex items-center gap-1 font-medium hover:text-indigo-500 transition-colors">
            Go to Boards <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{task.title}</span>
                <span className="text-xs text-muted-foreground">
                  Board: {task.board}
                </span>
              </div>
              <div className="text-sm px-3 py-1 rounded-full bg-muted border font-medium">
                {task.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
