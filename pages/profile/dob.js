import { Button, Container, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { addDob } from "../../lib/userData";

export default function ProfileDob() {
  const [day, setDay] = useState("DD");
  const [month, setMonth] = useState("MM");
  const [year, setYear] = useState("YYYY");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    let dob = { day: day, month: month, year: year };
    try {
      await addDob(dob);
      router.push("/profile/lookingfor");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Container className="userForms">
        <h3 className="register">Tell us about you</h3>
        <br />
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>What&apos;s your date of birth?</Form.Label>
            <br />
            <Form.Control
              type="number"
              id="day"
              name="day"
              onChange={(e) => setDay(e.target.value)}
              required
            />
            &nbsp;&nbsp;
            <Form.Control
              type="number"
              id="month"
              name="month"
              onChange={(e) => setMonth(e.target.value)}
              required
            />
            &nbsp;&nbsp;
            <Form.Control
              type="number"
              id="year"
              name="year"
              onChange={(e) => setYear(e.target.value)}
              required
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
