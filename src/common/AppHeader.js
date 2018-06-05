import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;



/** Component that renders page header **/
class AppHeader extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    /**
     * Callback function called when user clicks menu elements, calls function from parent component
     * @param {String} key - key of menu elements
     * */
    handleClick({ key }) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }
    render(){
        let menuItems
        if(this.props.currentUser) {
            menuItems = [
                <Menu
                    className="app-menu"
                    mode="horizontal"
                    selectedKeys={[this.props.location.pathname]}
                    theme="light"
                    style={{ lineHeight: '63px' }} >
                    <Menu.Item key="/profile" className="profile-menu">
                        <ProfileDropdownMenu
                            currentUser={this.props.currentUser}
                            handleClick={this.handleClick}/>
                    </Menu.Item>
                </Menu>
            ];
        } else {
            menuItems = [];
        }

        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title" >
                        <Link to="/">SYL</Link>
                    </div>
                    {menuItems}
                </div>
            </Header>
        );
    }
}
/** Function to render a dropdown menu on header */
function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.userId}
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer = {() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
            </a>
        </Dropdown>
    );
}

export default withRouter(AppHeader);