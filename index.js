const mysql = require('mysql');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

exports.handler = async (event) => {
    console.log("start processing");
    for (var i = 0; i < event.Records.length ; i++) {
        let record = event.Records[i]
        let { body } = record;
        console.log("body: ", body);
        
        console.log("type of body: " + (typeof body))
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }

        let { boughtTicketId } = body;
        let { agendaProvider } = body;
        console.log("boughtTicketId: ", boughtTicketId);
        console.log("agendaProvider: ", agendaProvider);
        await delay(3000);
        await update_db(boughtTicketId, agendaProvider);

    }  
    console.log("ends processing.");
  
  
  return "Done.....";
};

function update_db(boughtTicketId, agendaProvider) {
  return new Promise(async (resolve, reject) => {
    if (agendaProvider == 'JSDC') {
      console.log("bank 10%, host 50%, subhost 20%, platform 20%");
    }else {
      console.log("bank 15%, host 45%, subhost 25%, platform 15%");
    }
    
    // 可優化事項: 判斷如果此 boughtTicketId 狀態以為 done，則不再重複處理
    
    let sql = `UPDATE ticketsystem.ticket SET ticket_status = 'done' WHERE ticket_id = '${boughtTicketId}';`
    console.log("sql: ", sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("result: ", result);
      resolve(result);
    });    
  }) 
}


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}





