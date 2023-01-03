import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import NavDropdown from "react-bootstrap/NavDropdown";
import { readToken, removeToken } from "../lib/authenticate";
import Image from "next/image";

// components/MainNav.js
export default function MainNav() {
  const router = useRouter();
  const [isExpanded, setExpanded] = useState(false);

  let token = readToken();

  function logout() {
    setExpanded(false);
    removeToken();
    router.push("/signin");
  }

  function controlMenuToggle() {
    isExpanded === true ? setExpanded(false) : setExpanded(true);
  }

  function controlLinks() {
    if (isExpanded === true) setExpanded(false);
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="fixed-top"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand className="text-danger">
            <Image
              src="/images/Group63.png"
              alt="logo"
              width="160"
              height="30"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            onClick={controlMenuToggle}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={controlLinks}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Nav>
              {token && (
                <NavDropdown
                  title={
                    <span>
                      My Account <FaUserAlt /> &nbsp;
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <Link href="/profile" passHref legacyBehavior>
                    <NavDropdown.Item onClick={controlLinks}>
                      Profile
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
              {!token && (
                <>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link
                      onClick={controlLinks}
                      active={router.pathname === "/register"}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                  <Link href="/signin" passHref legacyBehavior>
                    <Nav.Link
                      onClick={controlLinks}
                      active={router.pathname === "/login"}
                    >
                      Sign in <RiLoginBoxLine />
                    </Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
