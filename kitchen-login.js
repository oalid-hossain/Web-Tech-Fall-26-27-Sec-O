function validateLogin(role) {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let remember = document.getElementById("remember").checked;

    if (email == "" || password == "") {
        showMessage("formMessage", "Please enter email and password.", true);
        return false;
    }

    // email, password ar role tinta e mille login
    let users = getData("users");
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password && users[i].role == role) {
            foundUser = users[i];
        }
    }

    if (foundUser == null) {
        showMessage("formMessage", "Invalid email, password, or role.", true);
        return false;
    }

    // Remember me: porer bar email ta box e boshano thakbe
    if (remember) {
        localStorage.setItem("rememberEmail", email);
    } else {
        localStorage.removeItem("rememberEmail");
    }

    // je login korlo tar info save
    let currentUser = {
        userId: foundUser.userId,
        fullName: foundUser.fullName,
        email: foundUser.email,
        role: foundUser.role
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // role onujayi dashboard e pathano
    switch (role) {
        case "customer":
            window.location.href = "customer-menu.html";
            break;

        case "admin":
            window.location.href = "admin-dashboard.html";
            break;

        case "kitchen":
            window.location.href = "kitchen-dashboard.html";
            break;
    }

    return false;
}

// login page khulle remember kora email boshiye dey
function fillRememberedEmail() {
    let saved = localStorage.getItem("rememberEmail");

    if (saved != null) {
        document.getElementById("email").value = saved;
        document.getElementById("remember").checked = true;
    }
}