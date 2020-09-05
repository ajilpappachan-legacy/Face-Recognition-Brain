import React, { Component } from 'react';
import './App.css';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import Particles from './components/particles/Particles';
import Navbar from './components/navigation/Navbar';
import Logo from './components/logo/Logo';
import LinkBar from './components/linkBar/LinkBar';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'a07a94f78a5a42febf38b492c96f1c30'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    };
  }

  onRouteChange = (route) => {
    this.setState({ route });
    if (route === 'home') { this.setState({ isSignedIn: true }) }
    else { this.setState({ isSignedIn: false }) }
  }

  calculateFaceDimensions = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * width,
      rightCol: width - (faceData.right_col * width),
      bottomRow: height - (faceData.bottom_row * height)
    };

  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box });
  }

  onTextChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceDimensions(response)))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <Particles />
        <Navbar onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <LinkBar onTextChange={this.onTextChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageURL={this.state.imageURL} boundingBox={this.state.box} />
          </div>
          : (this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
