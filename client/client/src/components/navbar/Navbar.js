import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext } from "react";
import { SiteContext } from "../../context/SiteContext";
import * as FaIcons from "react-icons/fa"
import Badge from '@mui/material/Badge';
import BreadCrumb from '../breadcrumb/BreadCrumb'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Navbar = () => {

  const { state , dispatch } = useContext(SiteContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="menu-bars">
          <FaIcons.FaBars 
            onClick={() => dispatch({ type: "BAR_TOGGLE" })}
          />
          <div className="div-breadcrumb"><BreadCrumb className="breadcrumb-color"/></div>
          
        </div>
        
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item"
          onClick={() => dispatch({ type: "COLOR_TOGGLE" })}
          >
            {state.colorMode == 'dark' ? (
            <LightModeOutlinedIcon
              className="icon"
            />
            )
            :
              (
              <DarkModeOutlinedIcon
              className="icon"
            />
              )
            }
          </div>
          <div className="item">
            <Badge badgeContent={1} color="error">
              <NotificationsNoneOutlinedIcon className="icon" />
            </Badge>
          </div>
          <div className="item">
          <Badge badgeContent={2} color="primary">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
          </Badge>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="./avatar.jpg"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;