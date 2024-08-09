import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const imagesArr = useSelector((state) => state.pictures.pictures);

  const openImage = (imageId) => {
    navigate('/paint/' + imageId);
  };

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
      <div className={'home-page__content-main__message'}>No images yet</div>
    );
  }

  return imagesArr.map(({ imageUrl, imageId }) => {
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
  });
}

export default ImagesBlock;
