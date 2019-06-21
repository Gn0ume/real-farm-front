import React from "react";
import './PageHeader.css';
import NameEditComponent from "./NameEditComponent";
import {Link} from "react-router-dom";
import done_icon from "../../../img/icons/done-icon.svg";
import save_change_icon from "../../../img/icons/save_change_icon.svg";

const PageHeader = (props) => {
  const getIcon = () => {
    return props.changed ?
      <img src={done_icon} alt="done_icon"/> : <img src={save_change_icon} alt="done_icon"/>
  }

  return(
    <div className="page-name-box">
      <div className="farm-name-box">
        <span className="page-name">{props.pagename}</span>
        {props.inputName &&
        <NameEditComponent
          placeholder="Farm Name"
          maxlength={20}
          farmname={props.inputNameValue}
          onChange={props.onChangeFarmName}/>}
      </div>
      {props.buttons &&
      <div className="head_button">
        <button
          onClick={props.onSave}
          disabled={!props.changed}
          id="save_changes"
          className={props.changed ? "save_changes_button" : "button_saved"}>

          {getIcon()}
          <span>{props.changed ? "save" : "saved"}</span>
        </button>

        <Link to="/farmer">
          <button
            id="cancel"
            className="cancel_button">cancel
          </button>
        </Link>

      </div>
      }
    </div>
  )
}

export default PageHeader