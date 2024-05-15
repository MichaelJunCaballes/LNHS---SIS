import { Col, Row, Card,
  
  CardText,
  
  CardTitle,} from "reactstrap";
import TopCards from "../../components/dashboard/TopCards";

const Starter = () => {
  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Registrars"
            subtitle="Registrar"
            earning="3"
            icon="bi bi-people"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Teachers"
            subtitle="Teachers"
            earning="23"
            icon="bi bi-people"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Admins"
            subtitle="Admins"
            earning="2"
            icon="bi bi-people"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="Active Student"
            subtitle="Active Student"
            earning="24"
            icon="bi bi-people"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="Inactive Student"
            subtitle="Inactive Student"
            earning="5"
            icon="bi bi-people"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="Alumni"
            subtitle="Alumni"
            earning="100"
            icon="bi bi-people"
          />
        </Col>
      </Row>
      <Row>
        <h5 className="mb-3 mt-3">Lampanusan National High School</h5>
        <Col md="6" lg="6">
          <Card body>
            <CardTitle tag="h5">Mission</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
              <div>
                <hr/>
              </div>
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="6">
          <Card body>
            <CardTitle tag="h5">Vision</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
              <div>
                <hr/>
              </div>
            </CardText>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
