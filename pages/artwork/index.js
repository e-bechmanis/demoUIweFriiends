import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "/components/ArtworkCard";
import Pagination from "react-bootstrap/Pagination";
import Error from "next/error";
import { Container } from "react-bootstrap";

//Artwork (pages/artwork/index.js)

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage(e) {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }

  function nextPage(e) {
    setPage((prevPage) =>
      page < artworkList.length ? prevPage + 1 : prevPage
    );
  }

  useEffect(() => {
    if (data) {
      const results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  console.log(artworkList);

  if (error) return <Error statusCode={404} />;
  else if (artworkList.length > 0) {
    return (
      <>
        <br />
        <Container>
          <Row className="gy-4">
            {artworkList[page - 1].map((objectID) => (
              <Col lg={3} key={objectID}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))}
          </Row>
          <br />
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev
                  className="accordion-header"
                  onClick={previousPage}
                />
                <Pagination.Item className="accordion-header">
                  {page}
                </Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else if (artworkList.length === 0) {
    return (
      <Card className="text-center">
        <Card.Body>
          <h4 className="text-danger">Nothing Here</h4>
          Try searching for something else
        </Card.Body>
      </Card>
    );
  } else return null;
}
