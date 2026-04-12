import {body,validationResult} from 'express-validator';

const jobValidator = [
  body('title')
  .notEmpty()
  .withMessage('Please enter your username')
  .trim(),

  body('company')
  .notEmpty().withMessage('Please enter your email'),

  body('salary')
  .notEmpty().withMessage('Enter a password')
  .trim(),

  body('description')
  .notEmpty()
  .withMessage("Please enter the description"),

  function(req,res,next){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({msg:errors.array()});
      }
      next();
    }
];

export default jobValidator