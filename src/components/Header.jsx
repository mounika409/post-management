import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#eee" }}>
      <Link to="/" style={{ marginRight: "15px" }}>
        Home
      </Link>

      <Link to="/posts/new">
        Create Post
      </Link>
    </nav>
  );
}
