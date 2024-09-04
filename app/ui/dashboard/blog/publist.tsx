'use client';

import { Box, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from '../table/Tables';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebaseConnection';
import { GridColDef } from '@mui/x-data-grid';

interface PublistProps {
    setRoute: React.Dispatch<React.SetStateAction<number>>;
}

interface Blog {
    id: string; // Firestore IDs are strings
    title: string;
    content: string;
    createdAt: string; // Changed to string to handle display
    updatedAt: string;
}

const Publist: React.FC<PublistProps> = ({ setRoute }) => {
    const [bloglist, setBloglist] = useState<Blog[]>([]);
    const [open, setOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
    const [formData, setFormData] = useState<Partial<Blog>>({});

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "blogs"));
                if (!querySnapshot.empty) {
                    const blogsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        title: doc.data().title || '',
                        content: doc.data().content || '',
                        createdAt: doc.data().createdAt || '',
                        updatedAt: doc.data().updatedAt || ''
                    }));
                    setBloglist(blogsData);
                } else {
                    console.log("No blogs found!");
                }
            } catch (e) {
                console.error("Error getting blogs: ", e);
            }
        }

        fetchBlogs(); // Ensure to call the async function
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "blogs", id));
            setBloglist(bloglist.filter(blog => blog.id !== id)); // Remove the deleted blog from the state
            console.log("Blog deleted:", id);
        } catch (e) {
            console.error("Error deleting blog: ", e);
        }
    }

    const handleEdit = (blog: Blog) => {
        setCurrentBlog(blog);
        setFormData({ title: blog.title, content: blog.content, updatedAt: new Date().toISOString() });
        setOpen(true);
    };

    const handleSave = async () => {
        if (currentBlog) {
            try {
                const blogRef = doc(db, "blogs", currentBlog.id);
                await updateDoc(blogRef, formData);
                setBloglist(bloglist.map(blog =>
                    blog.id === currentBlog.id ? { ...blog, ...formData } : blog
                ));
                setOpen(false);
                console.log("Blog updated:", currentBlog.id);
            } catch (e) {
                console.error("Error updating blog: ", e);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const bloglistColumns: GridColDef[] = [
        { field: 'title', headerName: 'Title', flex: 3 },
        { field: 'content', headerName: 'Content', flex: 2 },
        { field: 'createdAt', headerName: 'Date', flex: 2 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 2,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(params.row)}
                        style={{ margin: '5px' }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Box sx={{ pt: 3, pb: 5 }}>
                <Typography variant='h4' align='center'>Blog Data</Typography>
                <Button color='primary' sx={{ my: 1 }} variant='contained' onClick={() => { setRoute(1) }}>New Blog</Button>
                <DataTable columns={bloglistColumns} data={bloglist} />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Blog</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="standard"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        value={formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Publist;
