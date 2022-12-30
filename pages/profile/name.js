import { Button, Container, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { addName } from "../../lib/userData";

export default function ProfileName() {
  const [name, setName] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addName(name);
      router.push("/profile/dob");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Container className="userForms">
        <h3 className="register">Let&apos;s get started!</h3>
        <br />
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>What&apos;s your name?</Form.Label>
            <br />
            <Form.Control
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <br />

          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}

          <br />
          <Button variant="outline-danger" className="pull-right" type="submit">
            Next
          </Button>
        </Form>
      </Container>
    </>
  );
}
