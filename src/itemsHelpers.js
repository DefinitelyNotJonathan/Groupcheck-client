export const findList = (lists=[], listId) =>
  lists.find(list => list.id === listId)

export const findItem = (items=[], itemId) =>
  items.find(item => item.id === itemId)

export const getItemsForList = (items=[], listId) => (
  (!listId)
    ? items
    : items.filter(item => item.listId === listId)
)

const getAllLists = (lists=[]) => {
  return lists

}

export const countItemsForList = (items=[], listId) =>
  items.filter(item => item.listId === listId).length

export default getAllLists()