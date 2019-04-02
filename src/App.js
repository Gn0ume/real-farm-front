import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  render() {
    return (
        <div className={"main-page"}>
            <Header />
            <div className={"main"}></div>
            <Footer />
        </div>
      );
  }
}

export default App;
