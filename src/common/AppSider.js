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
            <Sider className="app-sider" style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                <Menu
                      style={{ height: '100%', width: 256}}
                      theme={'light'}
                      className="sider-menu"
                >
                    <Menu.Item key="/home/dashboard">
                        <Icon type="dashboard" />
                        <span><Link style={{ color: 'rgb(72, 74, 78)', textDecoration: 'none' }} to="/home/dashboard">Dashboard</Link></span>
                    </Menu.Item>
                    <Menu.Item key="/home/mylinks">
                        <Icon type="profile" />
                        <span><Link to="/home/mylinks" style={{ color: 'rgb(72, 74, 78)', textDecoration: 'none' }}>My Links</Link></span>
                    </Menu.Item>
                    <Menu.Item key="/createlinks">
                        <Icon type="tool" />
                        <span><Link to="/home/createlinks" style={{ color: 'rgb(72, 74, 78)', textDecoration: 'none' }}>Create Links</Link></span>
                    </Menu.Item>
                    <Menu.Item key="home/stats">
                        <Icon type="pie-chart" />
                        <span><Link to="/home/stats" style={{ color: 'rgb(72, 74, 78)', textDecoration: 'none' }}>Statistics</Link></span>
                    </Menu.Item>
                </Menu>
            </Sider>

        );
    }
}

export default AppSider