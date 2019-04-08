import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import Content from './components/Content/Content';

class App extends React.Component {
  render() {
    return (
        <div className="main-page">
            <Header />
            <Content />
            <Modal />
            <Footer />

        </div>
      );
  }
}

export default App;
