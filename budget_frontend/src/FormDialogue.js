import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function FormDialogDeposit(props) {
  const [open, setOpen] = React.useState(false);
  const [amountDeposit, setAmountDeposit] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deposit = () => {
    handleClose();

    props.setUserInfo({
      ...props.userInfo,
      deposits: parseInt(props.userInfo.deposits) + parseInt(amountDeposit)
    });

    fetch(`http://127.0.0.1:8000/user_info_put/${JSON.parse(localStorage.getItem("user")).id}`, {
            method: 'PUT',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            },

            body: JSON.stringify({
                deposit: 1,
                amountDeposit: parseInt(amountDeposit),
            })
        })
        .then(res => console.log(res));


  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Deposit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deposit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount deposit here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Deposit"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setAmountDeposit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deposit}>Deposit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function FormDialogSaving(props) {
  const [open, setOpen] = React.useState(false);
  const [amountSaving, setAmountSaving] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const save = () => {
    handleClose();

    props.setUserInfo({
      ...props.userInfo,
      savings: parseInt(props.userInfo.savings) + parseInt(amountSaving),
      deposits: parseInt(props.userInfo.deposits) - parseInt(amountSaving),
    });

    fetch(`http://127.0.0.1:8000/user_info_put/${JSON.parse(localStorage.getItem("user")).id}`, {
            method: 'PUT',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            },

            body: JSON.stringify({
                saving: 1,
                amountSaving: parseInt(amountSaving),
            })
        })
        .then(res => console.log(res));


  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Saving
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Saving</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount that you want to save
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Saving"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setAmountSaving(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={save}>Saving</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
