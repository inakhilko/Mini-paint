import { Link } from 'react-router-dom';
import './Navigation.styles.scss';
import Button from '../../UI/Button';
import { navigationLinks } from './constants/navigationLinks.ts';

function Navigation() {
  return (
    <nav className={'navigation'}>
      <ul className={'navigation__list'}>
        {navigationLinks.map(({ link, linkTitle }) => (
          <li className={'navigation__list-item'} key={linkTitle}>
            <Link to={link}>
              <Button variant={'outlined'}>{linkTitle}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
