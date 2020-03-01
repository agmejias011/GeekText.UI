import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TopBar from '../TopBar';
import Drawer from '../Drawer';


const useStyles = makeStyles(theme => ({
  // navBar: {'top': TopBar.height}
}))

const getIcon = (iconName) => {
  switch (iconName) {
    case 'Home':
      return <HomeIcon />
    case 'My Account':
      return <AccountCircleIcon />
    case 'My Wishlists':
      return <FavoriteIcon />
    case 'My Cart':
      return <ShoppingCartIcon />
    case 'Sign Out':
      return <ExitToAppIcon />
    default:
      break
  }
  return -1
}

const MainLayout = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState()
  const classes = useStyles()
  // const [state, setState] = React.useState({
  //   left: false,
  // });

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Home', 'My Account', 'My Wishlists', 'My Cart'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>{getIcon(text)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Sign Out'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>{getIcon(text)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerIsOpen(!drawerIsOpen);
  };

  const handleToggle = () => setDrawerIsOpen(!drawerIsOpen);

  return (
      <div>
        <TopBar
          title={'Geek Text'}
          toggleDrawer={toggleDrawer}
        />
        <Drawer
          open={drawerIsOpen}
          width={200}
          itemList={sideList('left')}
          toggleDrawer={toggleDrawer}
          />
      </div>
  );
}

export default MainLayout