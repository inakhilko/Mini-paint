import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../UI/Loader';
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/hooks/useAuth.ts';
import { onValue, ref } from 'firebase/database';
import { database } from '../../firebase.ts';
import { getPictures } from '../../store/slices/PicturesSlice.ts';

function ImagesBlock() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { userId } = useAuth();

  const imagesArr = useSelector((state) => state.pictures.pictures);

  useEffect(() => {
    onValue(ref(database, userId + '/pictures'), (snapshot) => {
      const data = snapshot.val();
      const imagesArrCopy = [];
      for (const key in data) {
        imagesArrCopy.unshift(data[key]);
      }
      setLoading(false);
      dispatch(getPictures(imagesArrCopy));
    });
  }, [dispatch, userId]);

  if (loading) {
    return <Loader />;
  }

  if (!imagesArr.length) {
    return (
      <div className="home-page__content-main__message">No images yet</div>
    );
  }

  return imagesArr.map(({ imageUrl, imageId }) => {
    return (
      <Link
        to={`/paint/${imageId}`}
        key={imageId}
        className="home-page__content-main__link"
      >
        <img
          className="home-page__content-main__link-image"
          src={imageUrl}
          alt="image"
          id={imageId}
        />
      </Link>
    );
  });
}

export default ImagesBlock;
