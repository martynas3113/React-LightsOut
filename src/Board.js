import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
static defaultProps = {
  nrows: 5,
  ncols: 5,
  chanceLightStartsOn: 0.5
};
  constructor(props) {
        super(props);

        this.state = { 
          hasWon: false,
          board: this.createBoard()
        
        }
        
  }

  createBoard() {
    let board = [];
    for(let y =0; y < this.props.nrows; y++){
      let row =[];
      for(let x =0; x< this.props.ncols; x++){
        row.push(Math.random() < this.props.chanceLightStartsOn);
        
      }
      board.push(row);
    }
    
    return board;
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);
    flipCell(y, x-1); //Flips left
    flipCell(y, x+1); //Flips right
    flipCell(y-1, x); //Flips below
    flipCell(y+1, x); //Flips above
    

    
    let Won =  board.every(row => row.every(cell => !cell));  

    this.setState({board: board, hasWon: Won})
  }

  render() {
    if(this.state.hasWon) {
      return <div className="container">
        <div className="You">You</div>
        <div className="Win">Win</div>
      </div>
    }
    let tableBoard = [];
    for(let y =0; y < this.props.nrows; y++){
      let row = [];
      for(let x = 0; x< this.props.ncols; x++){
        let coord = `${y}-${x}`
        row.push(<Cell key={coord} isLit={this.state.board[y][x]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />)
        
      }
      tableBoard.push(<tr key={y} >{row}</tr>)
      
    } 
    return(
      <div>
      <div className="title-cont">
          <div className= "lights">Lights</div>
          <div className= "out">Out</div>
        </div>
      <table className="Board">
        <tbody>
         {tableBoard} 
        </tbody>
      </table>
      </div>
    )
  }
}


export default Board;
