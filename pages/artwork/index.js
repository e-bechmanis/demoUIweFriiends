import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from "swr"
import Card from 'react-bootstrap/Card'

//Artwork (pages/artwork/index.js)

const PER_PAGE = 12

//const fetcher = (...args) => fetch(...args).then((res) => res.json()); 

export default function Artwork(){
    const [artworkList, setArtworkList] = useState()
    const [page, setPage] = useState(1)

    const router = useRouter()
    let finalQuery = router.asPath.split('?')[1]

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

    useEffect(() => {
        if (data) {
        const results = []
        for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
            const chunk = data?.objectIDs.slice(i, i + PER_PAGE)
            results.push(chunk)
           }
           setArtworkList(results)
           setPage(1)
        }
    }, [data])

    if (error) return <Error statusCode={404} />

    function previousPage(e){
        setPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage)
    }
      
    function nextPage(e){
        setPage(prevPage => page < artworkList.length ? prevPage + 1 : prevPage)
    }
    
    if (artworkList){
        return (
        <>
        <Row className="gy-4">
            {artworkList.map((artItem) => (
                <Col lg={3} key={objectID}><ArtworkCard objectID={objectID} /></Col>
            ))}
        </Row>
        <br /> 
        <Row>
            <Col>
            <Pagination>
                <Pagination.Prev className="accordion-header" onClick={previousPage}/>
                <Pagination.Item className="accordion-header">{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}/>
            </Pagination>
            </Col>
        </Row>
        </>
        )
    }

    if (artworkList.length == 0){
        return (
        <Card>
        <Card.Body> 
            <h4>Nothing Here</h4>
            Try searching for something else
        </Card.Body>
        </Card>
        )
    }

    return null
}