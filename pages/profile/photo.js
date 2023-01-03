import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { uploadToServer } from "../../lib/userData";
import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ProfileCard from "../../components/ProfileCard";
import { IconContext } from "react-icons";

export default function ProfilePhoto() {
  const [image, setImage] = useState(null);
  const [objectURL, setObjectURL] = useState("");
  const router = useRouter();

  const uploadPhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      const photo = e.target.files[0];
      setImage(photo);
      setObjectURL(URL.createObjectURL(photo));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    router.push(`/profile`);
    await uploadToServer(image);
  }

  function handleReturn(e) {
    router.push("/profile/city");
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
            <h3 className="register">Testing photo upload</h3>
            <br />
            <br />
            <Form encType="multipart/form-data" method="POST">
              <Form.Group>
                <Form.Label>Please upload your photo</Form.Label>
                <br />
                <Form.Control
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={uploadPhoto}
                />
              </Form.Group>
              <br />
              <br />
              <div className="text-center">
                <Button
                  variant="outline-danger"
                  className="custom-btn"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Upload
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
