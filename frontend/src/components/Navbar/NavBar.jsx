import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';
import {arw, l_arw} from "../../assets/icons/icons";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HailIcon from '@mui/icons-material/Hail';
import LogoutIcon from '@mui/icons-material/Logout';

const Nav = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`side ${isExpanded ? '' : 'collapsed'}`}>
     
      <div className='side-bar'>
      <div className="side-cont">
        <Link className="list-cont" to="/dashboard">
          <div className="side-bar-tab">
            <span className="sym"><DashboardIcon /> </span >
            {isExpanded && <h2 className="tab-name mx-2">Dashboard</h2>}
          </div>
        </Link>
        <Link className="list-cont" to="/projects">
          <div className="side-bar-tab">
           <span className="sym"><AccountTreeIcon/></span >
            {isExpanded && <h2 className="tab-name mx-2">Projects</h2>}
          </div>
        </Link>
        <Link className="list-cont" to="/clients">
          <div className="side-bar-tab">
            <span className="sym"><PeopleOutlineIcon/></span >
            {isExpanded && <h2 className="tab-name mx-2">Clients</h2>}
          </div>
        </Link>
        <Link className="list-cont" to="/estimation">
          <div className="side-bar-tab">
            <span className="sym"><ReceiptLongIcon/></span >
            {isExpanded && <h2 className="tab-name mx-2">Transactions</h2>}
          </div>
        </Link>
        <Link className="list-cont" to="/reports">
          <div className="side-bar-tab">
            <span className="sym"><AssessmentIcon/></span >
            {isExpanded && <h2 className="tab-name mx-2">Reports</h2>}
          </div>
        </Link>
        <Link className="list-cont" to="/library">
          <div className="side-bar-tab">
            <span className="sym"><LibraryBooksIcon/></span >
            {isExpanded && <h2 className="tab-name mx-2">Library</h2>}
          </div>
        </Link>
        <Link className="list-cont" to="/employee">
          <div className="side-bar-tab">
          <span className="sym"><BadgeIcon /></span>
            {isExpanded && <h2 className="tab-name mx-2">Employee</h2>}
          </div>
        </Link>
        <Link className="list-cont" to="/party">
          <div className="side-bar-tab">
          <span className="sym"><HailIcon /></span >
            {isExpanded && <h2 className="tab-name mx-2">Party</h2>}
          </div>
        </Link>
        <Link className="list-cont" to="/configuration">
          <div className="side-bar-tab">
          <span ><AccountBalanceWalletIcon /></span>
            {isExpanded && <h2 className="tab-name mx-2">Configuration</h2>}
          </div>
          <Link className="list-cont" to="/logout">
          <div className="side-bar-tab">
          <span ><LogoutIcon /></span>
            {isExpanded && <h2 className="tab-name mx-2">Logout</h2>}
          </div>
        </Link>
        </Link>
      </div>
      </div>
      <button onClick={toggleNav} className="close_button border-1 rounded-full bg-blue-600">
        <img className="w-2 h-2 m-2" src={isExpanded ? l_arw : arw} alt="Toggle Sidebar" />
      </button>
    </div>
  );
};

export default Nav;
