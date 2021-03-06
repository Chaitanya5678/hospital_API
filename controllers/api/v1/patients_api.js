const Patient = require('../../../models/patient');
const Report = require('../../../models/report');

//Action for registering a new patient
module.exports.register = async function(req, res)
{
    try
    {
        let patient = await Patient.findOne({phonenumber: req.body.phonenumber});

        if(!patient)
        {
            await Patient.create(req.body);

            return res.json(200,{
                message: 'Registration of patient Successful'
            });
        }          

        return res.json(409,{
            message: 'Patient already registered. Here is the information',
            data: {
                patient: patient
            }
        });

    }
    catch(err)
    {
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
}

//Action for creating a new report for patient
module.exports.createReport = async function(req,res){

    try
    {
        let patient = await Patient.findById(req.params.id);

        if(!patient)
        {
            return res.json(422,{
                message: 'Error in  creating new report'
            });
        }

        let report = await Report.create({
            createdByDoctor: req.body.username,
            patient: patient,
            status: req.body.status
        });

        // Add newly created report to that particular patient
        patient.reports.push(report);
        patient.save();

        return res.json(200,{
            message: 'New Report created successfully',
        });

    }
    catch(err)
    {
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
}

//Action for fetching all reports of a specified patient
module.exports.allReports = async function(req,res){

    try
    {
        let patient = await Patient.findById(req.params.id);

        if(!patient)
        {
            return res.json(422,{
                message: 'Error in fetching reports'
            });
        }       
        
        let reports = await Report.find({patient: patient});

        return res.json(200,{
            message: 'Here are the reports of the patient',
            data: {
                reports: reports
            }
        });

    }
    catch(err)
    {
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
    
}