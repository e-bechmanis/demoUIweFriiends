import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { addName } from "../../lib/userData";
import ProfileCard from "../../components/ProfileCard";

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
      <Container>
        <br />
        <Row>
          <Col className="col-4">
            <ProfileCard />
          </Col>
          <Col className="col-6">
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
              <div className="text-center">
                <Button
                  variant="outline-danger"
                  className="custom-btn"
                  type="submit"
                >
                  Next
                </Button>
              </div>
              <br />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
