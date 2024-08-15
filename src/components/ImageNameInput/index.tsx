import { ComponentProps } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import { database } from '../../firebase.ts';
import { useAuth } from '../../store/hooks/useAuth.ts';
import { useParams } from 'react-router-dom';

interface ImageNameInputProps extends ComponentProps<'input'> {
  register: UseFormRegister<FieldValues>;
}

function ImageNameInput(props: ImageNameInputProps) {
  const { register, ...otherProps } = props;

  const { userId } = useAuth();
  const { imageId } = useParams();

  const validateForName = async (value: string) => {
    const picturesRef = ref(database, userId + '/pictures');

    const nameQuery = query(picturesRef, orderByChild('name'), equalTo(value));

    try {
      const snapshot = await get(nameQuery);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data[imageId] ? true : 'Name already exists';
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const validateForSpaces = (value: string) => {
    return (
      value.trim().length === value.length ||
      'Title cannot begin or end with spaces'
    );
  };

  return (
    <input
      {...register('name', {
        required: 'This field is required',
        minLength: 1,
        maxLength: 20,
        validate: {
          validateForSpaces,
          validateForName,
        },
      })}
      className="drawing-form__input"
      placeholder="Image name"
      {...otherProps}
    />
  );
}

export default ImageNameInput;
