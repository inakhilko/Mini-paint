import Header from '../../modules/Header';
import Navigation from '../../modules/Navigation';
import ImagesBlock from '../../modules/ImagesBlock';
import './HomePage.styles.scss';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <div className="home-page__content">
        <Navigation />
        <div className="home-page__content-main">
          <ImagesBlock />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
