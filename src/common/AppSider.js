import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    withRouter
} from 'react-router-dom';
import './AppSider.css';

import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;


class AppSider extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({ key }) {
        this.props.history.push(key);
    }

    render() {
        return (
            <Sider
                  className="app-sider"
                  breakpoint="lg"
                  collapsedWidth="0"
                  style={{position: 'fixed', height: '100vh' }}
                  >
                <Menu
                      style={{ height: '100%'}}
                      mode={"inline"}
                      theme={'light'}
                      selectedKeys={[this.props.location.pathname]}
                      selected
                      className="sider-menu"
                      onClick={this.handleMenuClick}
                >
                    <Menu.Item key="/home/dashboard">
                        <Icon type="dashboard" />
                        <span>Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="/home/mylinks">
                        <Icon type="profile" />
                        <span>My Links</span>
                    </Menu.Item>
                    <Menu.Item key="/home/createlinks">
                        <Icon type="tool" />
                        <span>Create Links</span>
                    </Menu.Item>
                    <Menu.Item key="/home/stats">
                        <Icon type="pie-chart" />
                        <span>Statistics</span>
                    </Menu.Item>
                </Menu>
            </Sider>

        );
    }
}

export default withRouter(AppSider);