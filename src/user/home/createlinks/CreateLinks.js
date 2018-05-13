import React, { Component } from 'react';
import { Table, Form, Input, Icon, Button, Card, Col, Row } from 'antd';
import {
    withRouter
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
            <Layout style={{ padding: '0 0px 0px', background: '#ECECEC' }}>
                <Content style={{ margin: '24px 20px 0' }}>
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
        this.handleSubmit = this.handleSubmit.bind(this);
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

    removeAll = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const names = form.getFieldValue('names');
        console.log(keys);
        console.log(names);
        form.resetFields();
        form.setFieldsValue({names: names.splice(0,names.length)});
        const keys1 = form.getFieldValue('keys');
        const names1 = form.getFieldValue('names');
        console.log(keys1);
        console.log(names1);
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
            if (!values.names){return;}
            if (!err) {
                let createFormRequest = {urls:values.names.filter(name => name !== null)};
                createLink(createFormRequest).then(response => {
                       this.props.onCreate(response.generatedLinks);
                    }).catch(error => {
                    notification.error({
                        message: 'SYL',
                        description: 'Failed to create links!'
                    })

                });
                this.removeAll();
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