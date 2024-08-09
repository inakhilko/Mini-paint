import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../UI/Loader';

interface ImagesBlockProps {
  loading: boolean;
}

function ImagesBlock({ loading }: ImagesBlockProps) {
  const navigate = useNavigate();

  const imagesArr = useSelector((state) => state.pictures.pictures);

  const openImage = (imageId) => {
    navigate('/paint/' + imageId);
  };

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
