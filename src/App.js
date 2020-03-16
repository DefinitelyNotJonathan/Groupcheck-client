import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ListMain from './List/listMain';
import ApiContext from './ApiContext';
import STORE from './store';
import AddList from './List/addList';
import AddItem from './Item/addItem';
import ErrorBoundary from './ErrorBoundary';
import LandingPage from './landingPage/landingPage';
import HomePage from './homePage/homePage';
import Login from './login/login';
import SignUp from './signUp/signUp';


class App extends Component {
  state = {
    items: [],
    lists: [],
    user: {},
    currentList:[]
  }
    componentDidMount() {

      this.setState(STORE);
      console.log('App Ready');
      // output app state to view starting values
      console.log(this.state);
    }

    renderMainRoutes() {
        return (
            <>
              <Route exact path="/" component={LandingPage} />
              <Route path = "/login" component={Login} />
              <Route path = "/signup" component={SignUp} />
              <Route exact path = "/home" component={HomePage} />
              <Route exact path = "/list/:listId" component = {ListMain} />
              <Route path="/add-list" component={AddList} />
              <Route path="/add-item" component={AddItem} />

            </>
        );
    }

    handleDeleteItem = (id) => {
        console.log("handleDeleteItem", id);
        // if(this.state.items){
        //     console.log(this.state.items);
        // }
        this.setState({
            items: this.state.items.filter(item => item.id !== id)
        });

    }

    handleDeleteList = (id) => {
        console.log('handleDeleteList', id);
        console.log(this.state.lists);
        // this.state.items.filter((item) => {
        //     console.log(item.listId + '!==' + id, item.listId !== id);
        //     return item.listId !== id;
        // });
        let newItems = this.state.items.filter((item) => item.listId !== id);
        let newLists = this.state.lists.filter((list) => list.id !== id);
        console.log(newItems);
        console.log(newLists);
        this.setState({
            items: newItems
        });
        this.setState({
            lists: newLists
        });
        console.log(this.state.items);
        console.log(this.state.lists);
    }
    render() {
        const value = {
          items: this.state.items,
          lists: this.state.lists,
          user: this.state.user,
          currentList: this.state.currentList,
          deleteItem: this.handleDeleteItem,
          deleteList: this.handleDeleteList,
          addItem: (item) => {
              console.log(item);
              item.id = Math.floor(Math.random()*1E16).toString();
              this.state.items.push(item);
              this.setState(this.state);
          },
          addList: (list) => {
            list.id = Math.floor(Math.random()*1E16).toString();
            this.state.lists.push(list);
            this.setState(this.state);
          },
          setUser: (user)=> {
            this.setState({ user: user });
            console.log('did update user state')
          },
          setLists: (data) => {
            this.setState({ lists: data });
            console.log('did update user lists')
            console.log('this.state.lists: ')
            console.log (this.state.lists)
          },
          setItems: (data) => {
            this.setState({ items: data })
            console.log('did update user items')
            console.log('this.state.items: ')
            console.log(this.state.items)
          },
          setCurrentList: (data) => {
            this.setState({ currentList: data })
            console.log('did set current list')
            console.log('this.state.currentList')
          }
        };

        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                        <header className="App__header">
                            <h1>
                                GroupCheck
                            </h1>
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