import { Link } from 'react-router-dom';
import './Navigation.styles.scss';
import Button from '../../UI/Button';

function Navigation({ className }) {
  const navigationLinks = [
    { link: '/', linkTitle: 'Images' },
    { link: '/paint', linkTitle: 'Create new' },
  ];
  return (
    <nav className={`navigation ${className}`}>
      <ul className={'navigation__list'}>
        {navigationLinks.map(({ link, linkTitle }) => (
          <li className={'navigation__list-item'} key={linkTitle}>
            <Button variant={'outlined'}>
              <Link to={link}>{linkTitle}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
