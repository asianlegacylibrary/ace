

// const y = t('tabs').hasOwnProperty(label)
//const x = Object.keys(languages).find(key => languages[key] === a.acf.language)
// const x = Object.entries(t('tabs')).find(([k, l]) => t('tabs')[l] === label )
// const xx = Object.entries(t('tabs')).find(obj => Object.keys(obj).some(key => obj[key].includes(label)))
// const zz = Object.entries(t('tabs')).some(([k, v]) => k === label)
// console.log(zz, t('tabs')[xx[0]], t('tabs')[label])


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }