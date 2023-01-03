import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { GrFacebook } from "react-icons/gr";
import { BsGoogle } from "react-icons/bs";
import Link from "next/link";
import { authenticateViaFacebook } from "../../lib/authenticate";

export default function Signin(props) {
  const router = useRouter();

  async function handleEmailRedirect() {
    router.push(`/signin/email`);
  }

  async function handleFacebookRedirect() {
    await authenticateViaFacebook();
    router.push(`/profile`);
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
          <Button
            variant="outline-secondary"
            className="login-btn"
            onClick={handleFacebookRedirect}
          >
            <GrFacebook /> &nbsp; &nbsp;Facebook
          </Button>
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
            onClick={handleEmailRedirect}
          >
            email
          </Button>
        </div>
      </Container>
    </>
  );
}
