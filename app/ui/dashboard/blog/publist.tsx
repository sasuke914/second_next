import { Box, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from '../table/Tables';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebaseConnection';
import { GridColDef } from '@mui/x-data-grid';
import { deleteObject, getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface PublistProps {
    setRoute: React.Dispatch<React.SetStateAction<number>>;
}

interface Blog {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    imageUrl?: string;
}

const Publist: React.FC<PublistProps> = ({ setRoute }) => {
    const [bloglist, setBloglist] = useState<Blog[]>([]);
    const [open, setOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
    const [formData, setFormData] = useState<Partial<Blog>>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to hold the selected file

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
                        updatedAt: doc.data().updatedAt || '',
                        imageUrl: doc.data().imageUrl || '' // Retrieve image URL
                    }));
                    setBloglist(blogsData);
                } else {
                    console.log("No blogs found!");
                }
            } catch (e) {
                console.error("Error getting blogs: ", e);
            }
        };

        fetchBlogs(); // Ensure to call the async function
    }, []);

    const handleDelete = async (id: string) => {
        try {
            // Get the blog to delete
            const blogToDelete = bloglist.find(blog => blog.id === id);
            if (blogToDelete) {
                // Delete file from Firebase Storage
                if (blogToDelete.imageUrl) {
                    const storage = getStorage();
                    const imageRef = ref(storage, blogToDelete.imageUrl); // imageUrl should be the path to the file
                    await deleteObject(imageRef);
                    console.log("File deleted:", blogToDelete.imageUrl);
                }

                // Delete document from Firestore
                await deleteDoc(doc(db, "blogs", id));
                setBloglist(bloglist.filter(blog => blog.id !== id)); // Remove the deleted blog from the state
                console.log("Blog deleted:", id);
            }
        } catch (e) {
            console.error("Error deleting blog or file: ", e);
        }
    }

    const handleEdit = (blog: Blog) => {
        setCurrentBlog(blog);
        setFormData({ title: blog.title, content: blog.content, updatedAt: new Date().toISOString() });
        setSelectedFile(null); // Reset file selection
        setOpen(true);
    };

    const handleSave = async () => {
        if (currentBlog) {
            try {
                let newImageUrl = currentBlog.imageUrl;

                if (selectedFile) {
                    // Handle file upload
                    const storage = getStorage();
                    const newFileRef = ref(storage, `images/${Date.now()}_${selectedFile.name}`);
                    await uploadBytes(newFileRef, selectedFile);
                    newImageUrl = await getDownloadURL(newFileRef);

                    // Optionally delete old file
                    if (currentBlog.imageUrl) {
                        const oldFileRef = ref(storage, currentBlog.imageUrl);
                        await deleteObject(oldFileRef);
                        console.log("Old file deleted:", currentBlog.imageUrl);
                    }
                }

                // Update Firestore document
                const blogRef = doc(db, "blogs", currentBlog.id);
                await updateDoc(blogRef, {
                    ...formData,
                    imageUrl: newImageUrl, // Update the file URL in Firestore
                    updatedAt: new Date().toISOString()
                });

                setBloglist(bloglist.map(blog =>
                    blog.id === currentBlog.id ? { ...blog, ...formData, imageUrl: newImageUrl } : blog
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
            field: 'imageUrl',
            headerName: 'Image',
            flex: 2,
            renderCell: (params) => (
                params.row.imageUrl ? (
                    <img src={params.row.imageUrl} alt={params.row.title} style={{ width: '100px', height: 'auto' }} />
                ) : (
                    <Typography>No Image</Typography>
                )
            ),
        },
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
                <Typography variant='h4' color='white' align='center'>Blog Data</Typography>
                <Button color='primary' sx={{ my: 1 }} variant='contained' onClick={() => { setRoute(1) }}>New Blog</Button>
                <DataTable columns={bloglistColumns} data={bloglist} />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Blog</DialogTitle>
                <DialogContent>
                    {currentBlog?.imageUrl && (
                        <img src={currentBlog.imageUrl} alt="Blog Image" style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
                    )}
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
                    <input
                        type="file"
                        onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
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
