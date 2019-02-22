import { client, log } from './es'
const index = 'titles'
//const index = ['volumes', 'titles', 'uuree']
const type = '' // 'data'
const size = 10

export const phraseTerm = (term, offset) => {

	// const aggregations = {
	// 	data: {
	// 		terms: { field: 'authortib.keyword', size: size, order: { max_score: 'desc' } },
	// 		aggregations: { max_score: { max: { script: '_score' } } }
	// 	}
	// };

	// const filter = {
	// 	bool: { should: [ filterClause ] }
	// };
	
	const multiMatchPhrase = {
		query: term,
		type: 'phrase',
		fields: [
            `Full Title (native language)*^10`, 
            `Colophon-tugsguliin ug*^3`, 
            `Author's name (transliterated)*^14`
        ]
	}

	const highlight_108 = {
		fields: { tibtext: { fragment_size: 108 } },
		pre_tags: ['<yo>'],
		post_tags: ['</yo>']
	}

	const body = {
		from: offset,
		size: size,
		//aggregations: aggregations,
		query: {
			bool: {
				//filter: filter,
				must: [{ multi_match: multiMatchPhrase }] //mustMultiMatchPhrase
			}
		},
		highlight: highlight_108
		
	}
	//console.log('the body of phrase match ', body);
	const b = client.search({index, type, body})
	console.log('logging client.search pre return ', b)
	return client.search({index, type, body})
}