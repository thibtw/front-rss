export const sidebarNav = [
  { name: "All Applications", path: "/home" },
  { name: "My Applications", path: "/home/my-applications" },
  { name: "Dashboard", path: "/home/dashboard" },
  { name: "Analytics", path: "/home/analytics" },
] as const;

export type SidebarNavItem = (typeof sidebarNav)[number];
