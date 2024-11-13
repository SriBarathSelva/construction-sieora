import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <div>
        <div>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <div><h2 className="login">Login</h2></div>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <div><h2 className="register">Register</h2></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
