import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { addCountry } from "../../lib/userData";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ProfileCard from "../../components/ProfileCard";
import { IconContext } from "react-icons";

export default function ProfileCountry() {
  const [country, setCountry] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addCountry(country);
      router.push("/profile/city");
    } catch (err) {
      setWarning(err.message);
    }
  }

  function handleReturn(e) {
    router.push("/profile/lookingfor");
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
            <div className="text-center">
              <IconContext.Provider value={{ size: "45px" }}>
                <Button className="back-arrow" onClick={handleReturn}>
                  <BsFillArrowLeftCircleFill />
                </Button>
              </IconContext.Provider>
            </div>
            <br />
            <br />
            <h3 className="register">Location</h3>
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Select your location (country)</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  id="country"
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
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
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
