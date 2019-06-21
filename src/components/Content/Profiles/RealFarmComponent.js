import React from 'react'

class RealFarmComponent extends React.Component {
  constructor(props){
    super(props);
    this.refreshCurrentState(false);
  }

  refreshCurrentState(rerender = true) {
    this.currentState = {...this.state};
    this.dataChanged = false;
    if(rerender){
      this.setState({...this.state});
    }
  }

  checkDataChanged(state = this.state){
    this.dataChanged =  JSON.stringify(state) !== JSON.stringify(this.currentState);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.checkDataChanged(nextState);
  }

}

export default RealFarmComponent