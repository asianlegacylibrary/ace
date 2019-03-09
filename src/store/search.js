import { client } from './es'
import { log } from '../store/actions'

//const index = 'titles'
const index = ['volumes', 'titles', 'uuree']
const type = '' // 'data'
const size = 10


////{ colophon: { fragment_size: 108 } },

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

	const fields = [
            `Full Title (native language)*^10`, 
            `Colophon-tugsguliin ug*^3`, 
			`Author's name (transliterated)*^14`,
			`Colophon`,
			`-*`,
			`Title`,
			`Title in Tibetan`,
			`NLM Catalog #`,
			`Author`
    ]
	
	const multiMatchPhrase = {
		query: term,
		type: 'phrase',
		fields: fields
	}

	const high = {
		require_field_match: false,
		fields: {
			Colophon: {}
		},
		pre_tags: ['<yo>'],
		post_tags: ['</yo>']
	}

	const colo = `Colophon-tugsguliin ug`

	const highlight_108 = {
		//require_field_match: false,
		fields: { 
			Colophon: {},
			[colo]: {}
			//,[`Full Title (native language)`]: {}
		},
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
	//log('the body of phrase match ', body);
	const b = client.search({index, type, body})
	log('logging client.search pre return ', b)
	return client.search({index, type, body})
}