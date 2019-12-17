const customResponse = (req, res, next) => {

    res.custom = function(dataObject){
        let response = {
            success: false,
            message: "",
            data: null
        }
        res.send( Object.assign( {}, response, dataObject ) )
    }
    
    next()
    
}

module.exports = customResponse