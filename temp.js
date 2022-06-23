
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
var mysql=require('mysql');
const bodyParser = require('body-parser');
const { Server} = require('http');
const port= 8081;
const path=require('path');

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "CDAC",
	database: "ganesha"
});

con.connect(function(err){
	if(err){ throw err;}
		console.log("connected");
	
})

app.get('/', (req,res)=>{
	res.sendFile(__dirname+'/abc/mock.html')
});

app.post('/',(req,res)=>{
var bookId1 = req.body.bookid;
var bookname1 = req.body.bookname;
var price1 = req.body.price;
console.log(req.body);



var sql="INSERT INTO book (bookid,bokname,price) VALUES ('"+bookId1+"','"+bookname1+"','"+price1+"')";

con.query(sql,function(error,result){
	if(error) throw error;
	//res.send('book data added successfully');
});

});

const {
	createPool
}=require('mysql');
const pool=createPool({

	host: "localhost",
	user: "root",
	password: "CDAC",
	database: "ganesha"
});

pool.query(`select * from book`,(error, result)=>{
if(error){
	console.log(err);

}
return console.log(result);
});


app.listen(8081, ()=> {
    console.log("server listening at port 8081...");
});