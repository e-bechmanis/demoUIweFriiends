import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { uploadToServer } from "../../lib/userData";
import { useRouter } from "next/router";

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
    router.push(`/`);
    await uploadToServer(image);
  }

  return (
    <>
      <Container className="userForms">
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
          <Button
            variant="outline-danger"
            className="pull-right"
            type="submit"
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </Form>
      </Container>
    </>
  );
}
