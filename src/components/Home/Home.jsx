import React from 'react';
import Header from "../Header/Header.jsx";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     console.log(this.props);
    //
    //     if (localStorage.getItem('isAuth') === 'false') {
    //         console.log(false)
    //         localStorage.setItem('isAuth', 'false');
    //         this.props.history.push('/login')
    //     }
    // }

    render() {
        return (
            <>
                <Header />
                <h2>Main</h2>
            </>
        )
    }
}

export default Home;