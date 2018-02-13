// ES6 Component
import React from "react";
import ReactDOM from "react-dom";
import {
  Item,
  Message,
  Header,
  Button,
  Container,
  Segment,
  Label,
  Icon
} from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

// Search component created as a class
class Timer extends React.Component {
  render() {
    const isPlaying = this.state.isPlaying;
    const isClicked = this.state.isClicked;
    const isTrue = this.state.isTrue;
    return (
      <div>
        <Container textAlign="center">
          <h1>Hello</h1>
          <Segment.Group inverted raised>
            <Segment>
              <Header>Timer</Header>
              <Label>
                <Icon size="big" name="clock" />
                {this.state.timeLeft}
              </Label>

              <Button
                inverted
                color="brown"
                size="huge"
                primary
                onClick={isPlaying ? this.stopTimer : this.startTimer}
              >
                {isPlaying ? "Pause" : "Start"}
              </Button>
            </Segment>
            <Segment>
              <Button
                inverted
                color="orange"
                size="huge"
                onClick={isClicked ? this.showBye : this.showHello}
              >
                {isClicked ? "Bye" : "Hello"}
              </Button>
            </Segment>
            <Segment>
              <Button
                inverted
                color="green"
                size="huge"
                onClick={isTrue ? this.noD : this.showD}
              >
                {isTrue ? "Clicked" : "Click Me"}
              </Button>
              <Message
                header={
                  isTrue
                    ? "You Have Clicked The Button"
                    : "Click The Button to see the Content"
                }
              />
              {isTrue && (
                <Item.Header>
                  {isTrue ? "Hello My name is Simple React Electron App" : ""}
                </Item.Header>
              )}
            </Segment>
          </Segment.Group>
        </Container>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 60,
      isPlaying: false,
      isClicked: false,
      isTrue: false
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.showHello = this.showHello.bind(this);
    this.showBye = this.showBye.bind(this);
    this.showD = this.showD.bind(this);
    this.noD = this.noD.bind(this);
  }
  tick() {
    const currentDate = new Date();
    switch (!this.state.date) {
      case true:
        this.setState({
          date: currentDate
        });
        break;
      default:
        this.setState((prevState, props) => ({
          date: currentDate,
          timeLeft:
            prevState.timeLeft -
            Math.round((currentDate - prevState.date) / 1000)
        }));
    }
  }

  showD() {
    this.setState({
      isTrue: true
    });
  }

  noD() {
    this.setState({
      isTrue: false
    });
  }

  showHello() {
    this.setState({
      isClicked: true
    });
  }

  showBye() {
    this.setState({
      isClicked: false
    });
  }
  startTimer() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.setState({
      isPlaying: true
    });
  }
  stopTimer() {
    clearInterval(this.timerID);
    this.setState({
      isPlaying: false,
      date: null
    });
  }
  componentWillUnmount() {
    stopTimer();
  }

  componentDidMount() {
    showBye();
  }

  componentDidMount() {
    noD();
  }
}

ReactDOM.render(<Timer />, document.getElementById("content"));
