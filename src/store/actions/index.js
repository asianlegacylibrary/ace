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

// EXAMPLE MANIFESTS ################################
export const bdrcManifest = `http://presentation.bdrc.io/2.1.1/v:bdr:V1KG10720_I1PD153371/manifest`
export const princetonManifest = `https://figgy.princeton.edu/concern/scanned_resources/6c73166e-254c-4f3d-a176-8583c63ff9da/manifest`
export const nomadCollection = `https://nomad-project.co.uk/objects/collection/index.json`
export const nomadManifest = `https://nomad-project.co.uk/objects/collection/gold-broach/index.json`

export const bdrc = [
    `http://presentation.bdrc.io/2.1.1/collection/i:bdr:I1KG1132`,
    `http://presentation.bdrc.io/2.1.1/collection/i:bdr:I1KG10720`,
    `http://presentation.bdrc.io/2.1.1/collection/i:bdr:I1GS135873`,
    `http://presentation.bdrc.io/2.1.1/v:bdr:V1KG5200_I1KG5250/manifest`,
    `http://presentation.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest`,
    `http://presentation.bdrc.io/2.1.1/v:bdr:V1KG1279_I1KG1288/manifest`
]
// ####################################################


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

// check if the BDRC image server is up (it's down a lot these days!)
export const checkBDRC = async () => {
    try {
        const response = await fetch(bdrcManifest)
        if(response.ok) { return true }
        console.log(response.status)
        throw new Error(response.status)
    } catch (e) {
        if(e instanceof TypeError) {
            console.log('typeerror', e)
            return false
        } else {
            console.log('error', e)
            return false 
        }
    }
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

export const CURRENT_BG_POS = 'CURRENT_BG_POS'
export const currentBGpos = ({x, y}) => ({
    type: CURRENT_BG_POS,
    viewer: {
        x,
        y
    }
})
