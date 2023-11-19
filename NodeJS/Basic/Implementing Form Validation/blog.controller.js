// Please don't change the pre-written code

export const validateBlog = (req, res) => {
  // Write your code here
  const {title, description, image}= req.body;
  let errors=[];
  // title 
  if (!title){
    errors.push( 'The title field should not be empty.');
  }
  else if (title.length < 3){
    errors.push( 'The title field should contain at least 3 characters.');
  }
  // desc
  if (!description){
    errors.push( 'The description field should not be empty.');
  }
 else if (description.length <  10){
    errors.push( 'The description field should contain at least 10 characters.');
  }

  //imageURL
  if (!isValidURL(image)) {
    errors.push("The image URL provided should be a valid URL.");
  }

  if (errors.length >0){
    return res.status(400).render("addBlog", { errors, success: false });
    };

   return res.status(201).render("addBlog", { errors: null, success: true });
  }

 function isValidURL(image){
  try{
    new URL(image);
      return true;
    }catch(error){
      return false;  
  }
 }
export const renderBlogForm = (req, res) => {
  res.render("addBlog", { errors: null, success: false });
};
