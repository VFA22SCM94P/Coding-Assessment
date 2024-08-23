import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/system";
import Button from "@mui/material/Button";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TextField from "@mui/material/TextField";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Divider from '@mui/material/Divider';
import { CreatePost } from "../services/api";
import { Link, useNavigate, useLocation } from "react-router-dom";

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};
const childstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const createstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// function ChildModal(props) {
//   const [open, setOpen] = React.useState(false);
//   const [replyPost] = props;
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     var commentData = {
//       name: data.get('name'),
//       reply: data.get('comment'),
//     }

//   };

// return (

// );
// }

export default function Testimonials(props) {
  const theme = useTheme();
  const location = useLocation();
  const [postModal, setPostModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState();
  const [createModal,setCreateModal] = React.useState(false);
  const handleCreateModalOpen = () => {
    setCreateModal(true);
  }
  const handleCreateModalClose = () => {
    setCreateModal(false);
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreatePost = (event) => {
    event.preventDefault();
    var postIdIndex = 0;
    var alposts = JSON.parse(localStorage.getItem("posts"))["posts"]
    for (let index = 0; index < alposts.length; index++) {
      postIdIndex = postIdIndex + alposts[index][Object.keys(alposts[index])[0]].length
    }
console.log(postIdIndex);
    
    const data = new FormData(event.currentTarget);
    const postData = {
      Content : data.get("content"),
      author : data.get("author"),
      Title : data.get("title"),
      comments : [],
      postid : postIdIndex + 1
    }
     const postDetail = {
      content : data.get("content"),
      authorid : data.get("author"),
      title : data.get("title"),
     }
     CreatePost(postDetail).then((data) => {
      console.log("data",data);
      
     })

    if(localStorage.getItem("posts"))
    {
      const createTo = JSON.parse(localStorage.getItem("posts"))["posts"];
      var createIndex = createTo.findIndex(
        (v) => Object.keys(v)[0] === props.category
      );
      createTo[createIndex][props.category].push(postData);
      localStorage.setItem(
        "posts",
        JSON.stringify({
          posts: createTo,
        })
      );
      window.location.reload();
    }
  }

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var commentData = {
      name: data.get("name"),
      reply: data.get("comment"),
    };
    const deleteFrom = JSON.parse(localStorage.getItem("posts"))["posts"];
    var deleteIndex = deleteFrom.findIndex(
      (v) => Object.keys(v)[0] === props.category
    );
    var commentIndex = deleteFrom[deleteIndex][props.category].findIndex(
      (v) => v.postid === currentPost.postid
    );
    deleteFrom[deleteIndex][props.category][commentIndex]["comments"].push(
      commentData
    );
    setCurrentPost(deleteFrom[deleteIndex][props.category][commentIndex]);
    localStorage.setItem(
      "posts",
      JSON.stringify({
        posts: deleteFrom,
      })
    );
    handleClose();
  };

  const handlePostOpen = () => {
    setPostModal(true);
  };
  const handlePostClose = () => {
    setPostModal(false);
    window.location.reload();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container
      id={props.category}
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          {props.category}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {props.posts.map((psts, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {psts.Content}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  pr: 2,
                }}
              >
                <CardHeader
                  // avatar={testimonial.avatar}
                  title={"Title: " + psts.Title}
                  subheader={"author: " + psts.author}
                />

                {/* <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                /> */}
                <Button
                  variant="text"
                  onClick={() => {
                    setCurrentPost(psts);
                    handlePostOpen();
                  }}
                >
                  <VisibilityOutlinedIcon />
                </Button>
                <Modal
                  open={postModal}
                  onClose={handlePostClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <>
                    <Box sx={style}>
                      <Box height={500}>
                        <Typography
                          id="modal-modal-title"
                          variant="h4"
                          component="h2"
                        >
                          Title: {currentPost?.Title}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Author: {currentPost?.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {currentPost?.Content}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Comments:
                        </Typography>
                        {currentPost?.comments.map((comment) => {
                          return (
                            <>
                              <Box className="m-2">
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {comment?.name} : {comment?.reply}
                                </Typography>
                              </Box>
                            </>
                          );
                        })}
                      </Box>

                      <Box className="d-flex justify-content-end">
                        {localStorage.getItem("currentUser") ? (
                          <>
                            <React.Fragment>
                              <Button onClick={handleOpen}>Reply</Button>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                              >
                                <Box
                                  component="form"
                                  sx={childstyle}
                                  onSubmit={handleSubmit}
                                >
                                  <Box height={300}>
                                    <TextField
                                      fullWidth
                                      id="name"
                                      label="Name"
                                      name="name"
                                      variant="outlined"
                                    />
                                    <TextField
                                      id="comment"
                                      label="Comment"
                                      name="comment"
                                      margin="normal"
                                      fullWidth
                                      multiline
                                      rows={7}
                                      placeholder="Enter Your Comment here"
                                    />
                                  </Box>
                                  <Box className="d-flex justify-content-end">
                                    <Button id="commentSubmit" type="submit">Submit</Button>
                                  </Box>
                                </Box>
                              </Modal>
                            </React.Fragment>
                            {JSON.parse(localStorage.getItem("currentUser"))
                              .role === "Moderator" ? (
                              <Button
                                onClick={(event) => {
                                  const deleteFrom = JSON.parse(
                                    localStorage.getItem("posts")
                                  )["posts"];
                                  var deleteIndex = deleteFrom.findIndex(
                                    (v) => Object.keys(v)[0] === props.category
                                  );
                                  deleteFrom[deleteIndex][
                                    props.category
                                  ].splice(
                                    deleteFrom[deleteIndex][
                                      props.category
                                    ].findIndex(
                                      (v) => v.postid === currentPost.postid
                                    ),
                                    1
                                  );
                                  localStorage.setItem(
                                    "posts",
                                    JSON.stringify({
                                      posts: deleteFrom,
                                    })
                                  );
                                  window.location.reload();
                                }}
                              >
                                Delete
                              </Button>
                            ) : null}
                          </>
                        ) : null}
                      </Box>
                    </Box>
                  </>
                </Modal>
              </Box>
            </Card>
          </Grid>
        ))}
        {location.state ? location.state.role == 'blogger' ? (
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
        <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexGrow: 1,
                // p: 1,
              }}
              className="ms-2 h-334"
            > 
            <Button className="d-flex h-100" onClick={handleCreateModalOpen}><BorderColorOutlinedIcon/>Create Post</Button>
          </Card>
    
                              <Modal
                                open={createModal}
                                onClose={handleCreateModalClose}
                                id="createModal"
                              >
                                <Box
                                  component="form"
                                  id="createModalBox"
                                  sx={createstyle}
                                  onSubmit={handleCreatePost}
                                >
                                  <Box height={500}>
                                  <Typography
                          id="modal-modal-title"
                          variant="h4"
                          component="h2"
                        >
                          Create Post
                        </Typography>

                        <Divider variant="fullWidth" orientation="horizontal"  > </Divider>
                                      
                                    <TextField
                                      fullWidth
                                      id="title"
                                      label="Title"
                                      name="title"
                                      variant="outlined"
                                      margin="normal"
                                    />
                                    <TextField
                                    margin="normal"
                                      fullWidth
                                      id="author"
                                      label="Author"
                                      name="author"
                                      variant="outlined"
                                    />
                                    <TextField
                                      id="content"
                                      label="Content"
                                      name="content"
                                      margin="normal"
                                      fullWidth
                                      multiline
                                      rows={7}
                                      placeholder="Enter Your Content"
                                    />
                                  </Box>
                                  <Box className="d-flex justify-content-end">
                                    <Button id="createmodalSubmit" type="submit" >Submit</Button>
                                  </Box>
                                </Box>
                              </Modal>
          </Grid>) : null : null}
      </Grid>
    </Container>
  );
}
