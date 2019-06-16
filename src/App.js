import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ADD, MOVE, LOAD } from './actions'
import Column from "./Column";
import './App.css';

const DIRECTION_LEFT = -1;
const DIRECTION_RIGHT = 1;

class App extends Component {
  componentDidMount = () => this.props.load()

  handleAdd = (columnIndex) => {
    const name = window.prompt('Name?')
    if(!name) return
    const card = { name: name}
    this.props.add(columnIndex, card)
  }

  render() {
    if(!this.props.columns) return null
    return (
      <div className="App">
        {this.props.columns.map((column, columnIndex) => (
          <Column 
            column={column} 
            columnIndex={columnIndex} 
            key={columnIndex}
            onMoveLeft={cardIndex => this.props.move(columnIndex, cardIndex, DIRECTION_LEFT)}
            onMoveRight={cardIndex => this.props.move(columnIndex, cardIndex, DIRECTION_RIGHT)}
            onAddCard={() => this.handleAdd(columnIndex )}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({columns}) => ({
  columns
})

const mapDispatchToProps = (dispatch) => ({
  add: (columnIndex, card) => dispatch({type: ADD, columnIndex, card}),
  move: (columnIndex, cardIndex, direction) => dispatch({type: MOVE, columnIndex, cardIndex, direction}),
  load: () => dispatch({type: LOAD})

})
export default connect(mapStateToProps, mapDispatchToProps) (App);
