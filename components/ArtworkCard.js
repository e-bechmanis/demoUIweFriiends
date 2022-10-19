import useSWR from "swr"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const fetcher = (...args) => fetch(...args).then((res) => res.json()); 

// ArtworkCardDetail (components/ArtworkCard.js)
export default function ArtworkCardDetail({objectID}){
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

    if (error) return <Error statusCode={404} />

    else if (!data) return null

    else
    return(
        <>
        <Card style={{ width: '18rem' }}>
            {primaryImage && <Card.Img variant="top" src={primaryImage} />}
            <Card.Body>
                <Card.Title>{title ? title : "N/A"}</Card.Title>
                <Card.Text>
                    <strong>Date: </strong>{objectDate ? objectDate : "N/A"}
                    <strong>Classification: </strong>{classification ? classification : "N/A"}
                    <strong>Medium: </strong>{medium ? medium : "N/A"}
                    <br /><br />
                    <strong>Artist: </strong>{artistDisplayName ? <a href={artistWikidata_URL} target="_blank" rel="noreferrer" >{artistDisplayName}</a> : "N/A"}
                    <strong>Credit Line: </strong>{creditLine ? creditLine : "N/A"}
                    <strong>Dimensions: </strong>{dimensions ? dimensions : "N/A"}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref><Button variant="primary">{objectID}</Button></Link>
            </Card.Body>
        </Card>
        </>
    )
}