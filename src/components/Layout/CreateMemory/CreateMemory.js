import React from 'react';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';

import './createMemory.css';
import CreateMemoryForm from './CreateMemoryForm';

function CreateMemory({open, setOpen, memories,setMemories,fetchMemories}) {
    
    return (
        <>
            <Container minwidth="sm" className='com'>
                <Paper className='paper' elevation={3}>
                    <CreateMemoryForm memories = {memories} setMemories={setMemories} fetchMemories={fetchMemories}/>
                </Paper>
            </Container>
        </>
    )
}

export default CreateMemory;