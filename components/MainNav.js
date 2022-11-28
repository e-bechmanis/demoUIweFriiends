import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "../lib/userData";
import { readToken, removeToken } from "../lib/authenticate";

// components/MainNav.js
export default function MainNav() {
  const router = useRouter();
  const [query, setQuery] = useState("Search");
  const [isExpanded, setExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  const handleSearchInput = (e) => setQuery(e.target.value);

  async function submitForm(e) {
    e.preventDefault();
    const queryString = `title=true&q=${query}`;
    router.push(`/artwork?${queryString}`);
    setExpanded(false);
    setSearchHistory(await addToHistory(queryString));
  }

  function logout() {
    setExpanded(false);
    removeToken();
    router.push("/login");
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
          <Navbar.Brand className="text-danger">ELENA BECHMANIS</Navbar.Brand>
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
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    onClick={controlLinks}
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={submitForm}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={handleSearchInput}
                />
                <Button
                  type="submit"
                  variant="outline-danger"
                  className="my-button"
                >
                  Search&nbsp;
                  <FaSearch />
                </Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {token && (
                <NavDropdown
                  title={
                    <span>
                      {token.userName} <FaUserAlt /> &nbsp;
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item onClick={controlLinks}>
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item onClick={controlLinks}>
                      History
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
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link
                      onClick={controlLinks}
                      active={router.pathname === "/login"}
                    >
                      Login <RiLoginBoxLine />
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
