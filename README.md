# Monthly Wage Calculation System
 Calculate monthly wage for every person in a company based on the given calculation guidelines.
 
Total Daily Pay = Regular Daily Wage + Evening Work Compensation + Overtime Compensations 

Regular Daily Wage = Regular Working Hours * Hourly Wage 

Evening Work Compensation = Evening Hours * Evening Work Compensation 

Overtime Compensations[] = Overtime Hours * Overtime Compensation Percent * Hourly Wage 

All the work shift data of persons are in .csv file. The project parses the .csv file using below listed technologies and displays total wages for each person in a month.

## Technologies
Node.js with Express framework as backend.

‘fs’ as file reading package for .csv file.

‘csv-parse’ for parsing the .csv file.

jquery, html and css for frontend.

###Running the app
to run this app: git clone https://github.com/satyambandarapu/mwcs.git

cd macs

node server/mwcs_app.js

After the above command, open the browser and type following url to see the results:
 http://localhost:8085/


