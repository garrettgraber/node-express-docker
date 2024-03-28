const express = require('express');
const {
	startDbConnection,
	client,
	createRedisConnection,
	storeValue,
	getValue,
	storeMap,
	getMap
} = require('./src/redis-controller.js');

startDbConnection();

const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
  
app.get('/', (req, res) => res.send('Dockerizing Node Application'));

app.get('/redis/set/:key/:value', async (req, res) => {
	const { key, value } = req.params;
	console.log(`key: ${key}. value: ${value}.`);
	const statusOfStoredValue = await storeValue(key, value);
	console.log('Status of Stored Value: ', statusOfStoredValue);
	res.send(statusOfStoredValue);
});

app.get('/redis/get/:key', async (req, res) => {
	const { key } = req.params;
	console.log('key: ', key);
	const foundValue = await getValue(key);
	console.log('Found Value: ', foundValue);
	res.send(foundValue);
});
  
app.listen(5000, () => console.log(`⚡️[bootup]: Server is running at port: 5000`));