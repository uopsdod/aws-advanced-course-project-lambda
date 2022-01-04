const mysql = require('mysql');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

exports.handler = async (event) => {
  await update_db();
  return "Done...";
};

function update_db() {
  return new Promise(async (resolve, reject) => {
    con.query("SELECT * FROM ticketsystem.ticket", function (err, result) {
      if (err) throw err;
      console.log("result: ", result);
      resolve(result);
    });    
  }) 
}


