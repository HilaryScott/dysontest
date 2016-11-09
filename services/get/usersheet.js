var csv = require('csv');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');

var csvData = null;

csv.parse(fs.readFileSync(path.resolve(__dirname + '/../../eLearningCatalog.csv')), function(err, data) {
    csvData = lodash.map(data, function(row) {
        return row.slice(0, 19) });
});

var courses = {
    path: '/catalog',
    method: 'GET',
    render: function(req, res) {
        var result = lodash.slice(csvData, 0, 20);
        var cellHeaderRow = result[0];
        var cellRowContent = 0;
        var compiledInfo = [];
        console.log(cellRowContent)
        console.log(req.query.conference);

        while (lodash.isArray(result[(cellRowContent + 1)]) === true) {
            cellRowContent++;
            var row = {};
            for (var i = 0; i < cellHeaderRow.length; i++) {
                row[cellHeaderRow[i]] = result[cellRowContent][i];
            }
            if(row.Conference.trim() == req.query.conference){
            	compiledInfo.push(row);
       		 }
        }


        res.send(compiledInfo);

    }




};

module.exports = courses;


//Formatting
//assign array placements to variables to get Specific cells "course info", etc
//place parameters, possible offsets

//Once second row is done being read, skip to the third row (if it exists), depending on

//headers are what the http request reads
