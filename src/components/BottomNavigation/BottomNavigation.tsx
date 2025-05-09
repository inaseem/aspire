import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { sidebarItems } from "../../constants";
import styles from "./index.module.scss";

const NavItem = ({
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

const BottomNavigation = () => {
  return (
    <nav className="w-full bg-white">
      <ul className="flex justify-between sm:hidden list-none px-[31px] py-2 bg-white shadow-bottomNav z-20 fixed bottom-0 w-full">
        {sidebarItems.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigation;
