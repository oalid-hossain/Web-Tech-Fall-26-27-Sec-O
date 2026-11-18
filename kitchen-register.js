function validateRegister(role) {
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let agree = document.getElementById("agree").checked;

    // gender: je radio button checked, tar value
    let gender = "";
    let genderBoxes = document.getElementsByName("gender");

    for (let i = 0; i < genderBoxes.length; i++) {
        if (genderBoxes[i].checked) {
            gender = genderBoxes[i].value;
        }
    }

    // sob error ekta array te jomabo
    let errors = [];

    if (fullName == "") {
        errors.push("Full name is required.");
    }

    if (email == "" || email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        errors.push("Enter a valid email address.");
    }

    // isNaN(): number na hole true dey
    if (phone.length != 11 || phone.slice(0, 2) != "01" || isNaN(phone)) {
        errors.push("Phone number must be 11 digits and start with 01.");
    }

    if (password.length < 6) {
        errors.push("Password must be at least 6 characters.");
    }

    if (password != confirmPassword) {
        errors.push("Password and Confirm Password do not match.");
    }

    // role onujayi extra field
    let address = "";
    let employeeId = "";
    let shift = "";

    if (role == "customer") {
        address = document.getElementById("address").value;

        if (address == "") {
            errors.push("Address is required.");
        }
    } else if (role == "kitchen") {
        employeeId = document.getElementById("employeeId").value;
        shift = document.getElementById("shift").value;

        if (employeeId == "") {
            errors.push("Employee ID is required.");
        }

        if (shift == "") {
            errors.push("Please select a work shift.");
        }
    } else if (role == "admin") {
        let adminCode = document.getElementById("adminCode").value;

        if (adminCode != "ADMIN2026") {
            errors.push("Admin secret code is wrong.");
        }
    }

    if (!agree) {
        errors.push("You must agree to the terms and conditions.");
    }

    // same email age theke ache kina
    let users = getData("users");

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            errors.push("This email is already registered.");
        }
    }

    // error thakle dekhao, form pathio na
    if (errors.length > 0) {
        showMessage("formMessage", errors.join("<br>"), true);
        return false;
    }

    // notun user object banai
    let newUser = {
        userId: getNextId(users, "userId"),
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
        gender: gender,
        address: address,
        role: role
    };

    if (role == "kitchen") {
        newUser.employeeId = employeeId;
        newUser.shift = shift;
    }

    users.push(newUser);
    saveData("users", users);

    console.log("New user registered:", newUser);

    alert("Registration successful! Please login.");
    window.location.href = role + "-login.html";

    return false;
}