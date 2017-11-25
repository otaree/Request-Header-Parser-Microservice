// Get client IP address from request object ----------------------
getClientAddress = function (req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0] ||
        req.connection.remoteAddress;
};

module.exports = function (app) {
    app.get("/api/whoami/", function (req, res) {
        var ipaddress = getClientAddress(req);
        var myRegex = /\(([^)]+)\)/;
        var software = req.headers["user-agent"].match(myRegex)[1];
        var lang = req.headers["accept-language"].split(',')[0];
        var obj = {
            "ipaddress": ipaddress,
            "language": lang,
            "software": software
        }
        res.json(obj);
    });
};