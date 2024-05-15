import { Col, Row, Card,
  
  CardText,
  
  CardTitle,} from "reactstrap";
import TopCards from "../../components/dashboard/TopCards";

const Admin = () => {
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
        <h5 className="mb-3 mt-3">Lampanusan National High School</h5>
        <Col md="6" lg="6">
          <Card body>
            <CardTitle tag="h4">DepEd Mission</CardTitle>
            <CardText>
            To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education where:
            Students learn in a child-friendly, gender-sensitive, safe, and motivating environment.
            Teachers facilitate learning and constantly nurture every learner.
            Administrators and staff, as stewards of the institution, ensure an enabling and supportive environment for effective learning to happen.
            Family, community, and other stakeholders are actively engaged and share responsibility for developing life-long learners.
              <div>
                <hr/>
              </div>
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="6">
          <Card body>
            <CardTitle tag="h4">DepEd Vision</CardTitle>
            <CardText>
            We dream of Filipinos
            who passionately love their country
            and whose values and competencies
            enable them to realize their full potential
            and contribute meaningfully to building the nation.
            As a learner-centered public institution,
            the Department of Education
            continuously improves itself
            to better serve its stakeholders.
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

export default Admin;
