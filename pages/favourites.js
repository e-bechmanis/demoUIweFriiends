import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "/components/ArtworkCard";
import { Container } from "react-bootstrap";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (favouritesList.length > 0) {
    return (
      <>
        <br />
        <Container>
          <Row className="gy-4">
            {favouritesList.map((objectID) => (
              <Col lg={3} key={objectID}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))}
          </Row>
          <br />
        </Container>
      </>
    );
  } else if (favouritesList.length === 0) {
    return (
      <Container>
        <Card className="text-center">
          <Card.Body>
            <h4 className="text-danger">Nothing Here</h4>
            Try adding some new artwork to the list.
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
