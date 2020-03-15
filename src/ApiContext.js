import React from 'react'

export default React.createContext({
  items:[],
  lists: [],
  addList: () => {},
  addItem: () => {},
  deleteItem: () => {},
  deleteList: () => {},
  setUser: () => {},
  setLists: () => {},
  user: {}
})