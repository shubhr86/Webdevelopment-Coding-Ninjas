// Please don't change the pre-written code
// Import the necessary modules here
export const users = [
  { id: 1, name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" },
];

export const registerUser = (user) => {
  // Write your code here
  users.push(user);
 

};

export const authenticateUser = (reqUser) => {
  const {email, password}= reqUser;

  const user = users.find((user) => user.email === email && user.password === password);

  return user;
};
