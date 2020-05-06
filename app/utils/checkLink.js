const checkUrlInString = (s) => {
    var urlRE = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
    var matchString = s.match(urlRE);

    if (matchString) {
        let url = `<a href="${matchString[0]}" target="_blank"> ${matchString[0]} </a>`;
        let replaceString = s.replace(matchString[0], url);
        return replaceString; //return the url
    } else {
        return s;
    }
}

export default checkUrlInString;