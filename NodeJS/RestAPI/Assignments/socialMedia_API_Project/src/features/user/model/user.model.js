export default class UserModel{

    constructor(name, email,password,id){
        this.name= name;
        this.email=email;
        this.password= password;
        this.id= id;

        
    }
    static signup(name,email, password){
        const newUser = new UserModel(
            name,
            email,
            password,
        );
        newUser.id= users.length+1;
        users.push(newUser);
        return newUser;
    }
    static signin(email,password){
        const user= users.find(u=> u.email== email && u.password==password);
        return user;
    }
    static getAllUsers(){
        return users;
    }
        
    }
    let users=[
        {
            "name":'shuham',
            "email":'dummy@gmail.com',
            "password":'pass1',
            "id":'1',
        },
        {
            "name":'kumar  ',
            "email":'dummy1@gmail.com',
            "password":'pass2',
            "id":'2',
        }
    ];

