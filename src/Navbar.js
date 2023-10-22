import "./navbar.css";

const Navbar = () => {
  return (
    <>
    <ul className="list-navbar">
	<li className="list-item">
    <a class="shameless-plug" href="/">
        Home
    </a>
    </li>
	<li className="list-item">
    <a class="shameless-plug" href="/upload-image">
    UPLOAD
    </a>
    </li>
	<li className="list-item">
    <a class="shameless-plug" href="/singup">
    REGISTER
    </a>
    </li>
    <a class="shameless-plug" href="/login">
	<li className="list-item">
    LOGIN 
    </li>
    </a>
</ul>

  </>
  )
}

export default Navbar