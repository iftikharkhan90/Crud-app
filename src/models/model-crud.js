var mongoose = require( 'mongoose' )

var crudSchema = mongoose.Schema({
   
    firstName: {
        type: String,
        trim: true,
        default: 'active'
    },
    lastName: {
        type: String,
        // required: true,
        trim: true,
    },
    email: {
        type: String,
        // required: true,
        trim: true,
    },
    phone: {
        type: Number,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    hobby: {
        type: String,
        trim: true,
    },
    
},
{
    timestamps: true,
}
)



var Crud = mongoose.model('Crud', crudSchema)

module.exports = Crud