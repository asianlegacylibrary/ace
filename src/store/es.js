import elasticsearch from 'elasticsearch'
import { log } from './actions'
import { config } from './config'

const port = config.esPort
const host = config.esHost
let isConnected = false
let healthStatus = 'red'

log('our es host is: ', host)

const client = new elasticsearch.Client({
	host: {
		protocol: 'http',
		host: host,
		port: port,
		path: ''
	},
	log: 'info' //'trace'
})

const checkConnection = async () => {
	log('process.env.NODE_ENV ', host)
	while(!isConnected) {
		log('Connnnnecting....')
		while(healthStatus === 'red') {
			log('awaiting green light')
			try {
				const health = await client.cluster.health({})
				log('health: ', health)
				healthStatus = health.status
				isConnected = true
			} catch (err) {
				console.error('Connection yo, is failing...', err)
				isConnected = false
			}
		}
	}
	return isConnected
}

export { client, checkConnection }