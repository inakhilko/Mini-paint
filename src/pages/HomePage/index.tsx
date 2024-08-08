import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getPictures } from '../../store/slices/PicturesSlice.ts';
import Header from '../../modules/Header';
import Navigation from '../../modules/Navigation';
import './HomePage.styles.scss';
import { useAuth } from '../../store/hooks/useAuth.ts';
import Loader from '../../UI/Loader';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { userId } = useAuth();

  const db = getDatabase();
  const images = ref(db, userId + '/pictures');
  const imagesArr = useSelector((state) => state.pictures.pictures);

  const openImage = (imageId) => {
    navigate('/paint/' + imageId);
  };

  useEffect(() => {
    onValue(images, (snapshot) => {
      const data = snapshot.val();
      const imagesArrCopy = [];
      for (const key in data) {
        imagesArrCopy.unshift(data[key]);
      }
      setLoading(false);
      dispatch(getPictures(imagesArrCopy));
    });
  }, [dispatch, images]);

  return (
    <div className={'home-page'}>
      <Header />
      <div className={'home-page__content'}>
        <Navigation />
        <div className={'home-page__content-main'}>
          {loading ? (
            <Loader />
          ) : imagesArr.length === 0 ? (
            <div className={'home-page__content-main__message'}>
              No images yet
            </div>
          ) : (
            imagesArr.map(({ imageUrl, imageId }) => {
              return (
                <img
                  className="home-page__content-main__image"
                  src={imageUrl}
                  alt="image"
                  key={imageId}
                  id={imageId}
                  onClick={() => openImage(imageId)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
