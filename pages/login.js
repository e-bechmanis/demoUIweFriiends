import { Card, Form, Alert, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from "next/router";
import { favouritesAtom } from "../store";
import { searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";
import { useAtom } from "jotai";

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      router.push("/favourites");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Container className="userForms">
        <br />
        <br />
        <h3 className="text-danger register">LOGIN</h3>
        <div className="text-muted">Enter your login information below</div>

        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>User:</Form.Label>
            <Form.Control
              type="text"
              value={user}
              id="userName"
              name="userName"
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}

          <br />
          <Button variant="outline-danger" className="pull-right" type="submit">
            Login
          </Button>
        </Form>
      </Container>
      <div className="footer-svg fixed-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ff4444"
            fillOpacity="0.2"
            d="M0,32L120,80C240,128,480,224,720,229.3C960,235,1200,149,1320,106.7L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
}
