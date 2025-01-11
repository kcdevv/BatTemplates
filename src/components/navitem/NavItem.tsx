import React from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  icon: string;
  label: string;
  to: string;
  classNames?: string
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, classNames }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg text-primary font-semibold text-xl hover:bg-white hover:bg-opacity-[0.03] ${
          isActive ? "bg-white bg-opacity-5 font-bold" : ""
        }`
      }
    >
      <img src={icon} alt={label} className={`h-10 w-10 filter contrast-100 sepia-100 hue-rotate-360 saturate-150 ${classNames}`} />
      <span>{label}</span>
    </NavLink>
  );
};

export default NavItem;
