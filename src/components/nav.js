import { Link } from 'react-router-dom';
import "../styles/nav.css";
import { handleLogout } from '../utils/utils';


function Nav(props) {

  let access_token = localStorage.getItem("access_token") 

  return (
    <div>
      <header>
        <nav className="navbar">
          <ul className="nav-ul">
            {access_token?(<>
              <li><Link to="/">Dashboard</Link></li>
              <li onClick={handleLogout}><Link to="/login">Logout</Link></li>
            </>
            ):null}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
