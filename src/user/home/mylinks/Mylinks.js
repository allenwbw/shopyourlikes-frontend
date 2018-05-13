import React, { Component } from 'react';
import { Layout, Table, Card, Col, Row } from 'antd';
import {
    withRouter,
} from 'react-router-dom';
import {getAllLinks} from "../../../util/APIUtils";

const { Content } = Layout;

class Mylinks extends Component {
   constructor(props){
       super(props);
       this.state = {
           links: [],
           page: 0,
           size: 5,
           totalElements: 0,
           totalPages: 0,
           last: true,
           isLoading: false
       };
       this.loadLinks = this.loadLinks.bind(this);
   }
    componentWillMount() {
        this.loadLinks();
    }
    loadLinks(page = 0, size = 30){
        let promise;
        promise = getAllLinks(page,size);
        if (!promise) {
            return;
        }

        this.setState({isLoading: true});
        promise
            .then(response => {
                this.setState({
                    links: this.state.links.concat(response.content),
                    page: response.page,
                    size: response.size,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last,
                })
            }).catch(error => {
            this.setState({
                isLoading: false,
                last: true
            })
        });
        if (!this.state.last) {
            this.loadLinks(this.state.page + 1);
        } else {
            this.setState({
                isLoading: false
            });
        }
    }
    render() {
        let totalEarning = 0, totalClicks = 0;
        let tableKey = 0;
        this.state.links.forEach(function (elem) {
            totalEarning += elem.earnings;
            totalClicks += elem.redirects;
        });
        const dataSource = this.state.links;
        const columns = [{
            title: 'URL',
            dataIndex: 'originalUrl',
            key: 'url',

        },{
            title: 'Earnings',
            dataIndex: 'earnings',
            key: 'earnings',
        },{
            title: 'clicks',
            dataIndex: 'redirects',
            key: 'clicks',
        },{
            title: 'Merchant',
            dataIndex: 'merchantId',
            key: 'merch'
        },{
            title: 'Date created',
            dataIndex: 'creationDate',
            key: 'date'
        }];
        return (
            <Layout style={{ padding: '0 0px 0px', background: '#ECECEC' }}>
                <Content style={{ margin: '24px 20px 0' }}>
                    <div className="content-container" style={{ background: '#ECECEC', padding: '20px' }}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card title="Your links">
                                    <Table rowKey={() => {tableKey += 1;tableKey}} dataSource={dataSource} columns={columns} />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default withRouter(Mylinks);