const logger = store => next => action => {
    console.group(action.type)
    console.log('%c DISPATCHING ++++++++++', 'color:green;')
    console.info(action)
    let result = next(action)
    console.log('%c NEXT STATE +++++++++++', 'color:red;')
    console.log(store.getState())
    console.groupEnd()
    return result
  }
  
  export default logger
