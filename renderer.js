const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const mysql = require('mysql');
const id = document.getElementById('notify');
const notifications = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!'
}

const notifier = require("node-notifier");


id.addEventListener('click', function (e) {
    console.log('Yes');
    var n = new Notification("It", { body: "works!" })
    var onError = function(err,response){
        console.error(err,response);
    };
    notifier.notify({
        message: "This is the body of the notification.",
        title: "This will be the title of the notification",
        sound: true,//"Bottle",
        wait:true
    },onError);
});


// Add the credentials to access your database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '***',
    database : '***'
});
connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});
$query = 'SELECT * FROM ****;';
connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }
    printHTML(rows);
});

// Close the connection
connection.end(function(){
    // The connection has been closed
});

function printHTML(rows){
    var html = '';

    rows.forEach(function(row){
        html += '<tr>';
        html += '<td>';
        html += row.expense_type_id;
        html += '</td>';
        html += '<td>';
        html += row.title;
        html += '</td>';
        html += '</tr>';
        console.log(row);
    });

    document.querySelector('#table > tbody').innerHTML = html;
}