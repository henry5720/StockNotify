import Stock from "../model/stockData.js";
const getStockInfo=async()=>{
    const stockCode="tse_2330.tw";
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);
    console.log({currentTimestamp, currentDate});
    const searchTime=1635167108897;
    const url=`https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${stockCode}&_=${searchTime}`;
    const response=await fetch(url);
    const result=await response.json();
    console.log({result});
    console.log(new Date(parseInt(result.msgArray[0].tlong)));
};
getStockInfo();