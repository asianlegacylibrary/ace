import * as types from '../types'

export const initialState = {
    count: 0,
    activeTab: 'config',
    defaultLanguage: 'en',
    index: 'titles'
}

export const log = (...msgs) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(...msgs)
	}
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
export const checkIIIFserver = () => {
    return async dispatch => {
        dispatch({type: types.REQUEST_SERVER})
        try {
            await fetch(bdrcManifest)
            return dispatch(receiveServer(bdrc[getRandomInt(0, bdrc.length - 1)]))
        } catch(e) {
            if(e instanceof TypeError) {
                console.error('typeerror', e)
            } else {
                console.error('error', e)
            }
            return dispatch(receiveServer(princetonManifest))
        }
    }
}

export const parseVolumeManifest = (manifestURL) => {
    return async dispatch => {
        dispatch({type: types.REQUEST_MANIFEST})
        try {
            const response = await fetch(manifestURL)
            const data = await response.json()
            return dispatch(receiveManifest(data))
        } catch (error) {
            return dispatch(receiveError(error, manifestURL))
        }
    }
}


export function receiveManifest(data) {
    //reshape data here...
    // const id = data['@id']
    // const context = data['@context']
    // const manifestType = data['@type']
    
    return {
        type: types.RECEIVE_MANIFEST,
        item: data,
        receivedAt: Date.now()
    }
}


function receiveError(e, url) {
    return {
        type: types.RECEIVE_ERROR,
        error: e,
        url: url,
        receivedAt: Date.now() 
    }
}


export function receiveServer(url) {
    let server, resource
    if(url === '') {
        server = ''
        resource = ''
    } else {
        server = new URL(url).host
        resource = new URL(url).pathname
    }
    return {
        type: types.RECEIVE_SERVER,
        url: url, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        server: server,
        resource: resource,
        receivedAt: Date.now()
    }
}

export const setTab = tab => ({ type: types.SET_TAB, tab })
export const setLanguage = language => ({ type: types.SET_LANG, language })
export const setItem = item => ({ type: types.SET_CURRENT_ITEM, item })

export const currentBGpos = ({x, y}) => ({
    type: types.CURRENT_BG_POS,
    viewer: {
        x,
        y
    }
})
