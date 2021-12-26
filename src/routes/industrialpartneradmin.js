const express = require('express');
const industrypartneradminRouter = express.Router();
const industrypartnerData = require('../modals/industrypartnerData');
const fs = require('fs')

/* multer start */
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${+Date.now()}.${file.originalname.split('.')[1]}`
    );
  }
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
   { name: 'image', maxCount: 1 }
]);
/* multer end */




/* check cpUpload */
industrypartneradminRouter.post('/add', cpUpload, async (req, res) => {
  try{
  var item = {
   
    image: req.files?.image[0].path,    
    
  };
  await industrypartnerData.create(item);
  res.send(true);  
}
catch{
  res.send(false);
}
});

industrypartneradminRouter.delete('/remove/:id',(req,res)=>{
   
  id = req.params.id;
  industrypartnerData.findById({"_id":id})
  .then((indus)=>{
      console.log(indus.image)
      fs.unlinkSync(indus.image, err=>{
        if(err){
          console.log("file not deleted")
        }
        console/log("file deleted")
      })
      indus.remove()   
      res.send(true);
  })  
 
})


module.exports = industrypartneradminRouter;
