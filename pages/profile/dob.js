import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { addDob } from "../../lib/userData";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ProfileCard from "../../components/ProfileCard";
import { IconContext } from "react-icons";

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

  function handleReturn(e) {
    router.push("/profile/name");
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
            <br />
            <IconContext.Provider value={{ size: "45px" }}>
              <Button className="back-arrow" onClick={handleReturn}>
                <BsFillArrowLeftCircleFill />
              </Button>
            </IconContext.Provider>
            <br />
            <br />
            <h3 className="register">Tell us about you</h3>
            <br />
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>What&apos;s your date of birth?</Form.Label>
                <br />
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      id="day"
                      name="day"
                      onChange={(e) => setDay(e.target.value)}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      id="month"
                      name="month"
                      onChange={(e) => setMonth(e.target.value)}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      id="year"
                      name="year"
                      onChange={(e) => setYear(e.target.value)}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>

              <br />

              {warning && (
                <>
                  <br />
                  <Alert variant="danger">{warning}</Alert>
                </>
              )}

              <br />
              <Button
                variant="outline-danger"
                className="custom-btn"
                type="submit"
              >
                Next
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
