var csv = require('csv');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');

var csvData = null;

csv.parse(fs.readFileSync(path.resolve(__dirname+'/../../eLearningCatalog.csv')), function(err, data) {
    csvData = lodash.map(data, function(row) {return row.slice( 0, 19)});
});

var courses = {
    path: '/catalog',
    method: 'GET',
    render: function (req, res) {
       var result = lodash.slice(csvData, 0, 2);
       var cellRow = "";


       for (var e = 0; e<result.length; e++){
       	var rowNum = e;

        for (var i=0; i < result[rowNum].length; i++) {
        	cellRow += result[rowNum][i] + "\n"+ result[rowNum][i] ;
        }
		}
        res.send(cellRow);
        // var resultCell = result[0][1];
        //  res.send(resultCell);
    }
};

module.exports = courses;


//Formatting
//assign array placements to variables to get Specific cells "course info", etc
//place parameters, possible offsets

//headers are what the http request reads