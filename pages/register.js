import { Form, Alert, Button, Container } from "react-bootstrap";
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

        <h4 className="register">REGISTER</h4>
        <div className="text-muted">
          Demo UI for user registration via email
        </div>

        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>User:</Form.Label>
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
    </>
  );
}
