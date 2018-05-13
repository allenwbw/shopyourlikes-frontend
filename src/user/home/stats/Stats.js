import React, { Component } from 'react';
import { Layout, Card, Col, Row } from 'antd';
const { Content } = Layout;

class Stats extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Layout style={{ padding: '0 0px 0px', background: '#ECECEC' }}>
                <Content style={{ margin: '24px 20px 0' }}>
                    <div className="content-container" style={{ background: '#ECECEC', padding: '20px' }}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card title={<span style={{fontSize: '2em'}}>Statistics</span>}>
                                    <span style={{fontSize: 'large'}}>Coming soon!</span>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Stats;