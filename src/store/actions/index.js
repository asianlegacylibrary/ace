export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export const initialState = {
    count: 0,
    activeTab: 'volume',
    defaultLanguage: 'en'
}

export const SET_TAB = 'SET_TAB'
export const setTab = tab => ({
    type: SET_TAB,
    tab
})

export const SET_LANG = 'SET_LANG'
export const setLanguage = language => ({
    type: SET_LANG,
    language
})
