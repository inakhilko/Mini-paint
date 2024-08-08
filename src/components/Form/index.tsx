import { memo, useState } from 'react';
import './Form.styles.scss';
import Button from '../../UI/Button';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

const Form = memo(({ title, handleClick }: FormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="form">
      <input
        className={'form__input'}
        type={'email'}
        value={email}
        placeholder={'email'}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className={'form__input'}
        type={'password'}
        value={password}
        placeholder={'password'}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button variant={'filled'} onClick={() => handleClick(email, password)}>
        {title}
      </Button>
    </div>
  );
});

export default Form;
