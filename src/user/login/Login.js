import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { ACCESS_TOKEN } from '../../constants';

import { Row, Col, Card, Form, Input, Button, Icon, notification, Layout } from 'antd';

const { Content } = Layout;

const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm);
        return (
            <Layout style={{ height:'100vh'  ,marginTop: '64px', background: 'rgb(240,242,245)' }}>
                <Content className="login-page" >
                    <div className="content-container" style={{ background: 'rgb(240,242,245)' }}>
                        <Row type="flex" justify="center" gutter={16} style={{ margin: '10% 5px 5px 5px'}}>
                            <Col sm={12} xs={24} >
                                <Card title="Login">
                                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    {/*<div style={{ padding: 24, minHeight: 280, margin: '10%' }}>*/}
                        {/*<div className="login-container">*/}
                            {/*<h1 className="page-title">Login</h1>*/}
                            {/*<div className="login-content">*/}
                                {/*<AntWrappedLoginForm onLogin={this.props.onLogin} />*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </Content>
            </Layout>
        );
    }

}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'SYL',
                            description: 'Your publisher id or api key is incorrect. Please try again!'
                        });
                    } else {
                        notification.error({
                            message: 'SYL',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userId', {
                        rules: [{ required: true, message: 'Please input your publisher ID!' }],
                    })(
                       <Input
                           prefix={<Icon type="user" />}
                           size="large"
                           name="userId"
                           placeholder="Publisher ID"
                       />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('apiKey' , {rules: [{required: true, message: 'Please enter your api key!'}],
                    })(
                        <Input
                            prefix={<Icon type='lock'/>}
                            size="large"
                            name="apiKey"
                            type="password"
                            placeholder="Api Key"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                </FormItem>
            </Form>

        )

    }
}

export default Login;