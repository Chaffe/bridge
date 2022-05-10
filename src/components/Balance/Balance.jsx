import React from 'react';
import { Stack } from '@mui/material';
import { connect } from "react-redux";

class Balance extends React.Component {
    render() {
        return (
            <Stack
                style={{padding: '15px 0', backgroundColor: '#fff', color: '#121212'}}
                direction='column'
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <h2>Balance: {this.props.balance}$</h2>
            </Stack>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        balance: state.balance
    }
}

export default connect(mapStateToProps)(Balance);