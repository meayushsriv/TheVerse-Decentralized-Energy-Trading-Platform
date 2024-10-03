const asyncHandler = require('express-async-handler')

const Usage = require('../models/usageModel')
const getUsage = asyncHandler( async (req, res) => {  
    // find usage by id
    const usage = await Usage.findById(req.user._id);
    console.log(usage)
    if (usage) {
        res.json(usage.data)
    }
    else {
        res.status(404)
        throw new Error('Usage not found')
    }
   }
)


   module.exports = {
       getUsage
   }
   