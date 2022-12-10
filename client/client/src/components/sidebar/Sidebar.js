import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { SiteContext } from "../../context/SiteContext";

const Sidebar = () => {

    const { state , dispatch } = useContext(SiteContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        dispatch({ type: "LOGOUT" });
        navigate('/linkpage');
    }

    return (
      <div className={ state?.barMode ? "sidebar" : "sidebar  hide"}
      >
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Admin</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
            </Link>
            <p className="title">LISTS</p>
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Admin</span>
              </li>
            </Link>
            <Link to="/editor" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>Editor</span>
              </li>
            </Link>
            <Link to="/lounge" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Lounge</span>
            </li>
            </Link>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Linkpage</span>
            </li>
            <p className="title">USEFUL</p>
            <li>
              <InsertChartIcon className="icon" />
              <span>Stats</span>
            </li>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Notifications</span>
            </li>
            <p className="title">SERVICE</p>
            <Link to="/calendar" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className="icon" />
              <span>Calendar</span>
            </li>
            </Link>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>System Health</span>
            </li>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Logs</span>
            </li>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
            <li>
              <ExitToAppIcon className="icon" />
              <span onClick={logout}>Logout</span>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "COLOR_LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "COLOR_DARK" })}
          ></div>
          {/* <div
            className="colorOption"
            onClick={() => dispatch({ type: "COLOR_GREEN" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "COLOR_PINK" })}
          ></div> */}
        </div>
      </div>
    );
  };
  
  export default Sidebar;