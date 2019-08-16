import React from "react";
import './PageHeader.css';
import NameEditComponent from "./NameEditComponent";
import {withRouter} from "react-router-dom";
import done_icon from "../../../img/icons/done-icon.svg";
import save_change_icon from "../../../img/icons/save_change_icon.svg";

const PageHeader = (props) => {
  const getIcon = () => {
    return props.changed ?
      <img src={save_change_icon} alt="done_icon"/> : <img src={done_icon} alt="done_icon"/>
  };

  const leavePage = () => {
    if (props.changed) {
      if (window.confirm('You have unsaved changes. Do you want to leave the page?')) {
        props.history.push('/farmer');
      }
    } else {
      props.history.push('/farmer');
    }

  };

  return(
    <div className="page-name-box">
      <div className="farm-name-box">

        <div className="page-name">
          {props.icon &&
          <img className="page-name-box-icon" src={props.icon} alt=""/>}
          {props.pagename}</div>
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

        {/*<Link to="/farmer">*/}
          <button
            id="cancel"
            className="cancel_button"
          onClick={leavePage}>cancel
          </button>
        {/*</Link>*/}

      </div>
      }
    </div>
  )
}

export default withRouter(PageHeader)