var fs = require('fs');
var csv = require('csv-parse');
var HOURLYWAGE = 3.75;
var OVERTIMECOMPENSATION = 1.15;

// getting number of months available.
function getMonthsList(callback){
	fs.readdir('./Wages', function(err, files) {
    var months = [];
    files.forEach(function(file) {
    	//only .csv files are taken into account.
    	if(file.split('.')[1]=='csv'){
			var year = file.substring(8, 12);
      		var month = file.substring(12, 14);
      		months.push(month+'/'+year);
    	}
    });
    callback(months);
  });
}

function getMonthlyWages( month, year, callback){
		fs.readFile('./Wages/HourList'+year+month+'.csv', function(err,data){
		csv(data, function(err, wages){
			var wagesList = {};
			for(var row in wages){
				//skip first row as it is column heading.
				if(row!=0){
					if(!wagesList[wages[row][0]]) {
						wagesList[wages[row][0]]=0;
					}
					// storing wages in object list, person name as index.
					wagesList[wages[row][0]] += calculateDayWages(wages[row]);
				}
			}
			callback(wagesList);
		});
	});	
}

function calculateDayWages(dayArray){
	var day = dayArray[2].split('.')[0];
	var month = dayArray[2].split('.')[1];
	var year = dayArray[2].split('.')[2];
	var entryTime = new Date(year, month, day, dayArray[3].split(':')[0], dayArray[3].split(':')[1], 0, 0);
	var leavingTime = new Date(year, month, day, dayArray[4].split(':')[0], dayArray[4].split(':')[1], 0, 0);
	//if leaving time is AM. it should be next. so add one day.
	if (leavingTime < entryTime){
		leavingTime.setDate(leavingTime.getDate()+1);
	} 
	//finding duration in minutes from milliseconds.
	var durationMins = Math.round((leavingTime-entryTime)/ 60000);
	return calculateWages(entryTime, durationMins);
}

function calculateWages(entryTime, durationMins){
	var wage = 0;
	for(var minu=15;minu<=durationMins;minu++){
		wage += 0.25*(HOURLYWAGE+(OVERTIMECOMPENSATION*isEveningPay(entryTime,minu))+(HOURLYWAGE*overtimeCompensation(minu)));
	}
	return wage;
}

function isEveningPay(entryTime, minu){
	var compenStartTime = new Date(entryTime.getYear(), entryTime.getMonth(), entryTime.getDate(), 18,0,0,0);
	var compenEndTime = new Date(entryTime.getYear(), entryTime.getMonth(), entryTime.getDate()+1, 6,0,0,0);

	return (compenStartTime.getTime()<= (entryTime.getTime()+(minu*60000)) || compenEndTime.getTime() >= (entryTime.getTime()+(minu*60000)));
}

function overtimeCompensation(duration) {
	var hours = duration/15;
	// 15x32 = 8 hours
	//15x40 = 8+2 hours
	//15x48 = 8+2+2 hours
	if(hours<=32){
		return 0;
	}else if(hours>32 && hours<=40){
		return 1.25;
	}else if(hours>40 && hours<=48){
		return 1.50;
	}else if(hours>48){
		return 2;
	}
}

module.exports = {
	getMonthlyWages: getMonthlyWages,
	getMonthsList: getMonthsList
};