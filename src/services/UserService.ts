class UserService {

    // логин(получаем email и пароль, находим юзера, проверяем, создаем сессию в mongodb, возвращаем jwt токен)
    // находим юзера, проверяем
    // возвращаем jwt токен
    async login(username, password){
            // const currentUser = await User.find(username, password);
            // if(currentUser) {
            //     const accessToken = jwt.sign({ username: currentUser.username}, accessTokenSecret);
            //     return accessToken;
            // } else {
            //     throw new Error('Username or password incorrect');
            // }
    }


    // регистрация
    // создаем запись юзера в postgreSQL
    // возвращаем созданного юзера
    async registration(nickname, email, password, duplicatePassword, id) {
        // const newUser = await User.create(nickname, email, password, duplicatePassword, id);
        // return newUser;
    }

    // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
    // обновляем запись в базе данных
    // возвращаем обновленного юзера
    async update(id, changes) {
        // const updatedUser = await User.findByIdAndUpdate(id, changes)
        // return updatedUser;
    }
}


export { UserService };

