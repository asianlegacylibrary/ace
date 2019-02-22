import elasticsearch from 'elasticsearch';

const port = 9200;
const host = process.env.NODE_ENV === 'production' ? '157.230.172.69' : 'localhost';
//const host = '157.230.172.69'
let isConnected = false;
let healthStatus = 'red';

console.log(host);

const log = (...msgs) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(...msgs)
	}
};

const client = new elasticsearch.Client({
	host: {
		protocol: 'http',
		host: host,
		port: port,
		path: ''
	},
	log: 'info' //'trace'
});

 const checkConnection = async () => {
	log('process.env.NODE_ENV ', host);
	while(!isConnected) {
		log('Connnnnecting....');
		while(healthStatus === 'red') {
			log('awaiting green light');
			try {
				const health = await client.cluster.health({});
				log('health: ', health);
				healthStatus = health.status;
				isConnected = true;
			} catch (err) {
				console.error('Connection yo, is failing...', err);
				isConnected = false;
			}
		}
	}
	return isConnected;
}

export { client, checkConnection, isConnected, log };