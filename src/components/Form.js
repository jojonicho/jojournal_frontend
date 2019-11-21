import React from 'react'

import axios from 'axios'

import { connect } from 'react-redux'

import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class CustomForm extends React.Component {
    handleFormSubmit = async (event, requestType, articleID) => {
        event.preventDefault();

        const postObj = {
            title: event.target.elements.title.value,
            content: event.target.elements.content.value
        }

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`,
        };

        if (requestType === "post") {
            await axios.post("https://jojonicho-django-react-blog.herokuapp.com/api/", postObj)
                .then(res => {
                    if (res.status === 201) {
                        this.props.history.push('/');
                    }
                })
        } else if (requestType === "put") {
            // await axios.put(`http://127.0.0.1:8000/api/${articleID}/update/`, postObj)
            await axios.put(`https://jojonicho-django-react-blog.herokuapp.com/api/${articleID}/`, postObj)
                .then(res => {
                    if (res.status === 200) {
                        this.props.history.push('/');
                    }
                })
        }
    };

    render() {
        return (
            <div>
                <Form onSubmit={(event) => this.handleFormSubmit(
                    event,
                    this.props.requestType,
                    this.props.articleID
                )}>
                    <FormItem label="Title">
                        <Input name='title' placeholder="Title Of Article" />
                    </FormItem>
                    <FormItem label="Content">
                        <Input name='content' placeholder="How was your day?" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(CustomForm);
// export default CustomForm;