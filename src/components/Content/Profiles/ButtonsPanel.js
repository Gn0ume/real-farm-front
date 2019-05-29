import React from "react";
import './ButtonsPanel.css';

class ButtonPanel extends React.Component {
    handleClick(value, type) {
        this.props.onChange(value, type);
    }

    isActive(buttonName) {
        if (this.props.activeButton === null && buttonName === "UNKNOWN")
            return "active-button";
        else
            return (buttonName === this.props.activeButton ? "active-button" : "");
    }

    getClass(index) {
        if (index === 0)
            return "first-button";
        else if (index === this.props.buttonsName.length - 1)
            return "last-button";
        else
            return "";
    }

    generateButton() {
        let buttons = [];
        for (let i = 0; i < this.props.buttonsName.length; i++) {
            let buttonName = this.props.buttonsName[i].toUpperCase();
            buttons[i] =
                <button name={this.props.buttonsName[i]}
                                 key={i}
                                 onClick={() => {this.handleClick(buttonName, this.props.type)}}
                                 className={`${this.getClass(i)} ${this.isActive(buttonName)}`}>
                            {this.props.buttonsName[i]}
                </button>;
        }
        return buttons;
    }

    render() {
        return (
            <div className="buttons-panel">
                <input type="hidden" name="nameActiveButton" value={this.props.activeButton}/>
                {this.generateButton()}
            </div>
        )
    }
}

export default ButtonPanel