function loadKitchenPage() {
    checkLogin("kitchen");
    showUserName();
    showKitchenOrders();
}

function showKitchenOrders() {
    let orders = getData("orders");
    let html = "";
    let pending = 0;
    let preparing = 0;
    let ready = 0;

    for (let i = 0; i < orders.length; i++) {
        let o = orders[i];

        // delivered order kitchen e dekhabe na
        if (o.status == "Delivered") {
            continue;
        }

        let action = "";
        if (o.status == "Pending") {
            pending++;
            action = '<button type="button" class="btn btn-blue btn-small" onclick="updateKitchenStatus(' + o.orderId + ', \'Preparing\')">Mark Preparing</button>';
        } else if (o.status == "Preparing") {
            preparing++;
            action = '<button type="button" class="btn btn-green btn-small" onclick="updateKitchenStatus(' + o.orderId + ', \'Ready\')">Mark Ready</button>';
        } else if (o.status == "Ready") {
            ready++;
            action = '<button type="button" class="btn btn-grey btn-small" disabled>Ready for Delivery</button>';
        }

        // item gula list akare
        let itemList = "<ul class='item-list'>";
        for (let j = 0; j < o.items.length; j++) {
            itemList += "<li>" + o.items[j].foodName + " x" + o.items[j].qty + "</li>";
        }
        itemList += "</ul>";

        if (o.note != "") {
            itemList += "<span class='order-note'>Note: " + o.note + "</span>";
        }

        html += "<tr>";
        html += "<td>#" + o.orderId + "<span class='order-time'>" + o.orderTime + "</span></td>";
        html += "<td>" + o.customerName + "</td>";
        html += "<td>" + itemList + "</td>";
        html += "<td>" + getBadge(o.status) + "</td>";
        html += "<td>" + action + "</td>";
        html += "</tr>";
    }

    if (html == "") {
        html = '<tr><td colspan="5" class="empty-text">No active orders right now.</td></tr>';
    }

    document.getElementById("kitchenRows").innerHTML = html;
    document.getElementById("pendingCount").innerHTML = pending;
    document.getElementById("preparingCount").innerHTML = preparing;
    document.getElementById("readyCount").innerHTML = ready;
}

function updateKitchenStatus(orderId, newStatus) {
    changeOrderStatus(orderId, newStatus);
    showKitchenOrders();
}