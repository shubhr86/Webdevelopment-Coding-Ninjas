export default class UserModel{
    constructor(name, email,password, type,id){
        this.name= name;
        this.email=email;
        this.password=password;
        this.type=type;
        this.id=id;
    }

    static Signup(name,email, password,type){
        const newUser= new UserModel(
            name,
            email,
            password,
            type,
        );
        newUser.id=users.length+1;
        users.push(newUser);
        return newUser;
    }

    static SignIn(email,password){
        const user= users.find(u=> u.email==email && u.password == password);
        return user;
    }

    static getAll(){
        return users;
    }


}

let users=[
    {
    "name":'seller User',
    "email":"password1@gmail.com",
    "password":"pass1",
    "type":'seller',
    "id":'1',
},
{
    "name":'Customer User',
    "email":"c@gmail.com",
    "password":"pass1",
    "type":'Customer',
    "id":'2',
},
]