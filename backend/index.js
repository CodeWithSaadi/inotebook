// entry point 

const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')












connectToMongo();


const app = express()
const port = 5000



app.use(cors())     //  cors file is must to add when adding data from api call from front end

// /middleware
app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/notes'))







app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`)
}) 










// // Upload File       Not working
// const multer = require ('multer'); 
// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, '../images' )
//     },
//     filename: (req, file, cb) =>{
//         cb(null, Date.now() = '--' + file.orginalname);
//     }
// })

// const upload = multer({storage: fileStorageEngine})

// app.post('/single', upload.single() ,  (req, res) => {

//     console.log(req.file);
//     res.send('Single file uploaded successfully')

// })
