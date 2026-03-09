export const sidebarNav = [
  { name: "Inbox", path: "/home/inbox" },
  { name: "All Applications", path: "/home" },
  { name: "My Applications", path: "/home/my-applications" },
  { name: "My CV and Cover Letter", path: "/home/my-resume" },
  { name: "Analytics", path: "/home/analytics" },
] as const;

export type SidebarNavItem = (typeof sidebarNav)[number];
