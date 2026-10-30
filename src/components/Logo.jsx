import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="PlayGrid home">
      <img
        src="/playgrid-logo.svg"
        alt="PlayGrid"
        className="logo__svg"
        width="160"
        height="46"
        draggable="false"
      />
    </Link>
  );
}
