const Report = require('../../../models/report');

module.exports.status = async function(req,res){

    try
    {
        let reports = await Report.find({status: req.params.status});

        return res.json(200, {
            message: 'Here are the reports',
            reports: reports
        });

    }
    catch(err)
    {
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
}