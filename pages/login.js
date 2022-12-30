import { Form, Alert, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from "next/router";

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      router.push(`/profile/${user}`);
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Container className="userForms">
        <br />
        <br />
        <h3 className="register">Sign in</h3>
        <div className="text-muted">
          Demo UI to test email, Facebook and Gmail sign in functionality
        </div>
        <br />
        <a href="http://localhost:8080/api/auth/facebook">
          Facebook Simple Login
        </a>
        <br />
        <br />
        <a href="http://localhost:8080/api/auth/google">Google Simple Login</a>
        <br />
        <br />
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              value={user}
              id="userId"
              name="userId"
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
    </>
  );
}
