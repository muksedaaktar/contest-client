import { NavLink } from "react-router-dom";

const ActiveNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `transition-all duration-200 ${
          isActive
            ? "text-primary font-bold border-b-2 border-primary"
            : "text-base-content hover:text-primary"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveNavLink;