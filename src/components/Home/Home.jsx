import React from 'react';
import { Container, Stack, Button, Box } from '@mui/material';
import Header from "../Header/Header.jsx";
import Balance from "../Balance/Balance.jsx";
import Message from "../Message/Message.jsx";
import Board from "../Board/Board.jsx";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Header />
                <Balance />
                <div style={{padding: '50px 0'}}>
                    <Container maxWidth={'lg'}>
                        <Stack
                            style={{color: '#121212'}}
                            direction='column'
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Message />
                            <Board />
                        </Stack>
                    </Container>
                </div>
            </>
        )
    }
}

export default Home;