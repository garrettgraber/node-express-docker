const { createClient } = require('redis');
const emoji = require('node-emoji');

const urlConnectionString = (host, port) => `redis://${host}:${port}`;

const generateRedisUrl = () => {
	const EnvironmentVariables = process.env;
	if(Object.hasOwn(EnvironmentVariables, 'DOCKER')) {
		const DatabaseLinks = require('docker-links').parseLinks(EnvironmentVariables);
		const { redis } = DatabaseLinks;
		return urlConnectionString(redis.hostname, redis.port);
	} else {
		const REDIS_HOST = '127.0.0.1';
		const REDIS_PORT = 6379;
		return urlConnectionString(REDIS_HOST, REDIS_PORT);
	}
};

const url = generateRedisUrl();

const client = createClient({
	url,
	socket: {
    host: "redis"
  }
});

const createRedisConnection = async () => {
	const boom = emoji.get('boom');
	client.on('error', err => console.log('Redis Client Error', err));
	const clientConnection = await client.connect();
	console.log(`${boom} clientConnection: `, clientConnection);
};

const storeValue = async (key, value) => {
	return await client.set(key, value);
};

const getValue = async (key) => {
	return await client.get(key);
};

const storeMap = async (mapKey, mapValue) => {
	return await client.hSet(mapKey, mapValue);
};

const getMap = async (mapKey) => {
	return await client.hGetAll(mapKey);
};

const keyValueEmojiTest = async (key, value, emojiName) => {
	const emojiFound = emoji.get(emojiName);
  console.log(`${emojiFound} First key: `, key);
  const storeValueResult = await client.set(key, value);
	const valueFound = await client.get(key);
	console.log('Found value: ', valueFound);
	console.log('storeValueResult: ', storeValueResult);
};

const flushDb = () => {
	client.flushdb((error, success) => console.log('Redis DB has been flushed'));
};

const startDbConnection = () => {
	// Call start
	(async() => {
	  console.log('before createRedisConnection');
	  await createRedisConnection();
	  console.log('after createRedisConnection');

	  await keyValueEmojiTest('dragon', 'Red Drake', 'dragon');

	  // const dragon = emoji.get('dragon');
	  // const firstKey = 'dragon';
	  // const firstValue = 'red beast';
	  // console.log(`${dragon} First key: `, firstKey);
	  // const storeValueResult = await client.set(firstKey, firstValue);
		// const value = await client.get(firstKey);
		// console.log('Found value: ', value);
		// console.log('storeValueResult: ', storeValueResult);

		await keyValueEmojiTest('Dark Lord', 'Sauron', 'volcano');

		// const volcano = emoji.get('volcano');
		// const secondKey = 'Dark Lord';
		// const secondValue = 'Sauron';
		// console.log(`${volcano} Second key: `, secondKey);
		// const storeValueResult2 = await storeValue(secondKey, secondValue);
		// const value2 = await getValue(secondKey);
	  // console.log('Found value 2: ', value2);
	  // console.log('storeValueResult 2: ', storeValueResult2);


	  await keyValueEmojiTest('alien', 'greys', 'alien');
	})();
};

// startDbConnection();

module.exports = {
	startDbConnection,
	client,
	createRedisConnection,
	storeValue,
	getValue,
	storeMap,
	getMap
};