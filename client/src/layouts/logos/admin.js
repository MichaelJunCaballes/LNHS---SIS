import MainLogo from "../../assets/images/logos/mainlogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/admin/dashboard" >
      <img src={MainLogo} alt="Main Logo" />
    </Link>
  );
};

export default Logo;
