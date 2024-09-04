'use client';

import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import Publist from "@/app/ui/dashboard/blog/publist";
import NewPub from "@/app/ui/dashboard/blog/newpub";

const Page: React.FC = () => {
    const [route, setRoute] = useState<number>(0);

    return (
        <Container>
            <div style={{ textAlign: 'center' }}>
                <Button color="success" sx={{ p: 2, my: 2 }}>
                    <Typography variant="h2" align="center">
                        Welcome to the blog page!
                    </Typography>
                </Button>
            </div>
            {
                route === 0 ? <Publist setRoute={setRoute} /> : <NewPub setRoute={setRoute} />
            }
        </Container>
    );
};

export default Page;
