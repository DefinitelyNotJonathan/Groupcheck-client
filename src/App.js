import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListMain from './List/listMain';
import ApiContext from './ApiContext';
import AddList from './List/addList';
import AddItem from './Item/addItem';
import ShareList from './share/shareList';
import ErrorBoundary from './ErrorBoundary';
import HomePage from './homePage/homePage';
import Login from './login/login';
import SignUp from './signUp/signUp';
import './App.css'
import LogoutButton from './LogoutButton';


class App extends Component {
  state = {
    items: [],
    lists: [],
    sharedLists: [],
    user: {},
    currentList: []
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/lists/:listId" component={ListMain} />
        <Route path="/add-list" component={AddList} />
        <Route path="/add-item" component={AddItem} />
        <Route path="/share-list" component={ShareList} />
      </>
    );
  }

  handleDeleteItem = (id) => {
    let newItems = this.state.items.filter(item => item.id !== id)
    this.setState({
      items: newItems
    });
  }

  handleDeleteList = (id) => {
    let newItems = this.state.items.filter((item) => item.listId !== id);
    let newLists = this.state.lists.filter((list) => list.id !== id);
    this.setState({
      items: newItems
    });
    this.setState({
      lists: newLists
    });
  }
  render() {
    const value = {
      items: this.state.items,
      lists: this.state.lists,
      sharedLists: this.state.sharedLists,
      user: this.state.user,
      currentList: this.state.currentList,
      deleteItem: this.handleDeleteItem,
      deleteList: this.handleDeleteList,
      addItem: (item) => {
        console.log(item);
        this.state.items.push(item);
        this.setState(this.state);
      },
      addList: (list) => {
        this.state.lists.push(list);
        this.setState(this.state);
      },
      setUser: (user) => {
        this.setState({ user: user });
      },
      setLists: (data) => {
        this.setState({ lists: data });
      },
      setSharedLists: (data) => {
        this.setState({ sharedLists: data });
      },
      setItems: (data) => {
        this.setState({ items: data })
      },
      setCurrentList: (data) => {
        this.setState({ currentList: data })
      }
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <header className="App__header">
            <h1>
              GroupCheck
            </h1>
            <Route path="/" component={LogoutButton} className="logout" />
          </header>
          <ErrorBoundary errorMessage='could not display MainRoutes'>
            <main className="App__main">{this.renderMainRoutes()}
            </main>
          </ErrorBoundary>

        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;