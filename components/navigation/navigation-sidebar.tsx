import { NavMain } from "@/components/sidebar/nav-main";
import { getSession } from "@/lib/auth/session";

const NavigationSidebar = async () => {
  const session = await getSession();

  return <NavMain type={session?.user.role as string} />;
};

export default NavigationSidebar;
