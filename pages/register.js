import { Card, Form, Alert, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { registerUser } from "../lib/authenticate";
import { useRouter } from "next/router";

export default function Register(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Container className="userForms">
        <br />
        <br />

        <h3 className="text-danger register">REGISTER</h3>
        <div className="text-muted">
          Register for an account and get full access to art collection of The
          Met
        </div>

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
          <br />
          <Form.Group>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              id="password2"
              name="password2"
              onChange={(e) => setPassword2(e.target.value)}
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
            Register
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
