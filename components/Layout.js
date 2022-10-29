import { Container } from "react-bootstrap";
import MainNav from "./MainNav";

// components/Layout.js

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <br />
      <Container fluid>{props.children}</Container>
      <br />
    </>
  );
}
