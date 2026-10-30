import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="PlayPort home">
      <img
        src="/playport-logo.svg"
        alt="PlayPort"
        className="logo__svg"
        width="148"
        height="45"
        draggable="false"
      />
    </Link>
  );
}
