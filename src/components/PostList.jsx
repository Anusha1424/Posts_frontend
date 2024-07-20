import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container, CardActions, Button, Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialPosts = [
    {
        id: '1',
        title: 'Post 1',
        content: 'This is the content for post 1.',
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: '2',
        title: 'Post 2',
        content: 'This is the content for post 2.',
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: '4',
        title: 'Post 4',
        content: 'This is the content for post 3.',
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: '5',
        title: 'Post 5',
        content: 'This is the content for post 3.',
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: '6',
        title: 'Post 6',
        content: 'This is the content for post 3.',
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: '7',
        title: 'Post 7',
        content: 'This is the content for post 3.',
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: '8',
        title: 'Post 8',
        content: 'This is the content for post 3.',
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: '9',
        title: 'Post 9',
        content: 'This is the content for post 3.',
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: '10',
        title: 'Post 10',
        content: 'This is the content for post 3.',
        imageUrl: 'https://via.placeholder.com/150'
    },
    // Add more posts as needed
];

export const PostList = () => {
    const [posts, setPosts] = useState(initialPosts);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(posts);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setPosts(items);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Container maxWidth="lg" sx={{ mt: 4, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable-grid">
                        {(provided) => (
                            <Grid container spacing={4} {...provided.droppableProps} ref={provided.innerRef}>
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
                                                <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image={post.imageUrl}
                                                        alt={post.title}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {post.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {post.content}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
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
                    </Droppable>
                </DragDropContext>
            </Container>
        </Box>
    );
};

export default PostList;