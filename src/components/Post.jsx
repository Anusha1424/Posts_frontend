import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      order
    }
  }
`;

function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const PostCard = ({ title, content, imageUrl }) => {
    return (
      <Card>
        <CardActionArea>
          {/* <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt={title}
          /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  return (

    <Box
      display="flex"
      justifyContent="center"

      minHeight="100vh"
    >
      <Container>
        <Grid container spacing={4}>
          {data.posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                {/* <CardMedia
                component="img"
                height="140"
                image={post.imageUrl}
                alt={post.title}
              /> */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                  <Button size="small" color="primary">Share</Button>
                  <Button size="small" color="primary">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default PostList;
