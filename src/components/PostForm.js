import React from "react";
import {connect} from 'react-redux';
import {createPost, showAlert} from "../redux/actions";
import Alert from "./Alert";

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    submitHandler = event => {
        event.preventDefault();
        const {title} = this.state;

        if (!title.trim()) {
            return this.props.showAlert('Пост не может быть пустым')
        }
        const newPost = {
            title, id: Date.now().toString()
        };
        this.props.createPost(newPost);
        this.setState({
            title: ''
        })
    };

    changeInputHandler = event => {
        event.persist();
        this.setState(prev => ({...prev, ...{
                [event.target.name]: event.target.value
            }}))
    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <h1>Post form</h1>
                <div className="form-group">
                    <label htmlFor="title">Заголовок поста</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={this.state.title}
                        name="title"
                        onChange={this.changeInputHandler}
                    />
                </div>
                {this.props.alert !== null &&
                <Alert text={this.props.alert}/>
                }
                <button className="btn btn-success">Создать</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.app.alert
    }
};

const mapDispatchToProps = {
    createPost,
    showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);