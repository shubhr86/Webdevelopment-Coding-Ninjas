// Please don't change the pre-written code
// Import the necessary modules here

let id = 3;
const products = [
  { id: 1, name: "iphone", price: 100000 },
  { id: 2, name: "oneplus", price: 50000 },
  { id: 3, name: "samsung", price: 60000 },
];

export const fetchAllProducts = () => {
  return products;
};

// export const rateProductModel = (productId, userId, rating) => {
//   // Write your code here
//   const user = fetchAllProducts().find((u)=> u.id==userId)
//   if (!user){
//     res.json({ success: false, msg: "user not found"});
//   }

//   // validate product

//   const product= products.find((p)=> p.id==productId)
//   if (!product){
//     res.json({ success: false, msg: "product not found"});

//   }
//     if (!product.rating){
//     product.rating=[];
//     product.rating.push({userId:userId, rating:rating});
//   }
//     else {
//         // if rating already avilable.
//         const existingRatingIndex= product.rating.findIndex((r)=> r.userId== userId)

//         if (existingRatingIndex >=0){
//           product.rating[existingRatingIndex] ={
//             userId:userId,rating:rating,}

//           }else{
//             product.rating.push({userID:userId, rating:rating})
//         }
//       }
// }
export const rateProductModel = (productId, userId, rating) => {
  const user = fetchAllProducts().find((u) => u.id == userId);
  if (!user) {
    return null;
  }

  // Validate the product
  const product = products.find((p) => p.id == productId);
  if (!product) {
    return null;
  }

  if (!product.ratings) {
    product.ratings = [];
  }

  const existingRating = product.ratings.find((r) => r.userId == userId);

  if (existingRating) {
    existingRating.rating = rating;
  } else {
    product.ratings.push({ rating: rating , userId: userId });
  }

  return product;
};

