import clsx from "clsx";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import { sidebarItems } from "../../constants";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <div className="flex flex-col gap-5">
      <img src={logo} alt="Aspire Logo" width={125} height={35} />
      <div className="text-[15px] text-white opacity-30">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </div>
    </div>
  );
};

const SidebarItem = ({
  icon,
  title,
  href,
}: {
  icon: string;
  title: string;
  href: string;
}) => {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          clsx(styles.item, isActive && styles.active)
        }
      >
        <img src={icon} />
        {title}
      </NavLink>
    </li>
  );
};

const Sidebar = () => {
  return (
    <nav className="p-12">
      <Header />
      <ul className="mt-20 flex flex-col gap-[60px]">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
