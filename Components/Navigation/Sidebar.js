//Bootstrap
import Nav from "react-bootstrap/Nav";

//Styles
import "./Sidebar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ children }) {
  return (
    <Nav className="col-md-12 d-none d-md-block sidebar ">
      <Nav.Item className="d-flex">
        <Nav.Link
          className="col text-center sbLink text-white"
          href="/dashboard"
        >
          Dashboard
        </Nav.Link>
        {/* <Nav.Link className="col-6 text-center navLink" href="/home">
            Account
          </Nav.Link> */}
      </Nav.Item>
      {children}
      <div className="loggedInUser">
        <div className="sbLink">Log Out</div>
        <div className=" d-flex mt-1">
          <div className="col-4 text-center p-2">
            <FontAwesomeIcon
              icon={faUser}
              size="sm"
              className="userCircle p-2"
            />
          </div>
          <div className="col-8 d-flex flex-column justify-content-center ">
            <span className="">User Name</span>
          </div>
        </div>
      </div>
    </Nav>
  );
}
