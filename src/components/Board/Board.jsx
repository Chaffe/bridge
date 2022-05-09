import React from 'react';
import { connect } from "react-redux";
import { Stack, Button, Card, TextField } from '@mui/material';
import { bridgeApi } from '../../api/api';

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            cardList: null,
            currentCardIndex: null,
            betSum: 0
        }
        this.highCards = [
            {
                card: 'JACK',
                value: '11'
            },
            {
                card: 'QUEEN',
                value: '12'
            },
            {
                card: 'KING',
                value: '13'
            },
            {
                card: 'ACE',
                value: '14'
            }
        ]
    }

    checkButtonHandler(e) {
        this.getCards()
            .then(() => this.checkCardsRange(e.target.id));
    }

    checkCard(card) {
        if (isNaN(+card.value)) {
            return this.highCards.filter(highCard => highCard.card === card.value)[0].value
        } else {
            return card.value
        }
    }

    checkCardsRange(side) {
        console.log(this.state.betSum)
        if (this.checkCard(this.state.cardList[0]) > this.checkCard(this.state.cardList[1])) {
            if ( side === 'left' ) {
                this.props.incrementBalance(this.state.betSum);
                this.props.setGameStatus('win');
            } else {
                this.props.decrementBalance(this.state.betSum);
                this.props.setGameStatus('lose');
            }
        } else if(this.checkCard(this.state.cardList[0]) < this.checkCard(this.state.cardList[1])) {
            side === 'left'
                ? this.props.setGameStatus('lose')
                : this.props.setGameStatus('win');
        } else {
            this.props.setGameStatus('draw')
        }
    }

    restartButtonHandler(e) {
        this.props.setGameStatus('waiting')
    }

    getCards = async() => {
        const {data} = await bridgeApi.getCards('new');
        this.setState({
            ...this.state,
            cardList: data.cards
        })
        console.log(data);
    }

    render() {
        return (
            <div style={{paddingTop: '50px', width: '100%', textAlign: 'center'}}>
                {this.props.gameStatus === 'inactive'
                    ? <Button onClick={() => this.props.setGameStatus('waiting')} variant={'contained'}>Играть</Button>
                    : <Stack
                            direction='row'
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <div style={{display: 'flex', alignItems: 'center', columnGap: '30px'}}>
                                <Card
                                    className='card'
                                    id='left'
                                    onClick={(e) => this.checkButtonHandler(e)}
                                    sx={{
                                        backgroundImage: `url(
                                            ${this.props.gameStatus === 'waiting' 
                                                ? 'https://www.svgrepo.com/show/51211/question-mark.svg' 
                                                : this.state.cardList && this.state.cardList[0].image
                                            }
                                        )`,
                                    }}
                                />
                                {this.props.gameStatus === 'waiting' &&
                                    <Button onClick={(e) => this.checkButtonHandler(e)} id={'left'} variant={'contained'} sx={{height: 'max-content'}}>Слева</Button>
                                }
                            </div>

                            {this.props.gameStatus === 'waiting'
                                ? <TextField
                                    value={this.state.betSum}
                                    onChange={(e) => this.setState({
                                        ...this.state,
                                        betSum: e.target.value
                                    })}
                                    label={'Сумма ставки'} type={'number'}
                                />
                                : <Button onClick={(e) => this.restartButtonHandler(e)} id={'restart-button'} variant={'contained'} sx={{height: 'max-content'}}>Сыграть еще</Button>
                            }

                            <div style={{display: 'flex', alignItems: 'center', columnGap: '30px'}}>
                                {this.props.gameStatus === 'waiting' &&
                                    <Button onClick={(e) => this.checkButtonHandler(e)} id={'right'} variant={'contained'} sx={{height: 'max-content'}}>Справа</Button>
                                }
                                <Card
                                    className='card'
                                    id='right'
                                    onClick={(e) => this.checkButtonHandler(e)}
                                    sx={{
                                        backgroundImage: `url(
                                            ${this.props.gameStatus === 'waiting'
                                            ? 'https://www.svgrepo.com/show/51211/question-mark.svg'
                                            : this.state.cardList && this.state.cardList[1].image
                                        }
                                        )`,
                                    }}
                                />
                            </div>
                        </Stack>
                }

                {this.props.gameStatus === 'waiting' &&
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gameStatus: state.gameStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGameStatus: (gameStatus) => {
            dispatch({ type: 'SET_GAME_STATUS', gameStatus })
        },
        incrementBalance: (balance) => {
            dispatch({ type: 'INCREMENT_BALANCE', balance })
        },
        decrementBalance: (balance) => {
            dispatch({ type: 'DECREMENT_BALANCE', balance })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);