import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
// import { Link,useNavigate } from 'react-router-dom';
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header(props) {
  const { sections, title } = props;
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        { location.state ?<>
        <div className='mx-2'>Hello: {location.state.user}</div>
        <div className='mx-2'>Role: {location.state.role} </div>
        <Button variant="outlined" className='mx-2' size="small" onClick={() => {
          navigate("/login")
        }} >
          Logout
        </Button>
        </>
        :<Button variant="outlined" size="small" onClick={() => {
          navigate("/login")
        }} >
          Sign up
        </Button>
        
}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
