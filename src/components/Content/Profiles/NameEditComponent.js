import React from "react";
import './NameEditComponent.css'

const NameEditComponent = (props) => {
    let newFarmName = props.farmname;

    const handleInput = (event) => {
        newFarmName = event.target.innerText;
        props.onChange(newFarmName);
    };

    const keyDownHandler = (event) => {
        const element = event.currentTarget;
        const cntMaxLength = parseInt(element.getAttribute('maxLength'));
        const isTextSelected = window.getSelection().toString().length > 0;
        const charval= String.fromCharCode(event.keyCode);

        if ((element.innerText.length === cntMaxLength || charval.match(/[A-Za-z0-9\s]/i) === null) && (![46, 8].includes(event.keyCode)) && !isTextSelected) {
            event.preventDefault();
        }
    };

    const mouseUpHandler = (event) => {
        console.log(window.getSelection().toString());
    };

    return(
      <div>
            <span id="farm-name"
                  onInput={handleInput}
                  contentEditable={true}
                  placeholder={props.placeholder}
                  maxLength={props.maxlength}
                  onKeyDown={keyDownHandler}
                  onPaste={keyDownHandler}
                  onMouseUp={mouseUpHandler}
                  className="farm-name-input">
                {props.farmname}
            </span>

      </div>
    )
};

export default NameEditComponent