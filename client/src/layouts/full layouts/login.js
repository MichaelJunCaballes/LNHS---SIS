import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

const LoginLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        <Container className="p-4 wrapper" fluid>
            <Outlet />
        </Container>
      </div>
    </main>
  )
}

export default LoginLayout;