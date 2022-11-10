import { Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";

export default function AdvancedSearch() {
  const router = useRouter();

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      q: "",
      searchBy: "title",
      geoLocation: "",
      medium: "",
    },
  });

  function submitForm(data) {
    let queryString = `${data.searchBy}=true${
      data.geoLocation && `&geoLocation=${data.geoLocation}`
    }${data.medium && `&geoLocation=${data.medium}`}&isOnView=${
      data.isOnView
    }&isHighlight=${data.isHighlight}&q=${data.q}`;

    console.log(queryString);

    setSearchHistory((current) => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
  }

  return (
    <>
      <Container>
        <Card className="p-5">
          <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Search Query</Form.Label>
                  <Form.Control
                    {...register("q", { required: true })}
                    className={errors.q && "is-invalid"}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Search By</Form.Label>
                <Form.Select {...register("searchBy")} className="mb-3">
                  <option value="title">Title</option>
                  <option value="tags">Tags</option>
                  <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Geo Location</Form.Label>
                  <Form.Control {...register("geoLocation")} />
                  <Form.Text className="text-muted">
                    Case Sensitive String (ie &quot;Europe&quot;,
                    &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;,
                    &quot;New York&quot;, etc.), with multiple values separated
                    by the | operator
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Medium</Form.Label>
                  <Form.Control {...register("medium")} />
                  <Form.Text className="text-muted">
                    Case Sensitive String (ie: &quot;Ceramics&quot;,
                    &quot;Furniture&quot;, &quot;Paintings&quot;,
                    &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with
                    multiple values separated by the | operator
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Highlighted"
                  {...register("isHighlight")}
                />
                <Form.Check
                  type="checkbox"
                  label="Currently on View"
                  {...register("isOnView")}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </>
  );
}
