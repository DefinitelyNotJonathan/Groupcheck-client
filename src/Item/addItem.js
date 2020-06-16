import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'


// class ListItem {
//     constructor(
//         key,
//         id,
//         name,
//         content,
//         priority, 
//         list_id,
//         user_id,    
//     ){}

//   }


class AddItem extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props)
        this.state = {
            toLogin: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        //IF STATEMENT FOR CHECKING IF SESSION IS PRESENT

        fetch(`${config.API_ENDPOINT}/api/lists/`, {
            credentials: 'include'
        })
            .then(data => {
                if (data.status === 403) {
                    this.setState({
                        toLogin: true
                    })
                }
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            key: e.target.itemName.value,
            name: e.target.itemName.value,
            priority: e.target.itemPriority.value,
            list_id: this.context.currentList,
            content: e.target.itemContent.value
        }
        const stringId = String(data.list_id)
        console.log('handlesubmit, context below')
        console.log(this.context)
        console.log(data)
        if (data.name === '') {
            alert('please complete the required fields');
            return false;
        } else if (data.content === '') {
            alert('please complete the required fields');
            return false;
        } else if (data.priority === '') {
            alert('please complete the required fields');
            return false;
        }
        fetch(`${config.API_ENDPOINT}/api/items/` + stringId, {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((item) => {
                console.log('response item')
                console.log(item)
                this.context.addItem(item)
                console.log('did call this.context.setUser()');
                console.log('check user state:');
                console.log(this.context.items);
                this.props.history.goBack();
            })
    }

    render() {
        if (this.state.toLogin === true) {
            return <Redirect to='/login' />
        }
        return (
            <div className="AddItem_container">
                <Link
                    className='button back'
                    to={{
                        pathname: '/',
                    }}
                >
                    Back
                 </Link>

                <form onSubmit={this.handleSubmit} className="AddItem_form">

                    <label htmlFor='nameInput' className="AddItem_label">item name*</label>
                    <input id='nameInput' type="text" name="itemName" placeholder="New Item Name" className="AddItem_input"></input>
                    <label htmlFor='contentInput' className="AddItem_label">item content*</label>
                    <textarea id='contentInput' type="text" name="itemContent" className="AddItem_textarea"></textarea>
                    <label htmlFor="itemPriority" className="AddItem_label">Priority*</label>

                    <select name="itemPriority" id="AddItem_priority"
                    >
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <button className="AddItem_button">Create Note</button>
                </form>
            </div>




        )
    }
}

export default AddItem;