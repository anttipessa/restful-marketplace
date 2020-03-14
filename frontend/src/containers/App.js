import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { postLogout, postLogin } from '../actions/login';
import {
  VIEW_MAIN_PAGE,
  VIEW_ITEMS_ALL,
  VIEW_ITEMS_OWN,
  VIEW_ITEMS_OFFERS,
  VIEW_USERS,
  VIEW_USER_INFO
} from '../constants/action-types';
import Nav from '../components/Nav';
import ItemList from '../components/ItemList';
import SalesList from '../components/SalesList';
import OwnItems from '../components/OwnItems';
import OfferList from '../components/OfferList'
import UserInfo from '../components/UserInfo';
import UserList from '../components/UserList';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser,
    view: state.viewFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postLogout: () => dispatch(postLogout()),
    postLogin: (url, payload) => dispatch(postLogin(url, payload))
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: false,
      alertMsg: '',
      registerDialog: false,
      loginDialog: false,
    }
  }

  openRegisterForm = () => {
    this.setState({ registerDialog: true })
  }

  closeRegisterForm = () => {
    this.setState({ registerDialog: false })
  }

  registerOk = () => {
    this.setState({
      alert: true,
      alertMsg: 'Registration succesful, you can now log in with your credentials.',
      registerDialog: false })
  }

  loginOk = () => {
    this.setState({
      alert: true,
      alertMsg: 'Login succesful!',
      loginDialog: false
    })
  }

  logoutOk = () => {
    this.setState({
      alert: true,
      alertMsg: 'Logout succesful!'
    })
  }

  openLoginForm = () => {
    this.setState({ loginDialog: true })
  }

  closeLoginForm = () => {
    this.setState({ loginDialog: false })
  }

  // Define which component to render on the App
  view = () => {
    switch (this.props.view) {
      case VIEW_MAIN_PAGE:
        return <SalesList />
      case VIEW_USER_INFO:
        return <UserInfo />
      case VIEW_ITEMS_ALL:
        return <ItemList />
      case VIEW_ITEMS_OFFERS:
        return <OfferList />
      case VIEW_ITEMS_OWN:
        return <OwnItems />
      case VIEW_USERS:
        return <UserList />
      default:
        return <SalesList />
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Nav
          registerClick={this.openRegisterForm}
          loginClick={this.openLoginForm}
          logoutClick={this.props.postLogout}
          logout={this.logoutOk}
          role={this.props.user.user.role}
        />
        <Collapse in={this.state.alert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  this.setState({ alert: false });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {this.state.alertMsg}
            </Alert>
        </Collapse>
        {this.view()}

        {this.state.registerDialog ?
          <RegisterForm
            open={this.state.registerDialog}
            close={this.closeRegisterForm}
            register={this.registerOk}
          /> : ''}
        {this.state.loginDialog ?
          <LoginForm
            open={this.state.loginDialog}
            close={this.closeLoginForm}
            login={this.props.postLogin}
            checkLogin={this.loginOk}
          /> : ''}

      </Container>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Page)
export default App;
