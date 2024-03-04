
// 从URL中获取参数    
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// 获取日期参数  
var customDate = getParameterByName('date');
var customEventZh = "距离" + (getParameterByName('event-zh') || "下次组会");
var customEventEn = getParameterByName('event-en') || "NEXT GROUP MEETING";
var customTheme = getParameterByName('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");

function customize() {
    console.log("customDate: " + customDate);
    console.log("customEventZh: " + customEventZh);
    console.log("customEventEn: " + customEventEn);
    console.log("customTheme: " + customTheme);

    var eventZh = document.querySelectorAll(".event-zh");
    var eventEn = document.querySelectorAll(".event-en");

    console.log(eventZh);
    console.log(eventEn);

    eventZh.forEach(el => {
        el.innerHTML = customEventZh;
    }
    );

    eventEn.forEach(el => {
        el.innerHTML = customEventEn;
    }
    );

    if (customTheme == "white" || customTheme == "light") {
        document.body.style.backgroundColor = "#eeeeee";
        document.body.style.color = "#222222";
    } else {
        document.body.style.backgroundColor = "#222222";
        document.body.style.color = "#eeeeee";
    }

}

// customize();

// 目标时间为从现在起下一个周四的上午9：30
function getTargetTime() {
    // 获取当前时间
    var now = new Date();

    // 获取目标时间的日期
    if (customDate) {
        var targetTime = new Date(customDate);

        // 检测是否设置了时间
        if (customDate.length <= 10) {
            targetTime.setHours(9);
            targetTime.setMinutes(30);
            targetTime.setSeconds(0);
            targetTime.setMilliseconds(0);
        }
    } else {
        var targetTime = new Date();
        targetTime.setDate(targetTime.getDate() + (1 - targetTime.getDay()) % 7 + 1);

        targetTime.setHours(9);
        targetTime.setMinutes(30);
        targetTime.setSeconds(0);
        targetTime.setMilliseconds(0);

        if (now.getTime() > targetTime.getTime()) {
            targetTime.setDate(targetTime.getDate() + 7);
        }
    }
    return targetTime;
}

var targetTime = getTargetTime();
var timeDiff = targetTime.getTime() - new Date().getTime();
var time = parseInt(timeDiff / 1000);

console.log(targetTime);
console.log(timeDiff);
console.log(time);

// 设置一个定时器，每秒执行一次
var timer = setInterval(function () {
    // 每次减一
    time--;
    console.log(time);
    // 如果时间小于等于0，就停止计时，并重置到下周四
    if (time <= 0) {
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
    hour = hour < 10 && hour >= 0 ? "0" + hour : hour;
    minute = minute < 10 && minute >= 0 ? "0" + minute : minute;
    second = second < 10 && second >= 0 ? "0" + second : second;

    console.log("day: " + day + " hour: " + hour + " minute: " + minute + " second: " + second);

    total_second = time;

    document.querySelector(".time-day").innerHTML = day;
    document.querySelector(".time-hour").innerHTML = hour;
    document.querySelector(".time-min").innerHTML = minute;
    document.querySelector(".time-sec").innerHTML = second;
    document.querySelector(".time-sec-h3").innerHTML = total_second;
}, 1000);




// 初始化字体大小
adjustFontSize();

document.addEventListener("DOMContentLoaded", function (event) {
    // 初始化字体大小
    customize();
    adjustFontSize();

});

// 当窗口大小改变时
window.addEventListener('resize', adjustFontSize);

function adjustFontSize() {
    // Dynamically adjust font size
    // 获取窗口宽度
    var width = window.innerWidth;
    // 获取相关元素
    var mfs1Els = document.querySelectorAll('.mfs-1');
    var mfs2Els = document.querySelectorAll('.mfs-2');
    var mfs3Els = document.querySelectorAll('.mfs-3');

    fs1 = 120 / 1500 * width;
    fs2 = 50 / 1500 * width;
    fs3 = 30 / 1500 * width;

    // 设置字体大小
    mfs1Els.forEach(el => {
        el.setAttribute('style', 'font-size: ' + fs1 + 'px');
    });
    mfs2Els.forEach(el => {
        el.setAttribute('style', 'font-size: ' + fs2 + 'px');
    });
    mfs3Els.forEach(el => {
        el.setAttribute('style', 'font-size: ' + fs3 + 'px');
    });

    console.log('width: ' + width + ' fs1: ' + fs1 + ' fs2: ' + fs2 + ' fs3: ' + fs3);
}
