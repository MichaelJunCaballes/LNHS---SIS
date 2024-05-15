import MainLogo from "../../assets/images/logos/mainlogo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/registrar/dashboard">
      <img src={MainLogo} alt="Main Logo" />
    </Link>
  );
};

export default Logo;
