import React, { useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Pagination, Skeleton, Typography } from '@mui/material';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';


const GET_POSTS = gql`
  query GetPosts($limit: Int, $offset: Int) {
    posts(limit: $limit, offset: $offset) {
      posts {
        id
        title
        content
        order
        image
      }
      totalCount
      currentPage
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
  const [currentPage, setCurrentPage] = useState(0);
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { limit: 10, offset: currentPage * 10 },
  });
  console.log(data)
  const [posts, setPosts] = useState([]);
  const [reorderPosts] = useMutation(REORDER_POSTS);
  const [init, setInit] = useState(true);
  const [totalPages, setTotalPages] = useState(0);


  const dummyImageUrl = 'https://via.placeholder.com/345';
  useEffect(() => {
    if (data && data.posts && data.posts.posts && init) {
      setPosts(data.posts.posts);
      setTotalPages(Math.ceil(data.posts.totalCount / 10));
      // setCurrentPage(data.posts.currentPage)

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
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (

    <Box
      display="flex"
      justifyContent="center"

      minHeight="100vh"
    >
      <Container>
        <Pagination count={totalPages} page={currentPage} onChange={handleChange} showFirstButton showLastButton />
        {loading || true ?
          <Grid container spacing={3} direction="column" justifyContent="center"
            alignItems="center"
          >
            {
              Array.from(new Array(3)).map((item, index) => (
                <Box key={index} mb={5} style={{ width: 800, my: 5 }}>

                  <Skeleton variant="rectangular" width={800} height={170} />



                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>

                </Box>

              ))}
          </Grid>

          :
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
                          <Card sx={{ width: 800, boxShadow: 3 }}>

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
                              width="140"
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
        }
      </Container>
    </Box>
  );
}

export default PostList;
