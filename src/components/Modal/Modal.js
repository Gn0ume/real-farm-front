import React from 'react';
import './Modal.css';
import {connect} from 'react-redux';

class Modal extends React.Component {

    isActive() {
        return `modalWindow ${this.props.isOpenModal ? '' : 'hidden'}`
    };

    static preventBubbling(e) {
        e.stopPropagation();
    };

    render() {
        const {contentModal} = this.props;
        const dispatch = this.props.dispatch;
        const actionCloseModal = {type: 'actionCloseModal'};
        return (
            <div id="modalWindow" className={this.isActive()}>
                <div className="modalBackground"> </div>
                <div className="modalContent" onMouseDown={() => {
                    dispatch(actionCloseModal)
                }}>
                    <div className="contentContainer" onMouseDown={e => Modal.preventBubbling(e)}>
                        {contentModal}
                    </div>
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