import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { addCity } from "../../lib/userData";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ProfileCard from "../../components/ProfileCard";
import { IconContext } from "react-icons";

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

  function handleReturn(e) {
    router.push("/profile/country");
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
