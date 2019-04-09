import React from 'react';
import './Modal.css';
import {connect} from 'react-redux';

class Modal extends React.Component {

    isActive() {
        return `modalWindow ${this.props.isOpenModal ? '' : 'hidden'}`
    }

    isVisibleScroll() {
        (this.props.isOpenModal) ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }

    render() {
        const {contentModal} = this.props;
        const dispatch = this.props.dispatch;
        const actionCloseModal = {type: 'actionCloseModal'};
        {this.isVisibleScroll()}
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