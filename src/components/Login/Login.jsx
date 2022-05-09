import React from 'react';
import { withRouter } from 'react-router-dom'
import { Container, Stack, TextField, Button } from '@mui/material';
import {connect} from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        }
        this.creds = {
            username: 'Admin',
            password: '123456'
        }
    }

    checkForm() {
        if (this.state.username === this.creds.username && this.state.password === this.creds.password) {
            this.setState({ error: false });
            this.props.setIsAuth(true);
            localStorage.setItem('isAuth', true);
            this.props.history.push('/')
        } else {
            this.setState({ error: true })
        }
    }

    render() {
        return (
            <Container maxWidth={'sm'}>
                    <Stack
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        style={{height: '100vh'}}
                    >
                        <TextField
                            value={this.state.username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                            id="username"
                            label="Username"
                            variant="standard"
                            style={{width: '100%'}}
                        />
                        <TextField
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                            id="password"
                            label="Password"
                            type={"password"}
                            variant="standard"
                            style={{width: '100%'}}
                        />
                        {this.state.error && <p style={{color: 'red'}}>Имя пользователя или пароль введены не верно</p>}
                        <Button variant="contained" onClick={() => this.checkForm()}>Sign In</Button>
                    </Stack>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsAuth: (isAuth) => {
            dispatch({ type: 'SET_IS_AUTH', isAuth })
        }
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));