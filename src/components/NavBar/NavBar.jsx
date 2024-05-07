import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="bg-white shadow-sm p-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold">My Pets</Link>
      <div className="flex items-center">
        <span className="mr-2 font-semibold">Welcome, {user.name}!</span>
        <Link to="/" onClick={handleLogOut}>Log Out</Link>
      </div>
    </nav>
  );
}
