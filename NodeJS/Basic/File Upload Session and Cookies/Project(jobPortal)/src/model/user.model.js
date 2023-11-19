class User {
    constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
  }
  
  const users = [];
  
  const getAllUsers = () => {
    return users;
  };
  
  const findUserByEmail = (email) => {
    return users.find((user) => user.email === email);
  };
  
  const createUser = (user) => {
    user.id = users.length + 1;
    users.push(user);
  };
  
  export { getAllUsers, findUserByEmail, createUser , users};
  