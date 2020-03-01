import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DrawerMUI from '@material-ui/core/Drawer';

const useStyles = makeStyles({
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Drawer(props) {
  const classes = useStyles();
  const { open, width, itemList, toggleDrawer } = props
  
  return (
    <div>
      <DrawerMUI open={open} onClose={toggleDrawer('left', false)}>
        {itemList}
      </DrawerMUI>
    </div>
  );
}
