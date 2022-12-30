import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";

export default function ProfilePhoto() {
  const [image, setImage] = useState(null);
  const [objectURL, setObjectURL] = useState("");

  const uploadPhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      const photo = e.target.files[0];
      console.log(photo);
      setImage(photo);
      console.log(image);
      console.log(URL.createObjectURL(photo));
      setObjectURL(URL.createObjectURL(photo));
      console.log(objectURL);
    }
  };

  const uploadToServer = async (e) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_TWO}/upload`,
      {
        method: "POST",
        body,
      }
    );
  };

  return (
    <>
      <Container className="userForms">
        <h3 className="register">Testing photo upload</h3>
        <br />
        <br />
        <Form encType="multipart/form-data">
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
          <Button
            variant="outline-danger"
            className="pull-right"
            type="submit"
            onClick={uploadToServer}
          >
            Next
          </Button>
        </Form>
      </Container>
    </>
  );
}
