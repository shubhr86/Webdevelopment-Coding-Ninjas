import {
  validationResult,
  body,
} from 'express-validator';

export const formValidation = async (req, res, next) => {
  // Write your code here
  const rules = [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('email')
      .isEmail()
      .withMessage('Enter a valid email'),
    body('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Profile image is required');
      }
      return true;
    }),
  ];

  // 2. Run those rules.
  await Promise.all(
    rules.map((rule) => rule.run(req))
  );

  // 3. Check if there are any errors after running the rules.
  var validationErrors = validationResult(req);

  // 4. If errors, return the error message.
  if (!validationErrors.isEmpty()) {
    return res.render('upload-form', {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
};

export default formValidation;
