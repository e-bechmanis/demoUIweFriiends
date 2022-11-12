import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import Error from "next/error";
import { BsBoxArrowUpRight } from "react-icons/bs";

// ArtworkCard (components/ArtworkCard.js)
export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) return <Error statusCode={404} />;
  else if (!data) return null;
  else
    return (
      <>
        <Card className="rounded shadow-sm border-0 h-100">
          <Card.Img
            variant="top"
            className="my-card"
            src={
              data.primaryImageSmall
                ? data.primaryImageSmall
                : "https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d"
            }
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
            <Card.Text className="text-muted">
              <strong>Date: </strong>
              {data.objectDate ? data.objectDate : "N/A"}
              <br />
              <strong>Classification: </strong>
              {data.classification ? data.classification : "N/A"}
              <br />
              <strong>Medium: </strong>
              {data.medium ? data.medium : "N/A"}
              <br />
              <br />
            </Card.Text>
            <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
              <Button className="mt-auto" variant="outline-danger">
                ID: {objectID} &nbsp;
                <BsBoxArrowUpRight className="float-end" />
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
}
