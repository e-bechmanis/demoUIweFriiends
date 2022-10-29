import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "/components/ArtworkCardDetail";

//ArtworkById (pages/artwork/[objectID].js)
export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    </>
  );
}
