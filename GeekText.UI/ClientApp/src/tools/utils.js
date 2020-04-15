export function getRandomString(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=`~";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

export function getTextAvatar(name) {
  const nameArr = name.split(" ");
  let res;
  if (nameArr.length > 1) {
    res = `${nameArr[0].slice(0, 1)}${nameArr[1].slice(0, 1)}`;
  } else {
    res = name.length > 1 ? name.slice(0, 2) : name.slice(0, 1);
  }
  return res.toUpperCase();
}

export function getDate(milliseconds) {
  var d = new Date(milliseconds);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Will display time in Sep 20, 2020 format
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
