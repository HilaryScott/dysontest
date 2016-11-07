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
       var cellHeaderRow = result[0];
       var cellRowContent = 1;
       var secondaryCell = 0;
       var compiledInfo = "";

       for(var i=0; i<cellHeaderRow.length; i++){
       	compiledInfo += cellHeaderRow[i] + " : " + result[cellRowContent][secondaryCell] + "\n";
       	secondaryCell++;
       }


        res.send(compiledInfo);

    }
};

module.exports = courses;


//Formatting
//assign array placements to variables to get Specific cells "course info", etc
//place parameters, possible offsets

//headers are what the http request reads