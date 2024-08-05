import Header from '../../modules/Header';
import Navigation from '../../modules/Navigation';
import './HomePage.styles.scss';

function HomePage() {
  return (
    <div className={'home-page'}>
      <Header />
      <div className={'home-page__content'}>
        <Navigation className={'home-page__navigation'} />
        <div className={'home-page__content-main'}></div>
      </div>
    </div>
  );
}

export default HomePage;
