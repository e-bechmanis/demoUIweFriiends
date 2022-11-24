import useSWR from "swr";
import Card from "react-bootstrap/Card";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { FaRegHeart } from "react-icons/fa";
import { Container } from "react-bootstrap";
import { addToFavourites, removeFromFavourites } from "../lib/userData";

// ArtworkCardDetail (components/ArtworkCardDetail.js)
export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  useEffect(() => {
    setShowAdded(favouritesList?.includes({ objectID }));
  }, [favouritesList]);

  async function favouritesClicked() {
    showAdded === true
      ? setFavouritesList(await removeFromFavourites(objectID))
      : setFavouritesList(await addToFavourites(objectID));
  }

  if (error) return <Error statusCode={404} />;
  else if (!data) return null;
  else
    return (
      <>
        <Container>
          <Card>
            {data.primaryImage && (
              <Card.Img variant="top" src={data.primaryImage} />
            )}
            <Card.Body>
              <Card.Title className="text-danger">
                {data.title ? data.title : "N/A"}
              </Card.Title>
              <Card.Text>
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
                <strong>Artist: </strong>
                {data.artistDisplayName ? (
                  <>
                    {data.artistDisplayName} ({" "}
                    <a
                      href={data.artistWikidata_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      wiki
                    </a>{" "}
                    )
                  </>
                ) : (
                  "N/A"
                )}
                <br />
                <strong>Credit Line: </strong>
                {data.creditLine ? data.creditLine : "N/A"}
                <br />
                <strong>Dimensions: </strong>
                {data.dimensions ? data.dimensions : "N/A"}
                <br />
              </Card.Text>
              <Button
                onClick={favouritesClicked}
                className="mt-auto"
                variant={showAdded ? "danger" : "outline-danger"}
              >
                {showAdded ? "Favourite (added)" : "Favourite"} <FaRegHeart />
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
}
