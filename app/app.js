// ES6 Component
import React from 'react';
import ReactDOM from 'react-dom';
//import usb from 'usb';
 import usbDetect from 'usb-detection';
 import printer from 'node-printer';
import {
  Item,
  Message,
  Header,
  Button,
  Container,
  Segment,
  Label,
  Icon,
  Form,
  TextArea
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

// Search component created as a class
class Timer extends React.Component {
  /*deviceList() {
    console.log(usb.getDeviceList());
  } */

  render() {
    const isPlaying = this.state.isPlaying;
    const isClicked = this.state.isClicked;
    const isTrue = this.state.isTrue;
    const isDetected = this.state.isDetected;
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
                {isPlaying ? 'Pause' : 'Start'}
              </Button>
            </Segment>
            <Segment>
              <Button
                inverted
                color="orange"
                size="huge"
                onClick={isClicked ? this.showBye : this.showHello}
              >
                {isClicked ? 'Bye' : 'Hello'}
              </Button>
            </Segment>
            <Segment>
              <Button
                inverted
                color="green"
                size="huge"
                onClick={isTrue ? this.noD : this.showD}
              >
                {isTrue ? 'Clicked' : 'Click Me'}
              </Button>
              <Message
                header={
                  isTrue
                    ? 'You Have Clicked The Button'
                    : 'Click The Button to see the Content'
                }
              />
              {isTrue && (
                <Item.Header>
                  {isTrue ? 'Hello My name is Simple React Electron App' : ''}
                </Item.Header>
              )}
            </Segment>
            <Segment>
              <Header>BarCode Scanner</Header>
              <Button
                inverted
                color="blue"
                size="huge"
                primary
                onClick={this.deviceList}
              >
                {/* {isDetected ? 'Hide' : 'Show'} */}
              </Button>
              {/* <Message>{isDetected && deviceList}</Message> */}
            </Segment>
            <Segment>{}</Segment>
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
      isTrue: false,
      isDetected: false
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.showHello = this.showHello.bind(this);
    this.showBye = this.showBye.bind(this);
    this.showD = this.showD.bind(this);
    this.noD = this.noD.bind(this);
    this.noDetect = this.noDetect.bind(this);
    this.yesDetect = this.yesDetect.bind(this);
    this.deviceList = this.deviceList.bind(this);
    usbDetect.startMonitoring();
    usbDetect.stopMonitoring();
    this.demo();
    // usbDetect.startMonitoring();
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

  // getDeviceList() {
  //   this.setState = "No Devices";

  // }

  showD() {
    this.setState({
      isTrue: true
    });
  }

  deviceList() {
   
    /*usbDetect
      .find()
      .then(function(devices) {
        
      })
      .catch(function(err) {
        console.log(err);
      }); */
     
  // usbDetect.on('add', function(device) { console.log('add', device); });


    
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

  yesDetect() {
    this.setState({
      isDetected: true
    });
  }

  noDetect() {
    this.setState({
      isDetected: false
    });
  }
  
  demo () {

    usbDetect.find().then(function(devices) { console.log(devices); }).catch(function(err) { console.log(err); });

    usbDetect.find(3118,516,function(err, devices) { 
      console.log('find', devices, err); 
    });

    usbDetect.find(6790,30084,function(err, devices) {  
      console.log('find_printer', devices, err); 
      console.log(devices[0]['deviceName']);
      var prin = new printer(devices[0]['deviceName']);
      console.log(prin);
      console.log(printer.list());
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
    noD();
    noDetect();
  }
}

ReactDOM.render(<Timer />, document.getElementById('content'));
