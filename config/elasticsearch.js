const { Client } = require('@elastic/elasticsearch');

const elasticsearchUrl = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';

const esClient = new Client({ node: elasticsearchUrl });

module.exports = esClient;
