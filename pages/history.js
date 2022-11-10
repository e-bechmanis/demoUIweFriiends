import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Button } from "react-bootstrap";
import styles from "../styles/History.module.css";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    router.push(`${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  };

  if (parsedHistory.length === 0) {
    return (
      <Container>
        <Card className="text-center">
          <Card.Body>
            <h4 className="text-danger">Nothing Here</h4>
            Try searching for some artwork.
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    return (
      <>
        <Container>
          <ListGroup>
            {parsedHistory.map((historyItem, index) => (
              <>
                <ListGroup.Item
                  className={styles.historyListItem}
                  onClick={(e) => historyClicked(e, index)}
                >
                  {Object.keys(historyItem).map((key) => (
                    <>
                      {key}: <strong>{historyItem[key]}</strong>&nbsp;
                    </>
                  ))}
                  <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    onClick={(e) => removeHistoryClicked(e, index)}
                  >
                    &times;
                  </Button>
                </ListGroup.Item>
              </>
            ))}
          </ListGroup>
        </Container>
      </>
    );
  }
}
