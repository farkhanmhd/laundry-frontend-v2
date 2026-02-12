import {
  Archive,
  Blocks,
  ChartColumnIncreasing,
  ChartNoAxesCombined,
  HandPlatter,
  Home,
  ListTodo,
  type LucideIcon,
  Monitor,
  Motorbike,
  ShieldUser,
  Ticket,
  Truck,
  User,
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
    title: "POS",
    url: "/pos",
    icon: Monitor,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ListTodo,
  },
  {
    title: "Deliveries",
    url: "/deliveries",
    icon: Motorbike,
  },
  {
    title: "Pick Ups",
    url: "/pickups",
    icon: Truck,
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
  },
  {
    title: "Sales",
    url: "/sales",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Inventories",
    url: "/inventories",
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
    title: "Bundlings",
    url: "/bundlings",
    icon: Blocks,
  },
];

export const superAdminNavData: NavItem[] = [
  ...adminNavData,
  {
    title: "Users",
    url: "/users",
    icon: ShieldUser,
  },
];

export const customerNavData: NavItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Orders", // Based on the 'orders' table
    url: "/customer-orders",
    icon: ListTodo,
  },
  {
    title: "Deliveries", // Based on the 'orders' table
    url: "/customer-deliveries",
    icon: Truck,
  },
  {
    title: "Account", // Based on the 'user' table
    url: "/account",
    icon: User,
  },
];
