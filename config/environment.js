const dbUri = process.env.MONGO_DBURI || 'mongodb://localhost/selfish-review';
const secret = process.env.SECRET || 'secreeeet!';

module.exports = {
  dbUri, secret
};
