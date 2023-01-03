import { Button, Container } from "react-bootstrap";
import Link from "next/link";
import ProfileCard from "../../components/ProfileCard";

export default function Profile() {
  return (
    <>
      <Container>
        <ProfileCard />
        <br />
        <Link href={`/profile/name`} passHref legacyBehavior>
          <Button className="mt-auto custom-btn" variant="outline-danger">
            Edit my profile
          </Button>
        </Link>
        &nbsp; &nbsp;
        <Link href={`/profile/name`} passHref legacyBehavior>
          <Button className="mt-auto" variant="outline-secondary">
            Delete my profile
          </Button>
        </Link>
      </Container>
    </>
  );
}
