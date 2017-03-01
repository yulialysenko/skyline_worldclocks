$(document).ready(function() {

    var timezone0 = correctTimezone(data.clocksInfo[0].timezone),
        timezone1 = correctTimezone(data.clocksInfo[1].timezone),
        timezone2 = correctTimezone(data.clocksInfo[2].timezone),
        timezone3 = correctTimezone(data.clocksInfo[3].timezone),
        seconds, minutes, hours,
        weekday = {
            '1': 'Monday',
            '2': 'Tuesday',
            '3': 'Wednesday',
            '4': 'Thursday',
            '5': 'Friday',
            '6': 'Saturday',
            '7': 'Sunday'
        },
        month = {
            '0': 'January',
            '1': 'February',
            '2': 'March',
            '3': 'April',
            '4': 'May',
            '5': 'June',
            '6': 'July',
            '7': 'August',
            '8': 'September',
            '9': 'October',
            '10': 'November',
            '11': 'December'
        },
        cardinalNumbers = {
            '0': 'zero',
            '1': 'one',
            '2': 'two',
            '3': 'three',
            '4': 'four',
            '5': 'five',
            '6': 'six',
            '7': 'seven',
            '8': 'eight',
            '9': 'nine',
            '11': 'eleven',
            '12': 'twelve',
            '13': 'thirteen',
            '14': 'fourteen',
            '15': 'fifteen',
            '16': 'sixteen',
            '17': 'seventeen',
            '18': 'eighteen',
            '19': 'nineteen',
            '10': 'ten',
            '20': 'twenty',
            '30': 'thirty',
            '40': 'fourty',
            '50': 'fifty',
            '2_': 'twenty',
            '3_': 'thirty',
            '4_': 'fourty',
            '5_': 'fifty'
        },
        ordinalNumbers = {
            '1': 'first',
            '2': 'second',
            '3': 'third',
            '4': 'fourth',
            '5': 'fifth',
            '6': 'sixth',
            '7': 'seventh',
            '8': 'eight',
            '9': 'ninetieth',
            '10': 'tenth',
            '11': 'eleventh',
            '12': 'twelfth',
            '13': 'thirteenth',
            '14': 'fourteenth',
            '15': 'fifteenth',
            '16': 'sixteenth',
            '17': 'seventeenth',
            '18': 'eighteenth',
            '19': 'nineteenth',
            '20': 'twentieth',
            '30': 'thirtieth',
            '2_': 'twenty',
            '3_': 'thirty'
        },
        definer = {
            seconds: function(timezone) {
                var returnValue = changeToWord(timezone.seconds(), cardinalNumbers)
                if ($('#seconds').html() != returnValue) {
                    animate($('#seconds'));
                    return returnValue;
                }
            },
            secondsWord: function(timezone) {
                var returnValue;
                if (timezone.seconds() == 1) {
                    returnValue = 'second';
                } else {
                    returnValue = 'seconds';
                }
                if ($('#seconds-word').html() != returnValue) {
                    animate($('#seconds-word'));
                    return returnValue;
                }
            },
            minutes: function(timezone) {
                var returnValue = (timezone.minutes() <= 30) ? timezone.minutes() : 60 - timezone.minutes();
                if (returnValue == 30) {
                    returnValue = 'half';
                } else if (returnValue == 15) {
                    returnValue = 'a quarter';
                } else if (returnValue == 0) {
                    returnValue = (timezone.minutes() <= 30) ? timezone.hour() % 12 : timezone.hour() % 12 + 1;
                    returnValue = (timezone.hour() == 0) ? 12 : returnValue;
                    returnValue = changeToWord(returnValue, cardinalNumbers)
                } else {
                    returnValue = changeToWord(returnValue, cardinalNumbers)
                }
                if ($('#minutes').html() != returnValue) {
                    animate($('#minutes'));
                    return returnValue;
                }
            },
            minutesWord: function(timezone) {
                var returnValue = (timezone.minutes() <= 30) ? timezone.minutes() : 60 - timezone.minutes();
                if (returnValue % 15 == 0) {
                    returnValue = '';
                } else if (returnValue == 1) {
                    returnValue = 'minute';
                } else {
                    returnValue = 'minutes';
                }
                if ($('#minutes-word').html() != returnValue) {
                    animate($('#minutes-word'));
                    return returnValue;
                }

            },
            hour: function(timezone) {
                if (timezone.minutes() == 0) {
                    return "o'clock";
                }
                var returnValue = (timezone.minutes() <= 30) ? timezone.hour() % 12 : timezone.hour() % 12 + 1;
                returnValue = (timezone.hour() == 0) ? 12 : returnValue;
                returnValue = changeToWord(returnValue, cardinalNumbers);
                if ($('#hours').html() != returnValue) {
                    animate($('#hours'));
                    return returnValue;
                }
            },
            clockPreposition: function(timezone) {
                var returnValue = (timezone.minutes() <= 30) ? ((timezone.minutes() == 0) ? '' : 'past') : 'to';
                if ($('#past-to').html() != returnValue) {
                    animate($('#past-to'));
                    return returnValue;
                }
            },
            weekday: function(timezone) {
                var returnValue = weekday[timezone.isoWeekday()];
                if ($('#day-of-week').html() != returnValue) {
                    animate($('#day-of-week'));
                    return returnValue;
                }
            },
            week: function(timezone) {
                var returnValue = timezone.isoWeek();
                if ($('#week').html() != returnValue) {
                    animate($('#week'));
                    return returnValue;
                }
            },
            year: function(timezone) {
                var returnValue = timezone.year();
                if ($('#year').html() != returnValue) {
                    animate($('#year'));
                    return returnValue;
                }
            },
            preposition: function(noun) {
                var returnValue = (noun == 'night') ? 'at' : 'in the';
                if ($('#in-the').html() != returnValue) {
                    animate($('#in-the'));
                    return returnValue;
                }
            },
            dayPart: function(timezone) {
                var hour = timezone.hour(),
                    returnValue;
                if ((hour >= 6) && (hour < 12)) {
                    returnValue = 'morning';
                } else if ((hour >= 12) && (hour < 18)) {
                    returnValue = 'afternoon';
                } else if ((hour >= 18) && (hour < 23)) {
                    returnValue = 'evening';
                } else {
                    returnValue = 'night';
                }
                if ($('#part-of-day').html() != returnValue) {
                    animate($('#part-of-day'));
                    return returnValue;
                }
            },
            date: function(timezone) {
                var returnValue = changeToWord(timezone.date(), ordinalNumbers);
                if ($('#date').html() != returnValue) {
                    animate($('#date'));
                    return returnValue;
                }
            },
            month: function(timezone) {
                var returnValue = month[timezone.month()];
                if ($('#month').html() != returnValue) {
                    animate($('#month'));
                    return returnValue;
                }
            },
            dayofYear: function(timezone) {
                var returnValue = timezone.dayOfYear() - 1;
                if ($('#year-day').html() != returnValue) {
                    animate($('#year-day'));
                    return returnValue;
                }
            }

        };

    setWindow();
    setContent();
    setWordClock();
    setClocks();
    moveSkyline();


    function setWindow() {
        setDimensions();

        $(window).resize(setDimensions);

        function setDimensions() {
            if ($(window).height() < $(window).width() * 0.56) {
                $('.container-block').css('font-size', $(window).height() * 1.77 + 'px');
                $('.container-block').css('width', $(window).height() * 1.77 + 'px');

                $('.clock').css('border', parseInt($(window).height() * 1.77 * 0.005) + 'px solid white');
                $('.center-point').css({
                    'width': parseInt($(window).height() * 1.77 * 0.01125) + 'px',
                    'height': parseInt($(window).height() * 1.77 * 0.01125) + 'px'
                });
                $('.second-arrow, .hour-arrow').css('width', $(window).height() * 1.77 * 0.0025 + 'px');
                $('.minute-arrow').css('width', $(window).height() * 1.77 * 0.00375 + 'px');
            } else {
                $('.container-block').css('font-size', $(window).width() + 'px');
                $('.container-block').css('width', $(window).width() + 'px');

                $('.clock').css('border', parseInt($(window).width() * 0.005) + 'px solid white');
                $('.center-point').css({
                    'width': parseInt($(window).width() * 0.01125) + 'px',
                    'height': parseInt($(window).width() * 0.01125) + 'px'
                });
                $('.second-arrow, .hour-arrow').css('width', $(window).width() * 0.0025 + 'px');
                $('.minute-arrow').css('width', $(window).width() * 0.00375 + 'px');
            }
        }

        $('.intro-block').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).hide();
        })
    }


    function setContent() {
        $('.clock-1 ~ .name').html(data.clocksInfo[0].name);
        $('.clock-2 ~ .name').html(data.clocksInfo[1].name);
        $('.clock-3 ~ .name').html(data.clocksInfo[2].name);
        $('.clock-4 ~ .name').html(data.clocksInfo[3].name);
        $('.clock-1 ~ .timezone').html(data.clocksInfo[0].timezone);
        $('.clock-2 ~ .timezone').html(data.clocksInfo[1].timezone);
        $('.clock-3 ~ .timezone').html(data.clocksInfo[2].timezone);
        $('.clock-4 ~ .timezone').html(data.clocksInfo[3].timezone);
        showContent();
    }

    function setWordClock() {
        var thisTimezone = correctTimezone(data.timezone);
        $('#city').html(data.city);
        $('#timezone').html(data.timezone);
        var localTime = moment.tz(thisTimezone);
        updateWordClock(localTime);
        setTimeout(function() {
            setInterval(function() {
                localTime = moment.tz(thisTimezone);
                updateWordClock(localTime);
            }, 1000);
        }, 1000 - moment().milliseconds());
    }




    function updateWordClock(timezone) {
        $('#seconds').html(definer.seconds(timezone));
        $('#seconds-word').html(definer.secondsWord(timezone));
        $('#minutes').html(definer.minutes(timezone));
        $('#minutes-word').html(definer.minutesWord(timezone));
        $('#past-to').html(definer.clockPreposition(timezone));
        $('#hours').html(definer.hour(timezone));
        $('#in-the').html(definer.preposition($('#part-of-day').html()));
        $('#part-of-day').html(definer.dayPart(timezone));
        $('#day-of-week').html(definer.weekday(timezone));
        $('#week').html(definer.week(timezone));
        $('#date').html(definer.date(timezone));
        $('#month').html(definer.month(timezone));
        $('#year-day').html(definer.dayofYear(timezone));
        $('#year').html(definer.year(timezone));
    }

    function setClocks() {
        setArrows('.clock-1', timezone0);
        setArrows('.clock-2', timezone1);
        setArrows('.clock-3', timezone2);
        setArrows('.clock-4', timezone3);
        setTimeout(function() {
            setInterval(function() {
                setArrows('.clock-1', timezone0);
                setArrows('.clock-2', timezone1);
                setArrows('.clock-3', timezone2);
                setArrows('.clock-4', timezone3);
            }, 1000);
        }, 1000 - moment().milliseconds());
    }


    function setArrows(clock, timezone) {
        currTime = moment.tz(timezone);
        seconds = currTime.seconds();
        minutes = currTime.minutes();
        hours = currTime.hours() % 12;
        $(clock + ' .second-arrow').css({
            '-webkit-transform': 'translate(-50%, 0px) rotate(' + seconds * 6 + 'deg)',
            '-moz-transform': 'translate(-50%, 0px) rotate(' + seconds * 6 + 'deg)',
            '-ms-transform': 'translate(-50%, 0px) rotate(' + seconds * 6 + 'deg)',
            '-o-transform': 'translate(-50%, 0px) rotate(' + seconds * 6 + 'deg)',
            'transform': 'translate(-50%, 0px) rotate(' + seconds * 6 + 'deg)'
        });
        $(clock + ' .minute-arrow').css({
            '-webkit-transform': 'translate(-50%, 0px) rotate(' + (minutes * 6 + seconds * 0.1) + 'deg)',
            '-moz-transform': 'translate(-50%, 0px) rotate(' + (minutes * 6 + seconds * 0.1) + 'deg)',
            '-ms-transform': 'translate(-50%, 0px) rotate(' + (minutes * 6 + seconds * 0.1) + 'deg)',
            '-o-transform': 'translate(-50%, 0px) rotate(' + (minutes * 6 + seconds * 0.1) + 'deg)',
            'transform': 'translate(-50%, 0px) rotate(' + (minutes * 6 + seconds * 0.1) + 'deg)'
        });
        $(clock + ' .hour-arrow').css({
            '-webkit-transform': 'translate(-50%, 0px) rotate(' + (hours * 30 + minutes * 0.5 + seconds * 0.008333) + 'deg)',
            '-moz-transform': 'translate(-50%, 0px) rotate(' + (hours * 30 + minutes * 0.5 + seconds * 0.008333) + 'deg)',
            '-ms-transform': 'translate(-50%, 0px) rotate(' + (hours * 30 + minutes * 0.5 + seconds * 0.008333) + 'deg)',
            '-o-transform': 'translate(-50%, 0px) rotate(' + (hours * 30 + minutes * 0.5 + seconds * 0.008333) + 'deg)',
            'transform': 'translate(-50%, 0px) rotate(' + (hours * 30 + minutes * 0.5 + seconds * 0.008333) + 'deg)'
        });
    }

    function correctTimezone(timezone) {
        if (timezone.indexOf("+") > -1) {
            timezone = "Etc/" + timezone.replace("+", "-");
        } else if (timezone.indexOf("-") > -1) {
            timezone = "Etc/" + timezone.replace("-", "+");
        }
        return timezone;
    }

    function moveSkyline() {
        var imgElem = document.getElementById('slideImg');

        imgElem.onload = function() {
            console.log("LOAD")
            $('.slide').css('height', $('.slider-container').height());
            setTimeout(function() {

                setInterval(function() {

                    var moveDistance = parseInt($('.slide').css('width')) / 30;

                    $('.slide').css('height', $('.slider-container').height());

                    console.log(parseInt($('.slider').css('margin-left')), parseInt('-' + moveDistance * 30))

                    if (parseInt($('.slider').css('margin-left')) > parseInt('-' + moveDistance * 30)) {

                        $('.slider').addClass('transition-img');
                        $('.slider').css({
                            'margin-left': '-=' + moveDistance + 'px'
                        });
                    } else {
                        $('.slider').removeClass('transition-img');
                        $('.slider').css({
                            'margin-left': '0'
                        });
                    }
                }, 1000);
            }, 1000 - moment().milliseconds());
        }

        imgElem.src = "img/skyline.svg";

    }

    function changeToWord(num, obj) {
        num = num.toString();
        if ((num.length == 1) || (num.indexOf('0') == 1) || (num.indexOf('1') == 0)) {
            num = obj[num];
        } else {
            num = obj[num.substring(0, 1) + '_'] + obj[num.substring(1)]
        }
        return num;
    }


    function animate(element) {
        element.addClass("animated bounceIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass("animated bounceIn");
        })
    }

    function showContent() {
        showElement($('#hello'), 300);
        showElement($('#welcome'), 350);
        showElement($('.city-wrap'), 400);
        showElement($('#it-is'), 450);
        showElement($('#now'), 500);
        showElement($('#minutes'), 550);
        showElement($('#minutes-word'), 600);
        showElement($('#past-to'), 650);
        showElement($('.seconds-wrap '), 700);
        showElement($('#in-the'), 750);
        showElement($('#part-of-day'), 800);
        showElement($('#on'), 850);
        showElement($('#day-of-week'), 900);
        showElement($('#the'), 950);
        showElement($('#date'), 1000);
        showElement($('#of'), 1050);
        showElement($('#month'), 1100);
        showElement($('#week-word'), 1150);
        showElement($('#week'), 1200);
        showElement($('#day-word'), 1250);
        showElement($('#year-day'), 1300);
        showElement($('#year-word'), 1350);
        showElement($('#year'), 1400);
        showElement($('.clock-container-1'), 1450);
        showElement($('.clock-container-2'), 1500);
        showElement($('.clock-container-3'), 1550);
        showElement($('.clock-container-4'), 1600);
    }

    function showElement(element, timeout) {
        setTimeout(function() {
            element.removeClass('hidden');
            element.addClass('animated zoomIn');

            setTimeout(function() {
                element.removeClass('animated zoomIn');
            }, 1000)
        }, timeout);
    }
    // var templateInfo = {
    //     width: 1920, //1280 1360 1440 1920 
    //     height: 1080 //720 768 900 1080
    // };

    // $('.container').css({
    //  'max-width': templateInfo.width,
    //  'max-height': templateInfo.height
    // });
});
