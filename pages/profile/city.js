import { Button, Container, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { addCity } from "../../lib/userData";

export default function ProfileCity() {
  const [city, setCity] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addCity(city);
      router.push("/profile/photo");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Container className="userForms">
        <br />
        <h3 className="register">Location</h3>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Select your location (city)</Form.Label>
            <br />
            <Form.Control
              type="text"
              id="city"
              name="city"
              onChange={(e) => setCity(e.target.value)}
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
