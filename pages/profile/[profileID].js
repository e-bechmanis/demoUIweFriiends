import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";
import Link from "next/link";
import { getUserProfile } from "../../lib/userData";

export default function Profile() {
  const router = useRouter();
  const { profileID } = router.query;
  getUserProfile(profileID);

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
