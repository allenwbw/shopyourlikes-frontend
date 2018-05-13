import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    Link
} from 'react-router-dom';
import './AppSider.css';

import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;


class AppSider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sider
                  breakpoint="lg"
                  collapsedWidth="0"
                  style={{position: 'inline'}}
                  >
                <Menu
                      style={{ height: '100%'}}
                      mode={"inline"}
                      theme={'light'}
                      defaultSelectedKeys={['1']}
                      className="sider-menu"
                >
                    <Menu.Item key="1">
                        <Icon type="dashboard" />
                        <span><Link style={{ color: 'rgb(72, 74, 78)', textDecoration: 'none' }} to="/home/dashboard">Dashboard</Link></span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="profile" />
                        <span><Link to="/home/mylinks" style={{ color: 'rgb(72, 74, 78)', textDecoration: 'none' }}>My Links</Link></span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="tool" />
                        <span><Link to="/home/createlinks" style={{ color: 'rgb(72, 74, 78)', textDecoration: 'none' }}>Create Links</Link></span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="pie-chart" />
                        <span><Link to="/home/stats" style={{ color: 'rgb(72, 74, 78)', textDecoration: 'none' }}>Statistics</Link></span>
                    </Menu.Item>
                </Menu>
            </Sider>

        );
    }
}

export default AppSider