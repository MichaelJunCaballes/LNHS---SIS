import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/registrar/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Students",
    href: "/registrar/students",
    icon: "bi bi-people",
  },
  {
    title: "Transcript of Records",
    href: "/registrar/TOR",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "User Profile",
    href: "/registrar/profile",
    icon: "bi bi-patch-check",
  },
  {
    title: "User Accounts",
    href: "/registrar/accounts",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
