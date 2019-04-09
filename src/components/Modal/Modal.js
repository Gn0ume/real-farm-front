import React from 'react';
import './Modal.css';
import {connect} from 'react-redux';

class Modal extends React.Component {

    isActive() {
        return `modalWindow ${this.props.isOpenModal ? '' : 'hidden'}`
    }

    render() {
        const {contentModal} = this.props;
        const dispatch = this.props.dispatch;
        const actionCloseModal = {type: 'actionCloseModal'};
        return (
            <div id="modalWindow" className={this.isActive()}>
                <div onClick={() => {
                    dispatch(actionCloseModal)
                }}
                     className="modalBackground"> </div>
                <div className="modalContent">
                    {contentModal}
                </div>
            </div>
        )
    }
};

const putStateToProps = (state) => {
    return {
        isOpenModal: state.isOpenModal,
        contentModal: state.contentModal
    }
};

export default connect(putStateToProps)(Modal)