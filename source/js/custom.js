function setCookie(cookieName, cookieValue, nDays) {
  var today = new Date();
  var expire = new Date();

  if (nDays == null || nDays === 0) {
    nDays = 1;
  }

  expire.setTime(today.getTime() + 3600000 * 24 * nDays);
  document.cookie = cookieName + '=' + escape(cookieValue) + ';expires=' + expire.toGMTString();
}

function getCookie(cookieName) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + cookieName + '=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

function toggleDarkness(darkMode) {
  if (typeof darkMode === 'undefined') {
    darkMode = (getCookie('darkMode') === 'true') ? false : true;
  }

  setCookie('darkMode', darkMode, 1);
  location.reload();
}

function joinTheDarkSide(sunrise, sunset) {
  // Get current military time.
  var now = new Date();
  var time = Number(now.getHours() + '' + ('0' + now.getMinutes()).slice(-2));
  var darkMode = (getCookie('darkMode') === null) ? false : getCookie('darkMode');

  if (time < sunrise || time > sunset) {
    var askedDark = (getCookie('askedDark') === null) ? false : getCookie('askedDark');

    if (!darkMode && !askedDark) {
      setCookie('askedDark', true, 0.25);
      toggleDarkness(confirm('Looks like it’s getting late! Want to turn on dark mode?'));
    }
  } else {
    var askedLight = (getCookie('askedLight') === null) ? false : getCookie('askedLight');

    if (darkMode && !askedLight) {
      setCookie('askedLight', true, 0.25);
      toggleDarkness(confirm('Looks like the sun is shining! Want to turn off dark mode?'));
    }
  }

  console.log('🕐 ' + time + ' | 😎 ' + darkMode);

  // Run every 2 minutes.
  setTimeout(joinTheDarkSide, 120000, sunrise, sunset);
}

function sunTimes(position) {
  // Default sunlight times.
  var sunrise = 700;
  var sunset = 2000;

  if (position) {
    // Calculate accurate sunlight times.
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var times = SunCalc.getTimes(new Date(), lat, long);

    sunrise = Number(times.sunrise.getHours() + '' + times.sunrise.getMinutes());
    sunset = Number(times.sunset.getHours() + '' + times.sunset.getMinutes());
  }

  console.log('☀️ ' + sunrise + ' | 🌙 ' +  sunset);

  joinTheDarkSide(sunrise, sunset);
}
