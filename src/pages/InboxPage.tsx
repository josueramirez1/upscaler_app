import React, { useState } from "react";
import {
  Search,
  Inbox,
  Send,
  Archive,
  Trash2,
  Star,
  Circle,
  Reply,
  Forward,
  MoreVertical,
  Plus,
} from "lucide-react";

// 1. Define the Email interface
interface Email {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  content: string;
}

// 2. Type the Helper Component Props
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  count,
  active = false,
}) => (
  <div
    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="hidden md:block">{label}</span>
    </div>
    {count !== undefined && (
      <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full hidden md:block">
        {count}
      </span>
    )}
  </div>
);

const InboxPage: React.FC = () => {
  // 3. State is now typed to the Email ID (number)
  const [selectedEmailId, setSelectedEmailId] = useState<number>(0);

  // 4. Mock Data typed as an array of Email
  const emails: Email[] = [
    {
      id: 0,
      sender: "Sarah Jenkins",
      subject: "Update on the Engineering Board",
      preview: "I've finished the refactor we discussed in the standup...",
      time: "10:24 AM",
      read: false,
      content:
        "Hey team, I've finished the refactor of the Kanban Board component. I've optimized the drag-and-drop events and fixed that ghosting issue we were seeing in Safari. Let me know when you have a chance to review the PR!",
    },
    {
      id: 1,
      sender: "Appwrite System",
      subject: "New Deployment Successful",
      preview: "Your project 'Upscaler' has been successfully deployed...",
      time: "9:15 AM",
      read: true,
      content:
        "The latest build of Upscaler (v1.2.0) is now live. All database migrations were completed successfully. Performance metrics are looking stable.",
    },
    {
      id: 2,
      sender: "Marketing Team",
      subject: "Assets for Q1 Launch",
      preview:
        "Attached are the final versions of the logo and social media banners...",
      time: "Yesterday",
      read: true,
      content:
        "Hello! We've finalized the Q1 launch assets. You can find the high-res SVGs attached. Please ensure the brand guidelines are followed for the new landing page.",
    },
  ];

  // Find the currently selected email object safely
  const currentEmail =
    emails.find((e) => e.id === selectedEmailId) || emails[0];

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] overflow-hidden bg-background border rounded-xl m-4 shadow-sm">
      {/* Sidebar */}
      <div className="w-16 md:w-64 border-r bg-muted/20 flex flex-col">
        <div className="p-4 border-b">
          <button className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-medium text-sm hidden md:block">
            Compose
          </button>
          <button className="md:hidden flex justify-center p-2 bg-primary text-primary-foreground rounded-lg">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <NavItem
            icon={<Inbox className="w-4 h-4" />}
            label="Inbox"
            count={1}
            active
          />
          <NavItem icon={<Send className="w-4 h-4" />} label="Sent" />
          <NavItem icon={<Star className="w-4 h-4" />} label="Starred" />
          <NavItem icon={<Archive className="w-4 h-4" />} label="Archive" />
          <NavItem icon={<Trash2 className="w-4 h-4" />} label="Trash" />
        </nav>
      </div>

      {/* List */}
      <div className="w-full md:w-80 lg:w-96 border-r flex flex-col bg-card">
        <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search messages..."
              className="w-full pl-8 pr-4 py-2 bg-muted/50 border-none rounded-md text-sm focus:ring-1 ring-primary outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmailId(email.id)}
              className={`p-4 border-b cursor-pointer hover:bg-muted/30 transition-colors ${selectedEmailId === email.id ? "bg-muted border-l-4 border-l-primary" : ""}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm">{email.sender}</span>
                <span className="text-xs text-muted-foreground">
                  {email.time}
                </span>
              </div>
              <div className="text-sm font-medium truncate mb-1 flex items-center gap-2">
                {!email.read && (
                  <Circle className="w-2 h-2 fill-blue-500 text-blue-500" />
                )}
                {email.subject}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {email.preview}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Pane */}
      <div className="hidden md:flex flex-1 flex-col bg-background">
        <div className="p-4 border-b flex justify-between items-center bg-card">
          <div className="flex gap-2">
            <button className="p-2 hover:bg-muted rounded-md">
              <Archive className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-muted rounded-md">
              <Trash2 className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-muted rounded-md border-l pl-4 ml-2">
              <Reply className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-muted rounded-md">
              <Forward className="w-4 h-4" />
            </button>
          </div>
          <button className="p-2 hover:bg-muted rounded-md">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{currentEmail.subject}</h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                {currentEmail.sender[0]}
              </div>
              <div>
                <div className="font-semibold">{currentEmail.sender}</div>
                <div className="text-xs text-muted-foreground italic">
                  To: me@upscaler.io
                </div>
              </div>
            </div>
            <div className="prose prose-sm max-w-none text-muted-foreground leading-7 whitespace-pre-wrap">
              {currentEmail.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
