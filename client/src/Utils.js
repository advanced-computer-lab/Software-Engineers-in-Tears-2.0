exports.durationString = (milliseconds)=>{
    var mins = milliseconds/(1000*60);
    var hrs = Math.floor(mins/60);
    mins = mins%60;

    var res = `${mins}m`;
    res = hrs>0?`${hrs}h`+res:res;
    return(res)
}