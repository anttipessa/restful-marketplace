const itemlist = (state = [], action) => {
    switch (action.type) {
      case 'SET_ITEMS':
        state=action.data
        return state
      default:
        return state
    }
}
export default itemlist