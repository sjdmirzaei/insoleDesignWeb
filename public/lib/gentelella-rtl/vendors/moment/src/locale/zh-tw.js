//! moment.js locale configuration
<<<<<<< HEAD
//! locale : Chinese (Taiwan) [zh-tw]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris
=======
//! locale : traditional chinese (zh-tw)
//! author : Ben : https://github.com/ben-lin
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

import moment from '../moment';

export default moment.defineLocale('zh-tw', {
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
    longDateFormat : {
<<<<<<< HEAD
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY年MMMD日',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日 HH:mm',
        LLLL : 'YYYY年MMMD日dddd HH:mm',
        l : 'YYYY年MMMD日',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日 HH:mm',
        llll : 'YYYY年MMMD日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
=======
        LT : 'Ah點mm分',
        LTS : 'Ah點m分s秒',
        L : 'YYYY年MMMD日',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日Ah點mm分',
        LLLL : 'YYYY年MMMD日ddddAh點mm分',
        l : 'YYYY年MMMD日',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日Ah點mm分',
        llll : 'YYYY年MMMD日ddddAh點mm分'
    },
    meridiemParse: /早上|上午|中午|下午|晚上/,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
<<<<<<< HEAD
        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
=======
        if (meridiem === '早上' || meridiem === '上午') {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            return hour;
        } else if (meridiem === '中午') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
<<<<<<< HEAD
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
=======
        if (hm < 900) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
<<<<<<< HEAD
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd' :
            case 'D' :
            case 'DDD' :
                return number + '日';
            case 'M' :
                return number + '月';
            case 'w' :
            case 'W' :
                return number + '週';
            default :
                return number;
=======
    ordinalParse: /\d{1,2}(日|月|週)/,
    ordinal : function (number, period) {
        switch (period) {
        case 'd' :
        case 'D' :
        case 'DDD' :
            return number + '日';
        case 'M' :
            return number + '月';
        case 'w' :
        case 'W' :
            return number + '週';
        default :
            return number;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    },
    relativeTime : {
        future : '%s內',
        past : '%s前',
        s : '幾秒',
<<<<<<< HEAD
        m : '1 分鐘',
        mm : '%d 分鐘',
        h : '1 小時',
        hh : '%d 小時',
        d : '1 天',
        dd : '%d 天',
        M : '1 個月',
        MM : '%d 個月',
        y : '1 年',
        yy : '%d 年'
=======
        m : '1分鐘',
        mm : '%d分鐘',
        h : '1小時',
        hh : '%d小時',
        d : '1天',
        dd : '%d天',
        M : '1個月',
        MM : '%d個月',
        y : '1年',
        yy : '%d年'
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }
});
