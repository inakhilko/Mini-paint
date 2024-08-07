import Header from '../../modules/Header';
import Navigation from '../../modules/Navigation';
import './HomePage.styles.scss';
// import firebase from 'firebase/compat';
// import firestore = firebase.firestore;

function HomePage() {
  // const [images, loading] = useCollectionData(firestore);
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
