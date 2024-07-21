import React, { useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      order
      image
    }
  }
`;

const REORDER_POSTS = gql`
  mutation ReorderPosts($ids: [ID!]!) {
    reorderPosts(ids: $ids) {
      id
      title
      order
    }
  }
`;


function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [posts, setPosts] = useState([]);
  const [reorderPosts] = useMutation(REORDER_POSTS);
  const [init, setInit] = useState(true);
  const dummyImageUrl = 'https://via.placeholder.com/345';
  useEffect(() => {
    if (data && data.posts && init) {
      setPosts(data.posts);
      setInit(false);
    }
  }, [data, init])


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(posts);

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const ids = items.map(item => item.id);
    reorderPosts({ variables: { ids } })
      .then(response => {
        console.log('Posts reordered:', response.data.reorderPosts);
      })
      .catch(error => console.error('Error reordering posts:', error));
    setPosts(items);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (

    <Box
      display="flex"
      justifyContent="center"

      minHeight="100vh"
    >
      <Container>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <StrictModeDroppable droppableId="droppable-grid">
            {(provided) => (
              <Grid container spacing={3} {...provided.droppableProps} direction="column" ref={provided.innerRef} justifyContent="center"
                alignItems="center"
              >
                {posts.map((post, index) => (
                  <Draggable key={post.id} draggableId={post.id} index={index}>
                    {(provided) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card sx={{ maxWidth: 800, boxShadow: 3 }}>

                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {post.content}
                            </Typography>
                          </CardContent>
                          <CardMedia
                            component="img"
                            height="240"
                            image={post.image || dummyImageUrl}
                            alt={post.title}
                          />
                          <CardActions style={{ justifyContent: "center" }}>
                            <Button size="small" color="primary">Share</Button>
                            <Button size="small" color="primary">Learn More</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </Container>
    </Box>
  );
}

export default PostList;
