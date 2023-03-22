const axios = require("axios").default;
require("dotenv").config();

var data = {
    "eur": 0,
    "usd": 0,
    "gbp": 0
};

setInterval(function(){
    (async () => {
        try{
            const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=inery&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&precision=3");
            const result = response.data;
            data["usd"] = result["inery"]["usd"];
        } catch(error){
            console.log(error);
        }
    })();
    (async () => {
        try{
            const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=inery&vs_currencies=eur&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&precision=3");
            const result = response.data;
            data["eur"] = result["inery"]["eur"];
        } catch(error){
            console.log(error);
        }
    })();
    (async () => {
        try{
            const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=inery&vs_currencies=gbp&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&precision=3");
            const result = response.data;
            data["gbp"] = result["inery"]["gbp"];
        } catch(error){
            console.log(error);
        }
    })();
}, 30000);

module.exports = data;