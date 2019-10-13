import React from "react";

import { removeToken } from "../services/auth";

const Nav = () => {
  const handleLogout = () => {
    removeToken();
    window.location = "/login";
  };
  return (
    <nav className="navbar navbar-light">
      <a className="navbar-brand" href="/">
        Calendar Scheduler
      </a>
      <form className="form-inline">
        <button type="button" className="btn btn-light" onClick={handleLogout}>
          Logout
        </button>
      </form>
    </nav>
  );
};

export default Nav;
