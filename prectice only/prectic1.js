const cron=require('node-cron')
const moment=require('moment');

module.exports={
    trunk: () => {
        const str = Math.floor(3.33333);
        console.log(str);
        const maxVal = Math.max(1, 2, 44, 5);
        console.log(maxVal);
        const numbers = '1,2,3,4,5,6,7,8,9';
        let result="";
        const genrateRandomNumber = (size) => {
            for (i = 0; i < size.length; i++) { 
                 result += numbers.charAt(randomInt(numbers.length));
            }
            return result;
        }
        const decimal = Number(3).toFixed(genrateRandomNumber(3));
        console.log(result)
        console.log(decimal);
    },
    cornJob:cron.schedule("* * * * * ",()=>{
        console.log("run every 1 second");
    }),
    moments:timezone=()=>{
        console.log(moment().format('LLLL'),'time format')
    }

}