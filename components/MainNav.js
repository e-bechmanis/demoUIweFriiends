import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

// components/MainNav.js
export default function MainNav() {
  const router = useRouter();
  const [query, setQuery] = useState("Search");
  const [isExpanded, setExpanded] = useState(false);

  const handleSearchInput = (e) => setQuery(e.target.value);

  const submitForm = (e) => {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${query}`);
    setExpanded(false);
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
                <Nav.Link onClick={controlLinks}>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link onClick={controlLinks}>Advanced Search</Nav.Link>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
