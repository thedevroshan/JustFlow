export interface IAuthFieldError {
    field: string;
    message: string;
}


export const ValidateLogin = (email: string, password: string):IAuthFieldError[] | null => {
    const errors:IAuthFieldError[] = []

    if(email.length <= 0){
        errors.push({field: 'email', message: 'Email is required'})
    }

    if(password.length <= 0){
        errors.push({field: 'password', message: 'Password is required'})
    }

    return errors.length > 0 ? errors : null
}

export const ValidateSignUp = (name:string, email: string, password: string):IAuthFieldError[] | null => {
    const errors:IAuthFieldError[] = []

    if(email.length <= 0){
        errors.push({field: 'email', message: 'Email is required'})
    }

    if(password.length <= 0){
        errors.push({field: 'password', message: 'Password is required'})
    }

    if(name.length <= 0){
        errors.push({field: 'name', message: 'Name is required'})
    }

    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        errors.push({field: 'email', message: 'Invalid Email'})
    }
    
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
        errors.push({field: 'password', message: 'Password must contain at least one uppercase letter, one lowercase letter and one number'})
    }

    return errors.length > 0 ? errors : null
}