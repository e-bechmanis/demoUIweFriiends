import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";

// components/MainNav.js
export default function MainNav() {
  const router = useRouter();
  const [query, setQuery] = useState("Search");
  const [isExpanded, setExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSearchInput = (e) => setQuery(e.target.value);

  const submitForm = (e) => {
    e.preventDefault();
    const queryString = `/artwork?title=true&q=${query}`;
    router.push(queryString);
    setExpanded(false);
    setSearchHistory((current) => [...current, queryString]);
  };

  const controlMenuToggle = () => {
    isExpanded === true ? setExpanded(false) : setExpanded(true);
  };

  const controlLinks = () => {
    if (isExpanded === true) setExpanded(false);
  };

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
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  onClick={controlLinks}
                  active={router.pathname === "/search"}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
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
            &nbsp;
            <Nav>
              <NavDropdown
                title={
                  <span>
                    User Name <FaUserAlt /> &nbsp;
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={controlLinks}
                    active={router.pathname === "/favourites"}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={controlLinks}
                    active={router.pathname === "/history"}
                  >
                    History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
