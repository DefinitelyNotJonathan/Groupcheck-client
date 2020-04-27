import React from 'react'
import {Redirect} from 'react-router-dom'
import ApiContext from '../ApiContext.js'

class AddList extends React.Component {
    static contextType=ApiContext;

    constructor(props){
        super(props);
        this.state={
            toLogin:false
        }
        this.handleSubmit= this.handleSubmit.bind(this);
    }
componentDidMount(){
          //IF STATEMENT FOR CHECKING IF SESSION IS PRESENT
console.log('ADD LIST state before the fetch')
console.log(this.state)
    fetch('http://localhost:8000/api/lists/', {
        credentials: 'include'
    })
    .then (data => {
        if (data.status === 403) {
            this.setState({
            toLogin:true
            })
        }
    })
}

handleSubmit(e) {
    e.preventDefault();
    let data = {
        name: e.target.listName.value,
        author: this.context.user.id
    }
    if(data.name === '') {
        alert('please complete the required fields');
        return false;
        }
    // fetch(`${config.API_ENDPOINT}/lists`, {
    fetch('http://localhost:8000/api/lists/', {
        method: 'POST',
        credentials: 'include',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
    })
    .then(list => {
        this.context.addList(list)
        this.props.history.push('/');
    })
    .catch(error => {
        console.error({ error })
    }) 
}
    render() {
        if(this.state.toLogin===true){
            return <Redirect to='/login'/>
          }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

            <label htmlFor='nameInput'>list name*</label>
            <input id='nameInput' type="text" name="listName" placeholder="New List Name"></input>        
            <button type="submit">Create List</button>
        </form>
    <button role='link'
          onClick={() => this.props.history.goBack()}
          className='cancel-button'
        >
          Cancel
        </button>
            </div>
    )}
}

export default AddList;