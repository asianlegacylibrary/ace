export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export const initialState = {
    count: 0,
    activeTab: 'Volume'
}

export const SET_TAB = 'SET_TAB'
export const setTab = tab => ({
    type: SET_TAB,
    tab
})

