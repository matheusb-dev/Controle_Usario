const Email= require('./ValueObjects/Email');
const Password= require('./ValueObjects/Password');
const Name=require('./ValueObjects/Name');
const {v4: uuidv4}= require('uuid');

class User{
    constructor(name, email, password, id= uuidv4()){
        if(!name || !email || !password) {
            throw new Error ("User properties cannot be empty");
        }

        this.id=id;
        this.name=new Name(name);
        this.email=new Email(email);
        this.password= new Password(password);
    }

    async ComparePassword(plainPassword){
        return await this.password.compare(plainPassword);
    }

    updatePassword(newPassword){
        this.password= new Password(newPassword);
    }

    toObject(){
        return{
            id: this.id,
            name:this.name.value,
            email:this.email.value,
            password:this.password.hashedPassword
        };
    }
}

module.exports= User;