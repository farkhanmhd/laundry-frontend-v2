import {
  Archive,
  ChartNoAxesCombined,
  ClipboardClock,
  HandPlatter,
  ListTodo,
  Logs,
  type LucideIcon,
  Package,
  ShieldUser,
  Ticket,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const adminNavData: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Point of Sales",
    url: "/pos",
    icon: Logs,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ListTodo,
  },
  {
    title: "Pick Ups",
    url: "/pickups",
    icon: Package,
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
  },
  {
    title: "Shifts",
    url: "/shifts",
    icon: ClipboardClock,
  },
];

export const superAdminNavData: NavItem[] = [
  ...adminNavData,
  {
    title: "Products",
    url: "/products",
    icon: Archive,
  },
  {
    title: "Services",
    url: "/services",
    icon: HandPlatter,
  },
  {
    title: "Vouchers",
    url: "/vouchers",
    icon: Ticket,
  },
  {
    title: "Users",
    url: "/users",
    icon: ShieldUser,
  },
];
