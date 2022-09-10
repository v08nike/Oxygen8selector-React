import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  isOneRow: PropTypes.bool,
};

export default function ConfirmDialog({ isOpen, onClose, onConfirm, isOneRow }) {
  const text = isOneRow
    ? 'Are you sure you want to delete this row data?'
    : 'Are you sure you want to delete the selected data?';
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{text}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
