import { useRouter } from 'next/router'
import ArtworkCardDetail from '../components/ArtworkCard'

//ArtworkById (pages/artwork/[objectID].js)
export default function ArtworkById(){
    const router = useRouter()
    const { objectID } = router.query

    return(
        <>
        <Row>
            <Col>
            <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
        </>
    )
}