import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Container, Stack, Button, Box } from '@mui/material';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    signButtonHandler() {
        this.props.setIsAuth(!this.props.isAuth);
        localStorage.setItem('isAuth', !this.props.isAuth);
        this.props.history.push('/login');
        if (this.props.isAuth) {
            this.props.setGameStatus('waiting');
            // this.props.zeroingBalance();
            // this.props.setBetSum(0)
        }
    }

    render() {
        return (
            <div style={{backgroundColor: '#202938', padding: '15px 0'}}>
                <Container maxWidth='lg'>
                    <Stack
                        direction='row'
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box sx={{p: 2, backgroundColor: '#111828', borderRadius: '5px', color: '#e1e2e4'}}>Bridge</Box>
                        <Button
                            onClick={() => this.signButtonHandler()}
                            variant={this.props.isAuth ? "contained" : 'outlined'}
                        >{this.props.isAuth ? 'Sign Out' : 'Sign In'}</Button>
                    </Stack>
                </Container>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsAuth: (isAuth) => {
            dispatch({ type: 'SET_IS_AUTH', isAuth })
        },
        setGameStatus: (gameStatus) => {
            dispatch({ type: 'SET_GAME_STATUS', gameStatus })
        },
        // zeroingBalance: () => {
        //     dispatch({ type: 'ZEROING_BALANCE' })
        // },
        // setBetSum: (betSum) => {
        //     dispatch({ type: 'SET_BET_SUM', betSum })
        // },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));