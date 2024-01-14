// 目标时间为从现在起下一个周四的上午9：30

function getTargetTime(){
    // 获取当前时间
    var now = new Date();

    // 获取目标时间的日期
    var targetTime = new Date();
    targetTime.setDate(targetTime.getDate() + (4 - targetTime.getDay()) % 7 + 1);

    if (now.getTime() > targetTime.getTime()) {
        targetTime.setDate(targetTime.getDate() + 7);
    }

    targetTime.setHours(9);
    targetTime.setMinutes(30);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);

    return targetTime;
}

var targetTime = getTargetTime();
var timeDiff = targetTime.getTime() - new Date().getTime();
var time = parseInt(timeDiff / 1000);

console.log(targetTime);
console.log(timeDiff);
console.log(time);

// 设置一个定时器，每秒执行一次
var timer = setInterval(function(){
    // 每次减一
    time--;
    console.log(time);
    // 如果时间小于等于0，就停止计时，并重置到下周四
    if(time <= 0){
        clearInterval(timer);
        // 重置
        targetTime = getTargetTime();
        // 重新计算时间差
        timeDiff = targetTime.getTime() - new Date().getTime();
        // 重新计算时间
        time = parseInt(timeDiff / 1000);
    }
    // 将时间显示在页面上
    // day
    var day = parseInt(time / 86400);
    // hour
    var hour = parseInt(time % 86400 / 3600);
    // minute
    var minute = parseInt(time % 86400 % 3600 / 60);
    // second
    var second = parseInt(time % 86400 % 3600 % 60);

    // 前导零
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    console.log("day: " + day + " hour: " + hour + " minute: " + minute + " second: " + second);

    total_second = time;

    document.querySelector(".time-day").innerHTML = day;
    document.querySelector(".time-hour").innerHTML = hour;
    document.querySelector(".time-min").innerHTML = minute;
    document.querySelector(".time-sec").innerHTML = second;
    document.querySelector(".time-sec-h3").innerHTML = total_second;
},1000);
