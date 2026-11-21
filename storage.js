/* 
   FoodieRest - storage.js
   Sob page e ei file ta lagbe.
   Kaj: data save kora, data pora, login check, logout.

*/

/* ---------- 1. Data pora ar save kora ---------- */

// key diye data pore. kichu na thakle khali array [] dey
function getData(key) {
  let text = localStorage.getItem(key);
  if (text == null) {
    return [];
  }
  return JSON.parse(text);
}

// key te data save kore
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// array er sob theke boro id + 1 = notun id
function getNextId(list, idName) {
  let maxId = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i][idName] > maxId) {
      maxId = list[i][idName];
    }
  }
  return maxId + 1;
}

// aajker tarikh, jemon "25 Oct 2026"
function getTodayDate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let d = new Date();
  return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}

// ekhon koyta baje, jemon "1:40 PM"
function getCurrentTime() {
  let d = new Date();
  let hour = d.getHours();
  let minute = d.getMinutes();
  let ampm = "AM";
  if (hour >= 12) {
    ampm = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour == 0) {
    hour = 12;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return hour + ":" + minute + " " + ampm;
}

/* ---------- 2. Prothom bar chalale demo data rakha ---------- */

function setupDefaultData() {
  // food menu
  if (getData("menuItems").length == 0) {
    let menuItems = [
      {
        foodId: 1,
        foodName: "Chicken Burger",
        category: "Burger",
        price: 250,
        image: "burger.svg",
        description: "Crispy chicken, cheese and lettuce",
        available: true,
      },
      {
        foodId: 2,
        foodName: "Beef Cheese Burger",
        category: "Burger",
        price: 320,
        image: "burger.svg",
        description: "Double beef patty with cheddar",
        available: true,
      },
      {
        foodId: 3,
        foodName: "BBQ Chicken Pizza",
        category: "Pizza",
        price: 650,
        image: "pizza.svg",
        description: "12 inch, BBQ sauce and chicken",
        available: true,
      },
      {
        foodId: 4,
        foodName: "Margherita Pizza",
        category: "Pizza",
        price: 550,
        image: "pizza.svg",
        description: "12 inch, tomato and mozzarella",
        available: true,
      },
      {
        foodId: 5,
        foodName: "Chicken Biryani",
        category: "Rice",
        price: 280,
        image: "biryani.svg",
        description: "Basmati rice with spicy chicken",
        available: true,
      },
      {
        foodId: 6,
        foodName: "Beef Tehari",
        category: "Rice",
        price: 260,
        image: "biryani.svg",
        description: "Old Dhaka style beef tehari",
        available: false,
      },
      {
        foodId: 7,
        foodName: "Fried Chicken",
        category: "Chicken",
        price: 220,
        image: "chicken.svg",
        description: "2 pieces, crispy and juicy",
        available: true,
      },
      {
        foodId: 8,
        foodName: "Chicken Wings",
        category: "Chicken",
        price: 240,
        image: "chicken.svg",
        description: "6 pieces with hot sauce",
        available: true,
      },
      {
        foodId: 9,
        foodName: "French Fries",
        category: "Snacks",
        price: 120,
        image: "fries.svg",
        description: "Regular box, lightly salted",
        available: true,
      },
      {
        foodId: 10,
        foodName: "Cold Coffee",
        category: "Drinks",
        price: 180,
        image: "coffee.svg",
        description: "Chilled coffee with cream",
        available: true,
      },
      {
        foodId: 11,
        foodName: "Lemon Mint",
        category: "Drinks",
        price: 100,
        image: "lemonade.svg",
        description: "Fresh lemon and mint juice",
        available: true,
      },
      {
        foodId: 12,
        foodName: "Chocolate Cake",
        category: "Desserts",
        price: 200,
        image: "cake.svg",
        description: "One slice of rich chocolate cake",
        available: true,
      },
    ];
    saveData("menuItems", menuItems);
  }

  // demo user (protita role er ekta kore)
  if (getData("users").length == 0) {
    let users = [
      {
        userId: 1,
        fullName: "Admin",
        email: "admin@foodierest.com",
        phone: "01700000000",
        password: "admin123",
        gender: "Male",
        address: "",
        role: "admin",
      },
      {
        userId: 2,
        fullName: "Karim",
        email: "kitchen@foodierest.com",
        phone: "01800000000",
        password: "kitchen123",
        gender: "Male",
        address: "",
        role: "kitchen",
        employeeId: "KS-1001",
        shift: "morning",
      },
      {
        userId: 3,
        fullName: "Rahim Ahmed",
        email: "rahim@gmail.com",
        phone: "01712345678",
        password: "123456",
        gender: "Male",
        address: "House 12, Road 5, Bashundhara R/A, Dhaka",
        role: "customer",
      },
      {
        userId: 4,
        fullName: "Ayesha Khan",
        email: "ayesha@gmail.com",
        phone: "01823456789",
        password: "123456",
        gender: "Female",
        address: "Uttara, Dhaka",
        role: "customer",
      },
      {
        userId: 5,
        fullName: "Sami Hasan",
        email: "sami@gmail.com",
        phone: "01934567890",
        password: "123456",
        gender: "Male",
        address: "Kuril, Dhaka",
        role: "customer",
      },
    ];
    saveData("users", users);
  }

  // demo order
  if (localStorage.getItem("orders") == null) {
    let today = getTodayDate();
    let orders = [
      {
        orderId: 1001,
        customerId: 4,
        customerName: "Ayesha Khan",
        orderDate: today,
        orderTime: "12:20 PM",
        items: [{ foodId: 5, foodName: "Chicken Biryani", price: 280, qty: 2 }],
        totalPrice: 560,
        status: "Preparing",
        note: "",
      },
      {
        orderId: 1002,
        customerId: 5,
        customerName: "Sami Hasan",
        orderDate: today,
        orderTime: "12:50 PM",
        items: [
          { foodId: 3, foodName: "BBQ Chicken Pizza", price: 650, qty: 1 },
          { foodId: 10, foodName: "Cold Coffee", price: 180, qty: 2 },
        ],
        totalPrice: 1010,
        status: "Ready",
        note: "Extra ice",
      },
      {
        orderId: 1003,
        customerId: 3,
        customerName: "Rahim Ahmed",
        orderDate: today,
        orderTime: "1:15 PM",
        items: [
          { foodId: 7, foodName: "Fried Chicken", price: 220, qty: 1 },
          { foodId: 11, foodName: "Lemon Mint", price: 100, qty: 1 },
        ],
        totalPrice: 320,
        status: "Delivered",
        note: "",
      },
    ];
    saveData("orders", orders);
  }
}

// ei file load holei demo data check hobe
setupDefaultData();

/* ---------- 3. Login, page guard, logout ---------- */

// je login kore ache tar info. keu na thakle null
function getCurrentUser() {
  let text = localStorage.getItem("currentUser");
  if (text == null) {
    return null;
  }
  return JSON.parse(text);
}

// protected page er shurute call korte hobe
// login na thakle ba role na mille login page e pathiye dey
function checkLogin(allowedRole) {
  let user = getCurrentUser();
  if (user == null || user.role != allowedRole) {
    alert("Please login as " + allowedRole + " first.");
    window.location.href = allowedRole + "-login.html";
    return null;
  }
  return user;
}

// logout: currentUser muche role page e jay
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "role.html";
}

