var express = require('express');
var mongodb = require('mongodb').MongoClient;
var adminRouter = express.Router();
var books = [
	{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		bookId: 656,
		read: false
	},
	{
		title: 'Les Miserables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo',
		bookId: 24280,
		read: false
	},
	{
		title: 'The Time Machine',
		genre: 'Science Fiction',
		author: 'H. G. Wells',
		read: false
	},
	{
		title: 'A journey into the CEnter of the Earth',
		genre: 'Science Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	},
	{
		title: 'The Dark World',
		genre: 'Fantasy',
		author: 'Henry Kuttner',
		read: false
	}];
var router = function(nav) {
	adminRouter.route('/addBooks')
			   .get(function(req, res) {
			   		var url = 'mongodb://localhost:27017/libraryApp';
			   		mongodb.connect(url, function(err, db) {
			   			var collection = db.collection('books');
			   			collection.insertMany(books, function(err, results) {
			   				res.send(results);
			   				db.close();
			   			});
			   		});
			   		//res.send('inserting books');
			   });
	return adminRouter;
};

module.exports = router;