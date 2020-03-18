import React from 'react'
import ApiContext from '../ApiContext'

class AddItem extends React.Component {
    static contextType=ApiContext;

    constructor(props){
        super(props)
        this.handleSubmit=this.handleSubmit.bind(this)
    }


    handleSubmit(e){
        e.preventDefault();
        let data = {
            key: e.target.itemName.value,
            name: e.target.itemName.value,
            priority: e.target.itemPriority.value,
            list_Id: e.target.listId.value,
            user_Id: this.context.user.id,
            content: e.target.itemContent.value
        }
        console.log(data)
        if(data.name === '') {
            alert('please complete the required fields');
            return false;
        } else if(data.content === '') {
            alert('please complete the required fields');
            return false;
        } else if(data.priority === '') {
            alert('please complete the required fields');
            return false;
        }
        fetch('http://localhost:8000/api/items/' + data.list_Id, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
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

    // handleSubmit(e){
    //     e.preventDefault();
    //     // console.log('hello')
    //     console.log(e.target)
        
    //     const data = new FormData(e.target);
    //     let sendData = {};
    //     for (var key of data.entries()) {
    // 			console.log(key[0] + ', ' + key[1]);
    //       sendData[key[0]] = key[1];
    //     }
    //     console.log('sendData:');
    //     console.log(sendData);
                    // fetch(`${config.API_ENDPOINT}/items`, {

    // }

    render() {

        const lists = this.context.lists;
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                
                <label htmlFor='nameInput'>item name*</label>
                <input id='nameInput' type="text" name="itemName" placeholder="New Item Name"></input>
                <label htmlFor='contentInput'>item content*</label>
                <textarea id='contentInput' type="text" name="itemContent"></textarea>
                <label htmlFor="itemPriority">Priority*</label>
                <select name="itemPriority" id="priority">
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <select name="listId" >
                    {lists.map((list)=> {
                        return (
                            <option key={list.id} value={list.id}>
                                {list.name}
                            </option>
                        )
                    })}
                </select>
                <button>Create Note</button>
            </form>
            <button role='link'
                onClick={() => this.props.history.goBack()}
                className='cancel-button'>
                Cancel
            </button>
            </div>


            

        )
    }
}

export default AddItem;