import React from 'react'
import {Redirect} from 'react-router-dom'
import Item from '../Item/item'
import ApiContext from '../ApiContext'
// import {getItemsForList} from '../itemsHelpers'
import PropTypes from 'prop-types'
import ListMainNav from './listMainNav'


class ListMain extends React.Component {
  // static defaultProps = {
  //   match: {
  //     params: {}
  //   }
  // }
  static contextType = ApiContext

  constructor(props){
    super(props);
    this.state={
        toLogin:false
    }
  }  

  componentDidMount(){
    const {listId} = this.props.match.params
    console.log('listMain component mounted')
    console.log('listId is')
    console.log(listId)
    // console.log(this.state.lists);
    // console.log(this.state.lists);

          //IF STATEMENT FOR CHECKING IF SESSION IS PRESENT

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

    fetch('http://localhost:8000/api/items/'+listId,{
        credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      console.log('this is data of lists: ')
      console.log(data)
      this.context.setItems(data)
    })
}

  render() {
    if(this.state.toLogin===true){
      return <Redirect to='/login'/>
    }
    console.log(this.context)
    let items = this.context.items
    console.log('CONTEXT ITEMS')
    console.log(items)
    return (
      <section className='ItemListMain'>
        <ListMainNav/>
        <ul>
          {items.map(item => 
            <li key={item.id}>
              <Item
                id={item.id}
                list_id={item.list_id}
                name={item.name}
                priority={item.priority}
                content={item.content}
              />
            </li>
          )}
        </ul>        
      </section>
    )
  }
}

ListMain.propTypes={
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default ListMain;
