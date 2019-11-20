import React from 'react'

import axios from 'axios'

import { Form, Input, Button } from 'antd';

class CustomForm extends React.Component {
    handleFormSubmit = (event, requestType, articleID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;

        switch (requestType) {
            case 'post':
                return axios.post('https://jojonicho-django-react-blog.herokuapp.com/api/', {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(err => console.err(err))
            case 'put':
                return axios.put(`https://jojonicho-django-react-blog.herokuapp.com/api/${articleID}`, {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(err => console.err(err))
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={(event) => this.handleFormSubmit(
                    event,
                    this.props.requestType,
                    this.props.articleID
                )}>
                    <Form.Item label="Title">
                        <Input name='title' placeholder="Title Of Article" />
                    </Form.Item>
                    <Form.Item label="Content">
                        <Input name='content' placeholder="How was your day?" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default CustomForm;