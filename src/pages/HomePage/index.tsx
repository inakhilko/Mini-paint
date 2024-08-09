import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getPictures } from '../../store/slices/PicturesSlice.ts';
import Header from '../../modules/Header';
import Navigation from '../../modules/Navigation';
import './HomePage.styles.scss';
import { useAuth } from '../../store/hooks/useAuth.ts';
import ImagesBlock from '../../modules/ImagesBlock';

function HomePage() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { userId } = useAuth();

  const db = getDatabase();

  useEffect(() => {
    onValue(ref(db, userId + '/pictures'), (snapshot) => {
      const data = snapshot.val();
      const imagesArrCopy = [];
      for (const key in data) {
        imagesArrCopy.unshift(data[key]);
      }
      setLoading(false);
      dispatch(getPictures(imagesArrCopy));
    });
  }, [dispatch]);

  return (
    <div className={'home-page'}>
      <Header />
      <div className={'home-page__content'}>
        <Navigation />
        <div className={'home-page__content-main'}>
          <ImagesBlock loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
