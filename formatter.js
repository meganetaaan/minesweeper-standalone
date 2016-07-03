function getMilliSeconds(time){
  return ('00' + time % 1000).slice(-3);
}
function getSeconds(time){
  return ('0' + Math.floor(time / 1000) % 60).slice(-2);
}
function getMinutes(time){
  return ('0' + Math.floor((time / 1000) / 60)).slice(-2);
}
function formatTimeString(time){
  return `${getMinutes(time)}:${getSeconds(time)}`;
}
function formatMsecString(time){
  return `.${getMilliSeconds(time)}`
}

exports.formatTimeString = formatTimeString;
exports.formatMsecString = formatMsecString;
