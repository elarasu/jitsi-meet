/* global ga */
/* eslint-disable indent */

(function (ctx) {
  function Analytics() {
    /* eslint-disable semi */

    /**
     * Google Analytics
     */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-319188-14', 'jit.si');
    ga('send', 'pageview');

    /* eslint-enable semi */
  }

  Analytics.prototype.sendEvent = function (action, data) {
    // empty label if missing value for it and add the value,
    // the value should be integer or null
    var value = data.value;
    value = value? Math.round(parseFloat(value)) : null;
    var label = data.label || "";

    ga('send', 'event', 'jit.si',
        action + '.' + data.browserName, label, value);
  };

  if (typeof ctx.JitsiMeetJS === "undefined")
    ctx.JitsiMeetJS = {};
  if (typeof ctx.JitsiMeetJS.app === "undefined")
    ctx.JitsiMeetJS.app = {};
  if (typeof ctx.JitsiMeetJS.app.analyticsHandlers === "undefined")
    ctx.JitsiMeetJS.app.analyticsHandlers = [];
  ctx.JitsiMeetJS.app.analyticsHandlers.push(Analytics);
}(window));
