import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import Testimonials from './Testimonials'; 
import { Title } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from "react-router-dom";


function Main(props) {
  const { posts, title } = props;

  
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
      id = "midgrid"
      minWidth={1000}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {
        JSON.parse(localStorage.getItem("posts"))['posts'].map((data) => {
          for (const key in data) {
               return <Testimonials category={key} posts={data[key]}/> 
                         
          }
        })
      }
          
        
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
