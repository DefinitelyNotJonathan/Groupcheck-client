import React from 'react'
import ApiContext from '../ApiContext'

class AddItem extends React.Component {
    static contextType=ApiContext;

    handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);

        fetch('http://localhost:8000/api/users/:user_id/lists/:list_id', {
            method: 'POST',
            body: data,
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        //need to navigate to home page from here
    }

    render() {

        const lists = this.context.lists;
        return (
            <div>
                <form onSubmit={((e)=> {
                e.preventDefault();
                let data = {
                    key: e.target.itemName.value,
                    id:null,
                    name: e.target.itemName.value,
                    priority: e.target.itemPriority.value,
                    listId: e.target.listId.value,
                    content: e.target.itemContent.value
                }
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
                this.context.addItem(data)
                this.props.history.goBack();
//
                // fetch(`${config.API_ENDPOINT}/items`, {
                //     method: 'POST',
                //     headers: {
                //     'content-type': 'application/json'
                //     },
                //     body: JSON.stringify(data),
                // })
                //     .then(res => {
                //     if (!res.ok)
                //         return res.json().then(e => Promise.reject(e))
                //     return res.json()
                //     })




                    // //
                    // .catch(error => {
                    // console.error({ error })
                    // }) 
                
            } )}>
                
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