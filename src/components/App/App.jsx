import React from 'react';
import { Provider, connect } from "react-redux";
import { store } from "../../store";
import {
    withRouter,
    Route
} from "react-router-dom";
import '../../style.scss';
import Home from "../Home/Home.jsx";
import Login from "../Login/Login.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (localStorage.getItem('isAuth') === 'true') {
            this.props.setIsAuth(true);
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
            </>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));