function validationRegistration(req, res, next) {
    const {username, email, password, duplicatePassword} = req.body;

    const validUsername = /^[a-z0-9_-]{3,16}$/;
    if (!(validUsername.test(username))) {
        throw new Error('Invalid username');
    }

    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (!(validEmail.test(email))) {
        throw new Error('Invalid email');
    }

    let minPassLength = 5;
    let maxPassLength = 15;
    if (password.length <= minPassLength) {
        throw new Error(`The password must be longer than ${minPassLength} characters.`);
    }
    if (password.length >= maxPassLength) {
        throw new Error(`The password must be less than ${maxPassLength} characters.`);
    }

    if (password !== duplicatePassword) {
        throw new Error('Passwords do not match');
    }

    next()
}

export {validationRegistration};