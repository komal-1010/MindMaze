// components/Navbar.jsx
import Link from 'next/link';
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/game">Game</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
