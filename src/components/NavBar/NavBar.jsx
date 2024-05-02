import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/pets">My Pets</Link>
      &nbsp; | &nbsp;
      <Link to="/cats/new">New Pets</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link to="/cats" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}