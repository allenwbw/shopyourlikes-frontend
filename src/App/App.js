import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Menu, Icon, Layout, notification } from 'antd';
import { ACCESS_TOKEN } from "../constants";
import { getCurrentUser } from "../util/APIUtils";
import Login from '../user/login/Login';
import AppHeader from '../common/AppHeader'
import {
    Route,
    withRouter,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';
import Home from '../user/home/Home'

const { Content, Sider, Header } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });

    }
    // componentWillMount() {
    //     this.loadCurrentUser();
    // }


    loadCurrentUser() {
        this.setState({isLoading: true});
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
                this.setState({isLoading: false});
        });
    }

    handleLogin() {
        notification.success({
            message: 'SYL App',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'SYL',
            description: description,
        });
    }

    componentWillMount() {
        this.loadCurrentUser();
    }


    render() {
        if(this.state.isLoading){
            return <div />
        }

        return (
            <Layout className="app-container">
                {/*<Header className="app-header">*/}
                    {/*<div className="app-title" >*/}
                        {/*<Link style={{ textDecoration: 'none' }} to="/">SYL</Link>*/}
                    {/*</div>*/}
                {/*</Header>*/}
                <AppHeader isAuthenticated={this.state.isAuthenticated}
                           currentUser={this.state.currentUser}
                           onLogout={this.handleLogout} />
                <Switch>
                    <Route exact path="/"
                           render={(props) => this.state.isAuthenticated? <Redirect to="/home"/> : <Login onLogin={this.handleLogin} {...props} />}>
                    </Route>
                    <Route path="/home"
                        render={(props) => this.state.isAuthenticated?
                            (<Home isAuthenticated={this.state.isAuthenticated}
                                   currentUser={this.state.currentUser} {...props}/>)
                                :(<Redirect to="/"/>)}>
                    </Route>
                </Switch>
            </Layout>
        )
    }

  // render() {
  //
  //   return (
  //       <Layout>
  //       <div  style={{ width: 256 }}>
  //           <Menu id={"full"} mode="vertical"
  //                 theme="dark">
  //               <Menu.Item key="1">
  //                   <Icon type="dashboard" />
  //                   <span><a href={"#"}>Option 1</a></span>
  //               </Menu.Item>
  //               <Menu.Item key="2">
  //                   <Icon type="desktop" />
  //                   <span>Option 2</span>
  //               </Menu.Item>
  //               <Menu.Item key="3">
  //                   <Icon type="inbox" />
  //                   <span>Option 3</span>
  //               </Menu.Item>
  //           </Menu>
  //       </div>
  //       </Layout>
  //   );
  // }
}

export default withRouter(App);
