export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export const initialState = {
    count: 0,
    activeTab: 'config',
    defaultLanguage: 'en'
}

export const randomIIIFimages = [
    "http://iiif.bdrc.io/bdr:V1KG10720_I1PD153371::I1PD1533710003.jpg/full/full/0/default.jpg",
    "http://iiif.bdrc.io/bdr:V22344_I1KG5205::I1KG52050003.jpg/full/full/0/default.jpg",
    "http://iiif.bdrc.io/bdr:V22677_I1KG1714::I1KG17140003.jpg/full/full/0/default.jpg",
    "http://iiif.bdrc.io/bdr:V1GS135873_I1KG1258::I1KG12580003.jpg/full/full/0/default.jpg"
]

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
}

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
