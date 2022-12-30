import { Button, Container } from "react-bootstrap";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <Container>
        <h1 className="register">Profile</h1>
        <br />
        <br />
        <Link href={`/profile/name`} passHref legacyBehavior>
          <Button className="mt-auto" variant="outline-danger">
            Edit profile
          </Button>
        </Link>
      </Container>
    </>
  );
}
