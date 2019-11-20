import React from 'react';
import axios from 'axios';
import CustomForm from '../components/Form';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import Articles from '../components/Article';

class ArticleList extends React.Component {
    state = {
        articles: []
    }
    componentDidMount() {
        const axios = require('axios');
        const promise = axios.get('https://jojonicho-django-react-blog.herokuapp.com/api/');
        promise.then(res => {
            this.setState({
                articles: res.data,
            });
        })
    }

    componentWillReceiveProps() {
        // if (newProps.token) {
        //     axios.defaults.headers = {
        //         "Content-type": "application/json",
        //         Authorization: newProps.token
        //     }
        const axios = require('axios');
        const promise = axios.get('https://jojonicho-django-react-blog.herokuapp.com/api/');
        promise.then(res => {
            this.setState({
                articles: res.data,
            });
        })
        // }
    }

    render() {
        return (
            <div>
                {
                    this.props.token ?

                        <div>
                            <CustomForm
                                requestType='post'
                                articleID={null}
                                btnText="Create" />
                            <br />
                        </div>
                        :
                        <div />
                }
                <Articles data={this.state.articles} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);