const userRepository = require("../repository/user-repository");

function save(user) {
    const userData = userRepository.getUserById(user.id);
    if (!userData) {
        userRepository.saveUser(user);
    }
}

function mainInfo(user) {
    if (!user || !user.id) {
        return {
            id: "",
            displayName: "",
            email: "",
            phone: "",
            picture: "",
        };
    }

    const userData = userRepository.getUserById(user.id);
    if (!userData) {
        return {
            id: "",
            displayName: "",
            email: "",
            phone: "",
            picture: "",
        };
    }

    let email = "";
    let phone = "";

    if (userData.emails && userData.emails.length) {
        email = userData.emails[userData.emails.length - 1].value
    }
    if (userData.phones && userData.phones.length) {
        phone = userData.phones[userData.phones.length - 1].value
    }

    return {
        id: userData.id,
        displayName: userData.nickname || userData.displayName || "",
        email: email,
        phone: phone,
        picture: userData.picture,
    };
}

module.exports.save = save;
module.exports.mainInfo = mainInfo;
