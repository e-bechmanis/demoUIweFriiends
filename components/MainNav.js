import {Container, Nav, Navbar, Form, Button} from "react-bootstrap"
import Link from "next/link"
import { useState } from 'react'
import { useRouter } from 'next/router'

// components/MainNav.js
export default function MainNav(){
    const router = useRouter()
    const [query, setQuery] = useState('Search')

    const handleSearchInput = e => setQuery(e.target.value)
 
    const submitForm = (e) => {
      e.preventDefault();
      router.push({
        pathname: '/artwork',
        query: {title: true, q: query},
      })
    }

    return (
        <>
        <Navbar bg="dark" variant="dark" className="fixed-top">
        <Container>
          <Navbar.Brand>ELENA BECHMANIS</Navbar.Brand>
          <Nav className="me-auto">
            <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
            <Link href="/search" passHref><Nav.Link>Advanced Search</Nav.Link></Link>
          </Nav>
          <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleSearchInput}
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Container>
        </Navbar>
        <br/>
        <br/>
        </>
    )
}