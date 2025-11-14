import './styles/global.css';
import './styles/home.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'MindMaze',
  description: 'Sharpen your mind, one maze at a time',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
