const Doctor = require('../../../models/doctor');

const jwt = require('jsonwebtoken');

// Action for registering a new doctor
module.exports.register = async function(req, res)
{
    try
    {        
        if(req.body.password == req.body.confirm_password)
        {
            let doctor = await Doctor.findOne({username: req.body.username});

            if(!doctor)
            {
                await Doctor.create(req.body);

                return res.json(200,{
                    message: 'Registration as a doctor Successful'
                });
            }               
        }        

        return res.json(422,{
            message: 'Error in registering as a doctor'
        });

    }
    catch(err)
    {
        console.log('There is an error', err);

        return res.json(500,{
            message: "Internal Server Error"
        });
    }
}

//Action for logging in a registered doctor
module.exports.login = async function(req,res)
{
     try
     {
         let doctor = await Doctor.findOne({username:req.body.username});

         if(!doctor || doctor.password != req.body.password)
         {
             return res.json(422,{
                 message: 'Invalid username/Password'
             });
         }

         return res.json(200,{
             message: 'Sign In Successful. Here is your token. Please keep it safe!',
             data : {
                 token: jwt.sign(doctor.toJSON(), 'hospitalAPI_secret', {expiresIn: '100000'})
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
