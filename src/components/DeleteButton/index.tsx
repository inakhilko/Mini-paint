import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import Button from '../../UI/Button';
import { ref, remove } from 'firebase/database';
import { database } from '../../firebase.ts';
import { useAuth } from '../../store/hooks/useAuth.ts';

function DeleteButton() {
  const { imageId } = useParams();
  const { userId } = useAuth();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDeleteButtonClick = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onDelete = () => {
    setIsModalOpen(false);
    remove(ref(database, userId + '/pictures/' + imageId));
    navigate('/home');
  };

  return (
    <>
      <Button
        variant="outlined"
        id="delete"
        onClick={onDeleteButtonClick}
        disabled={!imageId}
      >
        <DeleteOutlineIcon />
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this picture?
        </DialogTitle>
        <DialogActions>
          <Button variant="filled" onClick={onDelete}>
            Yes
          </Button>
          <Button variant="filled" onClick={onClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton;
