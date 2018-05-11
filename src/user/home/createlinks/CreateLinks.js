import React, { Component } from 'react';
import { Table, Form, Input, Icon, Button, Card, Col, Row } from 'antd';
import {
    Route,
    withRouter,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';
import {Layout, notification} from "antd/lib/index";
import {createLink} from "../../../util/APIUtils";
const FormItem = Form.Item;

const { Content } = Layout;
class CreateLinks extends Component {
    constructor(props){
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
        this.createdLinks = [];
        this.linkTable = [];
    }

    handleCreate(links){
        notification.success({
            message: 'SYL App',
            description: "Link creation succeeded.",
        });
        this.createdLinks = links;
        let dataSource = this.createdLinks;
        let columns = [{
            title: 'Original',
            dataIndex: 'originalUrl',
            key: 'url',

        },{
            title: 'Cents per click',
            dataIndex: 'ecpc',
            key: 'earnings',
        },{
            title: 'SYL link',
            dataIndex: 'link',
            key: 'link',
        }];
        this.linkTable = [
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Your links">
                        <Table dataSource={dataSource} columns={columns} />
                    </Card>
                </Col>
            </Row>
        ]
        this.props.history.push("/home/createlinks");

    }
    render() {
        const AntWrappedLinkForm = Form.create()(LinkForm);
        return (
            <Layout style={{ padding: '0 24px 24px', marginLeft: 200, background: '#ECECEC' }}>
                <Content>
                    <div className="content-container" style={{ background: '#ECECEC', padding: '20px' }}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card title="Create links">
                                    <AntWrappedLinkForm onCreate={this.handleCreate} />
                                </Card>
                            </Col>
                        </Row>
                        {this.linkTable}
                    </div>
                </Content>
            </Layout>
        );
    }
}







let uuid = 0;
class LinkForm extends Component {
    constructor(props){
        super(props);
    }
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const createFormRequest = {urls:values.names};
                createLink(createFormRequest).then(response => {
                       this.props.onCreate(response.generatedLinks);
                    }).catch(error => {
                    notification.error({
                        message: 'SYL',
                        description: 'Failed to create links!'
                    })
                });
            }
        });
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //         }
    //     });
    // }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'URLs' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`names[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input url or delete this field.",
                        }],
                    })(
                        <Input placeholder="Url" style={{ width: '60%', marginRight: 8 }} />
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add field
                    </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }

}

export default withRouter(CreateLinks);