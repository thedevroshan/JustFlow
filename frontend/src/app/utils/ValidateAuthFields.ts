export interface AuthFieldErrors {
    errorMsg: string;
    field: string;
}

export const ValidateSignUp = (name: string, email: string, password: string): AuthFieldErrors[] | null => {
    const errors: AuthFieldErrors[] = [];

    if(name.length <= 0) {
        errors.push({
            errorMsg: "Name is required",
            field: "name"
        });
    }

    if(email.length <= 0) {
        errors.push({
            errorMsg: "Email is required",
            field: "email"
        });
    }

    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        errors.push({
            errorMsg: "Invalid email",
            field: "email"
        });
    }

    if(password.length <= 0) {
        errors.push({
            errorMsg: "Password is required",
            field: "password"
        });
    }

    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
        errors.push({
            errorMsg: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
            field: "password"
        });
    }

    return errors.length > 0 ? errors : null;
}

export const ValidateLogin = (email: string, password: string): AuthFieldErrors[] | null => {
    const errors: AuthFieldErrors[] = [];

    if(email.length <= 0) {
        errors.push({
            errorMsg: "Email is required",
            field: "email"
        });
    }

    if(password.length <= 0) {
        errors.push({
            errorMsg: "Password is required",
            field: "password"
        });
    }

    return errors.length > 0 ? errors : null;
}       
