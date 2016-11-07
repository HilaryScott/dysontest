var g = require('dyson-generators');
var f = require('Faker');
var currentId = 0;

var articles = {
	path: '/articles',
	collection: true,
	size: 1,
	template: {
		id: function() {
			currentId += 1;
			return currentId.toString();
		},
		title: function() {
			return "Article #" + this.id;
		},
		body: f.Internet.email()
	},
	container: {
		articles: function(params, query, data) {
			return data;
		}
	}
};

module.exports = [articles];