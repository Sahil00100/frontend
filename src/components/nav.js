import { Link } from 'react-router-dom';
import "../styles/nav.css";
import { handleLogout } from '../utils/utils';


function Nav() {

  let access_token = localStorage.getItem("access_token") 

  return (
    <div>
      <header>
        <nav className="navbar">
          <ul className="nav-ul">
            <li><Link to="/">Dashboard</Link></li>
            {access_token?(
            <li onClick={handleLogout}><Link to="/login">Logout</Link></li>
            ):null}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
