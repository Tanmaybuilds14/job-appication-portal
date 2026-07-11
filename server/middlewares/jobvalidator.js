import {body,validationResult} from 'express-validator';

const jobValidator = [
  body('title')
  .notEmpty()
  .withMessage('Please enter job title')
  .trim(),

  body('company')
  .notEmpty().withMessage('Please enter company name')
  .trim(),

  body('salary')
  .notEmpty().withMessage('Please enter salary')
  .isNumeric().withMessage('Salary must be a number'),

  body('description')
  .notEmpty()
  .withMessage("Please enter the description"),

  function(req,res,next){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array().map(err => err.msg).join(', ')});
      }
      next();
    }
];

export default jobValidator