import React from 'react';
import axios from 'axios';
import CustomForm from '../components/Form';
import { connect } from 'react-redux';
import Articles from '../components/Article';

class ArticleList extends React.Component {
    state = {
        articles: []
    }

    fetchArticles = () => {
        axios.get("https://jojonicho-django-react-blog.herokuapp.com/api/").then(res => {
            this.setState({
                articles: res.data
            });
        });
    }

    componentDidMount() {
        this.fetchArticles();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token) {
            this.fetchArticles();
        }
    }

    // componentDidMount() {
    //     const promise = axios.get('https://jojonicho-django-react-blog.herokuapp.com/api/');
    //     promise.then(res => {
    //         this.setState({
    //             articles: res.data,
    //         });
    //     })
    // }

    // componentWillReceiveProps() {
    //     // if (newProps.token) {
    //     //     axios.defaults.headers = {
    //     //         "Content-type": "application/json",
    //     //         Authorization: newProps.token
    //     //     }
    //     const promise = axios.get('https://jojonicho-django-react-blog.herokuapp.com/api/');
    //     promise.then(res => {
    //         this.setState({
    //             articles: res.data,
    //         });
    //     })
    //     // }
    // }

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
export default connect(mapStateToProps)(ArticleList);