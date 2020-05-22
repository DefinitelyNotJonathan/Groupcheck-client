import React from 'react'

export default React.createContext({
  items:[],
  lists: [],
  sharedLists: [],
  user: {},
  currentList: [],
  addList: () => {},
  addItem: () => {},
  deleteItem: () => {},
  deleteList: () => {},
  setUser: () => {},
  setLists: () => {},
  setSharedLists: () => {},
  setItems: () => {},
  setCurrentList: () => {},
})