import React from 'react';
import { connect } from "react-redux";

class Message extends React.Component {
    render() {
        return (
            <>
                {this.props.gameStatus === 'inactive' &&
                    <>
                        <h2>Кто выиграет?</h2>
                        <h3 style={{paddingTop: '15px'}}>Сыграй в игру и испытай удачу!</h3>
                    </>
                }

                {this.props.gameStatus === 'waiting' &&
                    <>
                        <h2>Кто выиграет?</h2>
                        <h3 style={{paddingTop: '15px'}}>Выберите левую либо правую карту</h3>
                    </>
                }

                {this.props.gameStatus === 'win' &&
                    <h2>Поздравляем! Вы выиграли!</h2>
                }

                {this.props.gameStatus === 'lose' &&
                    <h2>Вы проиграли! :(</h2>
                }

                {this.props.gameStatus === 'draw' &&
                    <h2>Ничья!</h2>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gameStatus: state.gameStatus
    }
}

export default connect(mapStateToProps)(Message);