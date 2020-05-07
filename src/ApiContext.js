import React from 'react'

export default React.createContext({
  items:[],
  lists: [],
  user: {},
  currentList: [],
  addList: () => {},
  addItem: () => {},
  deleteItem: () => {},
  deleteList: () => {},
  setUser: () => {},
  setLists: () => {},
  setItems: () => {},
  setCurrentList: () => {},
})