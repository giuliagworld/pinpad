import React, { Component } from 'react';

export default class App extends Component {

  state = {
    value: '',
    displayValue: '',
    letterCount: 0,
    disabled: false,
    attempsCount: 0,
    rightValue: ''
  }

  componentDidMount() {
    fetch('https://pin-pad.herokuapp.com/data')
      .then((results) => {
        return results.json();
      })
      .then((data) => {
          this.setState({
            rightValue: data[0].pin
          })
      })
      .catch(error =>
        console.error('Error:', error)
      )
  }

  addNumber = (number) => {
    this.setState({
      value: this.state.value + number,
      letterCount: this.state.letterCount + 1,
    })

    if (this.state.letterCount <= 2) {
      this.setState({
        displayValue: this.state.displayValue + '*'
      })
    }
    else {
      this.setState({
        displayValue: this.state.displayValue + number
      })
    }

    if (this.state.letterCount == 3) {
      this.setState({
        disabled: true,
        attempsCount: this.state.attempsCount + 1
      })
      setTimeout(() => {
        if (this.state.value === this.state.rightValue) {
          this.setState({
            letterCount: 0,
            displayValue: 'OK',
            value: '',
          })
        }
        else if (this.state.value !== this.state.rightValue
                && this.state.attempsCount <= 2) {
          this.setState({
            displayValue: 'ERROR',
          })
          setTimeout(() => {
            this.setState({
              letterCount: 0,
              disabled: false,
              displayValue: '',
              value: '',
            })
          }, 1000)
        }
        else if (this.state.value !== this.state.rightValue
                && this.state.attempsCount == 3) {
          this.setState({
            displayValue: 'LOCKED'
          })
          setTimeout(() => {
            this.setState({
              letterCount: 0,
              disabled: false,
              displayValue: '',
              value: '',
              attempsCount: 0
            })
          }, 5000)
        }
      }, 500)
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="h1">Enter Pin</h1>
        <div className="display">{this.state.displayValue}</div>
        <div className="hidden">{this.state.value}</div>
          <div className="btn-container">
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(7)}>7</button>
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(8)}>8</button>
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(9)}>9</button><br />
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(4)}>4</button>
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(5)}>5</button>
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(6)}>6</button><br />
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(1)}>1</button>
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(2)}>2</button>
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(3)}>3</button><br />
            <button className="btn" disabled={this.state.disabled} onClick={() => this.addNumber(0)}>0</button>
          </div>
      </div>
    )
  }
}

