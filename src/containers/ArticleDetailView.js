import React from 'react';
import axios from 'axios'

import CustomForm from '../components/Form';

import { connect } from 'react-redux';

import { Button, Card } from 'antd';

class ArticleDetail extends React.Component {
    state = {
        article: {}
    }
    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        axios.get(`https://jojonicho-django-react-blog.herokuapp.com/api/${articleID}/`)
            .then(res => {
                this.setState({
                    article: res.data
                })
            })
        // }
    }

    handleDelete = (event) => {
        const articleID = this.props.match.params.articleID;
        axios.delete(`https://jojonicho-django-react-blog.herokuapp.com/api/${articleID}/`);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <p>{this.state.article.content}</p>
                </Card>
                {this.props.tokens ?
                    <div>
                        <CustomForm
                            requestType="put"
                            articleID={this.props.match.params.articleID}
                            btnText="Update" />
                        <form onSubmit={this.handleDelete}>
                            <Button type="danger" htmlType="submit">Delete</Button>
                        </form>

                    </div>
                    :
                    <div />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tokens: state.token
    };
}

export default connect(mapStateToProps)(ArticleDetail);