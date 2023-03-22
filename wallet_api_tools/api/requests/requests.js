const axios = require("axios").default;
const cluster = require("cluster");
require("dotenv").config();

var shared_data = require("../data/data");

var workers = [];

if(cluster.isMaster){
    setInterval(function(){
        (async () => {
            try{
                const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=inery&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&precision=3");
                const result = response.data;
                shared_data["usd"] = result["inery"]["usd"];
            } catch(error){
                //console.log(error);
            }
        })();
        (async () => {
            try{
                const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=inery&vs_currencies=eur&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&precision=3");
                const result = response.data;
                shared_data["eur"] = result["inery"]["eur"];
            } catch(error){
                //console.log(error);
            }
        })();
        (async () => {
            try{
                const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=inery&vs_currencies=gbp&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&precision=3");
                const result = response.data;
                shared_data["gbp"] = result["inery"]["gbp"];
            } catch(error){
                //console.log(error);
            }
        })();
        
        if(workers.length){
            for(let i = 0; i < workers.length; i++){
                workers[i].send(shared_data);
                //console.log("Sent data to worker with id=" + i);
            }
        }

    }, 3000);
}

module.exports = {
    shared_data: shared_data,
    append_worker: appendWorker
};

function appendWorker(worker){
    workers.push(worker);
}