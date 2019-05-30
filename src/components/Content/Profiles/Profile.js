import React from "react";
import './Profile.css';
import Icon from "material-icons-react";
import ButtonsPanel from "./ButtonsPanel";
import Resize from './Resize';
import {queryMyProfile, queryUpdateMyProfile, queryClearAvatar} from "../../queries/queries";
import {compose, withApollo} from "react-apollo";
import axios from 'axios';
import {getToken} from "../../../constants";
import defaultAvatar from '../../../img/defaultAvatar.jpg'
import {connect} from "react-redux";
import {WIDTH_AVATAR} from "../../../constants";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
        this.handleRemoveFile = this.handleRemoveFile.bind(this);

        this.state = {
            isReady: false,
            email: '',
            aboutMe: '',
            firstName: '',
            lastName: '',
            gender: '',
            type: '',
            avatarCropSettings: [],
            avatar: {
                metaData: {},
                url: ''
            },
            errors: [],
            cropSize: {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                deltaX: 0,
                deltaY: 0
            }
        };
    }

    componentDidMount() {
        this.props.client.query({
            query: queryMyProfile,
            fetchPolicy: 'no-cache'
        })
            .then(({data}) => {
                const me = {...data.me};
                 if (me.avatarUrl != null) {
                    me.avatar.metaData = JSON.parse(me.avatar.metaData);
                }
                this.setState({...me, isReady: true});
            })
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({...this.state, [name]: value});
        return this.state;
    }

    handleChangeRadio(name, type) {
        if (type === "gender" && name === "UNKNOWN")
            this.setState({...this.state, [type]: null});
        else
            this.setState({...this.state, [type]: `${name}`});
        return this.state;
    }


    handleFileUpload(e) {
        this.setState({errors: []});

        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('avatar', file);
        axios({
            url: 'http://188.225.79.210:5000/uploadAvatar',
            method: 'POST',
            headers: {
                authorization: getToken() ? `Bearer ${getToken()}` : ''
            },
            data: fd
        })
            .then(({data: res}) => {

                if (res.success === true) {
                    const metaData = JSON.parse(res.metaData);
                    const dispatch = this.props.dispatch;
                    const infoAuthUser = {
                        type: 'infoAuthUser',
                        payload: {
                            ...this.props.authUser,
                            avatarUrl: res.url
                        }
                    };
                    dispatch(infoAuthUser);
                    this.setState({
                        avatar: {url: res.url, metaData: metaData},
                        avatarCropSettings: res.avatarCropSettings
                    });
                } else {
                    this.setState({errors: res.errors});
                }
            });
    }

    handleRemoveFile() {
        if (window.confirm('Delete avatar?')) {
            this.props.client.query({
                query: queryClearAvatar
            })
                .then(({data}) => {
                    if (data.me.clearAvatar) {
                        this.setState({avatar: null});
                        const dispatch = this.props.dispatch;
                        const infoAuthUser = {
                            type: 'infoAuthUser',
                            payload: {
                                ...this.props.authUser,
                                avatarUrl: null
                            }
                        };
                        dispatch(infoAuthUser);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    renderErrors() {
        const errors = this.state.errors.map(item => {
            Object.keys(item.variables).forEach(variable => {
                item.text = item.text.replace(variable, item.variables[variable])
            });
            return (<span>
                    <Icon className="material-icons md-24" id="warning" color="red" icon="warning"/>
                    {item.text}
            </span>
            )
        });
        return errors.length ? errors : ''
    }

    onClickSaveButton(event) {
        event.preventDefault();
        this.props.client.query({
            query: queryUpdateMyProfile,
            variables: {
                aboutMe: this.state.aboutMe,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                type: this.state.type,
                avatarCropSettings: this.state.avatarCropSettings
            }
        })
            .then(({data}) => {
                const freshUser = data.me.update;
                const dispatch = this.props.dispatch;
                const infoAuthUser = {type: 'infoAuthUser', payload: {...this.props.authUser, ...freshUser}};
                dispatch(infoAuthUser);
            })
            .catch(err => {
                console.log(err)
            });
    }

    getCanvasSize() {
        const {width, height} = this.state.avatar.metaData; //натуральная высота и ширина аватара
        const newHeight = (height * WIDTH_AVATAR) / width;
        return {width: WIDTH_AVATAR, height: newHeight};
    }

    getAvatar() {
        return (this.state.avatar === null ? defaultAvatar : this.state.avatar.url)
    }

    cropChangeHandler = points => {
        this.setState({avatarCropSettings: points})
    };

    render() {
        return (
            <div>
                {this.state.isReady &&
                <div>
                    <div className="page-name-box">
                        <span className="page-name">Profile</span>
                    </div>
                    <div className="profile-box">
                        <div className="profile-box-content">
                            <div className="profile-avatar">
                                <div id="crop-container"
                                     className="profile-avatar-photo"
                                     style={this.state.avatar === null ?
                                         null : this.getCanvasSize()}>

                                    <img src={this.getAvatar()} alt="profile-avatar"/>
                                    {this.state.avatar === null ?
                                        null :
                                        <Resize
                                            points={this.state.avatarCropSettings}
                                            canvasSize={this.getCanvasSize()}
                                            onChange={this.cropChangeHandler}
                                        />
                                    }
                                </div>
                                {this.renderErrors()}
                                <input type="file"
                                       className="upload-input"
                                       id="file"
                                       onChange={(e) => this.handleFileUpload(e)}/>
                                <label htmlFor="file">
                            <span className="upload-remove-photo">
                                <Icon className="material-icons md-24 md-dark" color="darkgray" icon="get_app"/>
                                Upload New Image
                            </span>
                                </label>

                                <span onClick={this.handleRemoveFile} className="upload-remove-photo">
                                <Icon className="material-icons md-24 md-dark" color="red" icon="delete_outline"/>
                                Remove Photo
                            </span>

                            </div>
                            <div className="profile-info">
                                <span className="fields-name">first name</span>
                                <input id="profile-first-name"
                                       name="firstName"
                                       placeholder="Your First Name Here"
                                       type="text"
                                       value={this.state.firstName}
                                       onChange={this.handleChange}
                                />
                                <span className="fields-name">last name</span>
                                <input id="profile-last-name"
                                       name="lastName"
                                       placeholder="Your Last Name Here"
                                       type="text"
                                       value={this.state.lastName}
                                       onChange={this.handleChange}
                                />
                                <span className="fields-name">e-mail</span>
                                <input id="profile-email"
                                       name="email"
                                       placeholder="Your E-Mail Here"
                                       type="email"
                                       value={this.state.email}
                                       onChange={this.handleChange}
                                />
                                <span className="fields-name">gender</span>
                                <ButtonsPanel
                                    type={"gender"}
                                    activeButton={this.state.gender}
                                    buttonsName={["Unknown", "Male", "Female"]}
                                    onChange={this.handleChangeRadio}/>
                                <span className="fields-name">main account type</span>
                                <ButtonsPanel
                                    type={"type"}
                                    activeButton={this.state.type}
                                    buttonsName={["Farmer", "Customer"]}
                                    onChange={this.handleChangeRadio}/>
                            </div>
                            <div className="profile-about-me">
                                <div className="profile-about-me-title">
                                    <span className="fields-name">about me</span>
                                    <p className="profile-about-me-char-qty">145 chars</p>
                                </div>
                                <textarea
                                    placeholder="Type here..."
                                    name="aboutMe"
                                    id="profile-about-me"
                                    value={this.state.aboutMe}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <button className="profile-box-save-button"
                                onClick={(event) => this.onClickSaveButton(event)}>
                            Save
                        </button>
                    </div>
                </div>
                }
            </div>

        )
    }
}

const putStateToProps = (state) => {
    return {
        authUser: state.authUser
    }
};

export default withApollo(compose(connect(putStateToProps))(Profile));
