import { Card, Container } from "react-bootstrap";
import { useAtom } from "jotai";
import { profileAtom } from "../store";

export default function ProfileCard() {
  const [profile, setProfile] = useAtom(profileAtom);

  return (
    <>
      <Container>
        <h3 className="profile-text my-card">My Profile</h3>
        <Card
          style={{ width: "25rem" }}
          className="rounded shadow-sm border-0 h-100"
        >
          <Card.Img
            variant="top"
            className="my-card-img"
            src={
              profile.photos && profile.photos[0]
                ? profile.photos[0]
                : "https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d"
            }
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title className="profile-name">
              {profile.name ? profile.name : "Please update your profile"}
            </Card.Title>
            <Card.Text className="text-muted">
              {profile.age ? profile.age + " y.o. - " : ""}
              {profile.location && profile.location.country
                ? profile.location.country
                : ""}{" "}
              {profile.location && profile.location.city
                ? "(" + profile.location.city + ")"
                : ""}
              <br />
              {profile.zodiacSign ? <strong>Zodiac Sign: </strong> : ""}
              {profile.zodiacSign ? profile.zodiacSign : ""}
              <br />
              {profile.reason ? <strong>Looking for: </strong> : ""}
              <ul>
                {profile.reason &&
                  profile.reason.map((interest) => (
                    <li key="interest">{interest}</li>
                  ))}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
