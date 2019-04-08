import React from 'react';
import './Modal.css';
import {connect} from 'react-redux';

class Modal extends React.Component {

    isActive() {
        return `modalWindow ${this.props.isOpenModal ? '' : 'hidden'}`
    }

    render() {
        const {isOpenModal, contentModal} = this.props;
        const dispatch = this.props.dispatch;
        const actionCloseModal = {type: 'actionCloseModal'};

        return (
            <div id="modalWindow" className={this.isActive()}>
                <div>
                    <div className="modalContent">
                        <div onClick={() => {
                            dispatch(actionCloseModal)
                        }}
                             className="modalBackground"> </div>
                        {contentModal}
                    </div>
                </div>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        isOpenModal: state.isOpenModal,
        contentModal: state.contentModal
    }
};

export default connect(putStateToProps)(Modal);
