// Please don't change the pre-written code
// Import the necessary modules here

const users = [];
let id = 0;
class UserSchema {
  constructor(name, email, password) {
    this.id = ++id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
export const addUser = (data) => {
  // Write your code here
  const { name, email, password } = data;
  const newUser = new UserSchema(
    name,
    email,
    password,
  );
  newUser.id=users.length+1;
  users.push(newUser);

  return newUser;
};
addUser({ name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" });

export const confirmLogin = (data) => {
  const { email, password } = data;
  const user = users.find((u) => u.email === email && u.password === password);
  return user;
};


export const getAllUsers = () => {
  return users;
};
