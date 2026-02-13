import { NavMain } from "@/components/sidebar/nav-main";
import { Client } from "../utils/client";

const NavigationSidebar = () => {
  return (
    <Client>
      <NavMain />
    </Client>
  );
};

export default NavigationSidebar;
