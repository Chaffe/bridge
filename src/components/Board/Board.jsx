import React from 'react';
import { connect } from "react-redux";
import { Stack, Button, Card, TextField } from '@mui/material';
import bridgeApi from '../../api/api';

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            cardList: null,
            currentCardIndex: null,
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
            return +this.highCards.filter(highCard => highCard.card === card.value)[0].value
        } else {
            return +card.value
        }
    }

    checkCardsRange(side) {
        if (this.checkCard(this.state.cardList[0]) > this.checkCard(this.state.cardList[1])) {
            if ( side === 'left' ) {
                this.props.incrementBalance(+this.props.betSum);
                this.props.setGameStatus('win');
            } else {
                this.props.decrementBalance(+this.props.betSum);
                this.props.setGameStatus('lose');
            }
        } else if(this.checkCard(this.state.cardList[0]) < this.checkCard(this.state.cardList[1])) {
            if ( side === 'left' ) {
                this.props.decrementBalance(+this.props.betSum);
                this.props.setGameStatus('lose');
            } else {
                this.props.incrementBalance(+this.props.betSum);
                this.props.setGameStatus('win');
            }
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
                                    className={`card ${this.props.gameStatus === 'waiting' ? 'active' : ''}`}
                                    id='left'
                                    onClick={(e) => this.props.gameStatus === 'waiting' && this.checkButtonHandler(e)}
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
                                    value={this.props.betSum}
                                    onChange={(e) => this.props.setBetSum(e.target.value)}
                                    label={'Сумма ставки'} type={'number'}
                                />
                                : <Button onClick={(e) => this.restartButtonHandler(e)} id={'restart-button'} variant={'contained'} sx={{height: 'max-content'}}>Сыграть еще</Button>
                            }

                            <div style={{display: 'flex', alignItems: 'center', columnGap: '30px'}}>
                                {this.props.gameStatus === 'waiting' &&
                                    <Button onClick={(e) => this.checkButtonHandler(e)} id={'right'} variant={'contained'} sx={{height: 'max-content'}}>Справа</Button>
                                }
                                <Card
                                    className={`card ${this.props.gameStatus === 'waiting' ? 'active' : ''}`}
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gameStatus: state.gameStatus,
        betSum: state.betSum
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGameStatus: (gameStatus) => {
            dispatch({ type: 'SET_GAME_STATUS', gameStatus })
        },
        setBetSum: (betSum) => {
            dispatch({ type: 'SET_BET_SUM', betSum })
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