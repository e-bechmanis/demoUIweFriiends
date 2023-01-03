import { Button, Container } from "react-bootstrap";
import Link from "next/link";
import ProfileCard from "../../components/ProfileCard";
import { deleteUserProfile } from "../../lib/userData";
import { removeToken } from "../../lib/authenticate";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();

  async function handleDelete() {
    await deleteUserProfile();
    removeToken();
    router.push("/signin");
  }

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
        <Button
          className="mt-auto"
          variant="outline-secondary"
          onClick={handleDelete}
        >
          Delete my profile
        </Button>
      </Container>
    </>
  );
}