// navbar e "Hello, Name" ar avatar er prothom okkhor
function showUserName() {
  let user = getCurrentUser();
  if (user == null) {
    return;
  }
  let nameBox = document.getElementById("userName");
  let letterBox = document.getElementById("avatarLetter");
  if (nameBox != null) {
    nameBox.innerHTML = "Hello, " + user.fullName;
  }
  if (letterBox != null) {
    letterBox.innerHTML = user.fullName.slice(0, 1).toUpperCase(); // prothom okkhor
  }
}

/* ---------- 4. Cart helper ---------- */

// protita customer er alada cart: cart_3, cart_4 ...
function getCartKey() {
  let user = getCurrentUser();
  return "cart_" + user.userId;
}

// navbar er Cart (3) number ta update kore
function updateCartCount() {
  let countBox = document.getElementById("cartCount");
  if (countBox == null || getCurrentUser() == null) {
    return;
  }
  let cart = getData(getCartKey());
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].qty;
  }
  countBox.innerHTML = total;
}

/* ---------- 5. Order status ---------- */

// status er rongin badge er HTML
function getBadge(status) {
  return (
    '<span class="badge badge-' +
    status.toLowerCase() +
    '">' +
    status +
    "</span>"
  );
}

// order er item gula ek line e: "Chicken Burger x1<br>Fries x1"
function getItemsText(items) {
  let text = "";
  for (let i = 0; i < items.length; i++) {
    text += items[i].foodName + " x" + items[i].qty;
    if (i < items.length - 1) {
      text += "<br>";
    }
  }
  return text;
}

// status bodlano. shudhu ei 3 ta poriborton allowed:
// Pending -> Preparing -> Ready -> Delivered
function changeOrderStatus(orderId, newStatus) {
  let orders = getData("orders");
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].orderId == orderId) {
      let oldStatus = orders[i].status;
      let allowed = false;

      if (oldStatus == "Pending" && newStatus == "Preparing") {
        allowed = true;
      } else if (oldStatus == "Preparing" && newStatus == "Ready") {
        allowed = true;
      } else if (oldStatus == "Ready" && newStatus == "Delivered") {
        allowed = true;
      }

      if (allowed) {
        orders[i].status = newStatus;
        saveData("orders", orders);
        console.log(
          "Order #" + orderId + ": " + oldStatus + " -> " + newStatus,
        );
      } else {
        alert("You cannot change " + oldStatus + " to " + newStatus);
      }
      return;
    }
  }
}

// form er upore message dekhano (error hole red, thik hole green)
function showMessage(boxId, text, isError) {
  let box = document.getElementById(boxId);
  box.innerHTML = text;
  box.style.display = "block";
  if (isError) {
    box.style.backgroundColor = "#FEE2E2";
    box.style.color = "#B91C1C";
  } else {
    box.style.backgroundColor = "#DCFCE7";
    box.style.color = "#15803D";
  }
}
