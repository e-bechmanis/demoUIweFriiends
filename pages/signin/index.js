import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { GrFacebook } from "react-icons/gr";
import { BsGoogle } from "react-icons/bs";
import Link from "next/link";

export default function Signin(props) {
  const router = useRouter();

  async function handleRedirect() {
    router.push(`/signin/email`);
  }

  return (
    <>
      <Container className="userForms">
        <br />
        <br />
        <h3 className="register">Sign in</h3>
        <br />
        <div className="text-center">
          <div className="text-muted">
            Demo UI to test email, Facebook and Gmail sign in functionality
          </div>
          <br />
          <br />
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/facebook`}
            passHref
            legacyBehavior
          >
            <Button variant="outline-secondary" className="login-btn">
              <GrFacebook /> &nbsp; &nbsp;Facebook
            </Button>
          </Link>
          <br />
          <br />
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/google`}
            passHref
            legacyBehavior
          >
            <Button variant="outline-secondary" className="login-btn">
              <BsGoogle /> &nbsp; &nbsp;Google
            </Button>
          </Link>
          <br />
          <br />
          <Button
            variant="outline-secondary"
            className="login-btn"
            onClick={handleRedirect}
          >
            email
          </Button>
        </div>
      </Container>
    </>
  );
}
