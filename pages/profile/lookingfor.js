import { Button, Container, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { addInterests } from "../../lib/userData";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ProfileCard from "../../components/ProfileCard";
import { IconContext } from "react-icons";

export default function ProfileLookingFor() {
  const [value, setValue] = useState([]);
  const router = useRouter();

  const handleChange = (val) => setValue(val);

  async function handleSubmit(e) {
    e.preventDefault();
    router.push(`/profile/country`);
    await addInterests(value);
  }

  function handleReturn(e) {
    router.push("/profile/dob");
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
            <h3 className="register">What are you looking for?</h3>
            <br />
            <ToggleButtonGroup
              type="checkbox"
              size="sm"
              value={value}
              onChange={handleChange}
            >
              <ToggleButton
                id="tbg-check-1"
                variant="outline-secondary"
                value="Looking for new friends"
              >
                Looking for new friends
              </ToggleButton>
              &nbsp;
              <ToggleButton
                id="tbg-check-2"
                variant="outline-secondary"
                value="I am a new mom"
              >
                I am a new mom
              </ToggleButton>
              &nbsp;
              <ToggleButton
                id="tbg-check-3"
                variant="outline-secondary"
                value="Let's take the dogs fo a walk"
              >
                Let&apos;s take the dogs fo a walk
              </ToggleButton>
              &nbsp;
              <br />
              <br />
              <ToggleButton
                id="tbg-check-4"
                variant="outline-secondary"
                value="Let's be friends, I am new in town"
              >
                Let&apos;s be friends, I am new in town
              </ToggleButton>
              &nbsp;
              <ToggleButton
                id="tbg-check-5"
                variant="outline-secondary"
                value="I am learning a new language. Let's talk!"
              >
                I am learning a new language. Let&apos;s talk!
              </ToggleButton>
              &nbsp;
              <ToggleButton
                id="tbg-check-6"
                variant="outline-secondary"
                value="My plans are to move abroad"
              >
                My plans are to move abroad
              </ToggleButton>
              &nbsp;
              <ToggleButton
                id="tbg-check-7"
                variant="outline-secondary"
                value="How do you do it? Share your experience"
              >
                How do you do it? Share your experience
              </ToggleButton>
              &nbsp;
              <ToggleButton
                id="tbg-check-8"
                variant="outline-secondary"
                value="I look for emotional support"
              >
                I look for emotional support
              </ToggleButton>
              &nbsp;
            </ToggleButtonGroup>
            <br />
            <br />
            <div className="text-center">
              <Button
                variant="outline-danger"
                className="custom-btn"
                onClick={handleSubmit}
              >
                Next
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
