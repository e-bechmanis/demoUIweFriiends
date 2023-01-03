import { Form, Alert, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser } from "../../lib/authenticate";
import { useRouter } from "next/router";

export default function EmailSignin(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      router.push(`/profile`);
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Container className="userForms">
        <br />
        <br />
        <h3 className="register">Sign in via email</h3>
        <br />
        <div className="text-muted">
          Demo UI to test email sign in functionality
        </div>
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
          <div className="text-center">
            <Button
              variant="outline-danger"
              className="custom-btn"
              type="submit"
            >
              Login
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
