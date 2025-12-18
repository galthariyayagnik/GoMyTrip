console.log("admin.js loaded");


/* =====================================================
   FETCH LOCALSTORAGE DATA (GLOBAL)
===================================================== */
let hotels = JSON.parse(localStorage.getItem("hotels")) || [];
let temples = JSON.parse(localStorage.getItem("temples")) || [];
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
let admins = JSON.parse(localStorage.getItem("subAdmins")) || [];

/* =====================================================
   1️⃣ ACTIVE SIDEBAR MENU HIGHLIGHT
===================================================== */
const menuLinks = document.querySelectorAll(".menu-item");

menuLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});


/* =====================================================
   2️⃣ DASHBOARD COUNTERS
===================================================== */

function updateDashboardCounters() {
    const bookingCount = document.getElementById("total-bookings");
    const hotelCount = document.getElementById("active-hotels");
    const revenueCount = document.getElementById("total-revenue");
    const adminCount = document.getElementById("active-admins");

    if (bookingCount) bookingCount.innerText = bookings.length;
    if (hotelCount) hotelCount.innerText = hotels.length;
    if (adminCount) adminCount.innerText = admins.length;

    // Revenue sum
    let revenue = bookings.reduce((sum, b) => sum + Number(b.amount || 0), 0);
    if (revenueCount) revenueCount.innerText = "$" + revenue.toLocaleString();
}

updateDashboardCounters(); // Auto run on dashboard


/* =====================================================
   3️⃣ RECENT BOOKINGS TABLE (Dashboard)
===================================================== */
function loadRecentBookings() {
    const bookingTable = document.getElementById("recent-bookings");
    if (!bookingTable) return;

    if (bookings.length === 0) {
        bookingTable.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#777;">No bookings found.</td></tr>`;
        return;
    }

    bookingTable.innerHTML = bookings.map(b => `
        <tr>
            <td>${b.id || "N/A"}</td>
            <td>${b.name}</td>
            <td>${b.hotel}</td>
            <td>${b.checkin}</td>
            <td>${b.checkout}</td>
            <td class="${b.status === 'Confirmed' ? 'green' : 'orange'}">${b.status}</td>
            <td>$${b.amount}</td>
        </tr>
    `).join("");
}

loadRecentBookings();


/* =====================================================
   4️⃣ MANAGE HOTEL PAGE
===================================================== */
function loadManageHotels() {
    const table = document.getElementById("hotel-table");
    if (!table) return;

    if (hotels.length === 0) {
        table.innerHTML = `<tr><td colspan="4" style="text-align:center;">No hotels found</td></tr>`;
        return;
    }

    table.innerHTML = hotels.map((h, i) => `
        <tr>
            <td>${h.name}</td>
            <td>${h.location}</td>
            <td>${h.price}</td>
            <td>
                <button onclick="editHotel(${i})" class="edit-btn">Edit</button>
                <button onclick="deleteHotel(${i})" class="delete-btn">Delete</button>
            </td>
        </tr>
    `).join("");
}

function deleteHotel(id) {
    if (!confirm("Are you sure you want to delete this hotel?")) return;

    hotels.splice(id, 1);
    localStorage.setItem("hotels", JSON.stringify(hotels));
    loadManageHotels();
}

function editHotel(id) {
    localStorage.setItem("editHotelId", id);
    window.location.href = "admin-add-hotel.html";
}

loadManageHotels();


/* =====================================================
   5️⃣ MANAGE TEMPLE PAGE
===================================================== */
function loadManageTemples() {
    const table = document.getElementById("temple-table");
    if (!table) return;

    if (temples.length === 0) {
        table.innerHTML = `<tr><td colspan="4" style="text-align:center;">No temple data found</td></tr>`;
        return;
    }

    table.innerHTML = temples.map((t, i) => `
        <tr>
            <td>${t.name}</td>
            <td>${t.time}</td>
            <td>
                <button onclick="editTemple(${i})" class="edit-btn">Edit</button>
                <button onclick="deleteTemple(${i})" class="delete-btn">Delete</button>
            </td>
        </tr>
    `).join("");
}

function deleteTemple(id) {
    if (!confirm("Delete this temple?")) return;

    temples.splice(id, 1);
    localStorage.setItem("temples", JSON.stringify(temples));
    loadManageTemples();
}

function editTemple(id) {
    localStorage.setItem("editTempleId", id);
    window.location.href = "admin-add-temple.html";
}

loadManageTemples();


/* =====================================================
   6️⃣ MANAGE BLOG PAGE
===================================================== */
function loadManageBlogs() {
    const table = document.getElementById("blog-table");
    if (!table) return;

    if (blogs.length === 0) {
        table.innerHTML = `<tr><td colspan="4" style="text-align:center;">No blogs found</td></tr>`;
        return;
    }

    table.innerHTML = blogs.map((b, i) => `
        <tr>
            <td>${b.title}</td>
            <td>
                <button onclick="editBlog(${i})" class="edit-btn">Edit</button>
                <button onclick="deleteBlog(${i})" class="delete-btn">Delete</button>
            </td>
        </tr>
    `).join("");
}

function deleteBlog(id) {
    if (!confirm("Delete this blog?")) return;

    blogs.splice(id, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadManageBlogs();
}

function editBlog(id) {
    localStorage.setItem("editBlogId", id);
    window.location.href = "admin-add-blog.html";
}

loadManageBlogs();


/* =====================================================
   7️⃣ GLOBAL BUTTON STYLES (Optional Auto Style)
===================================================== */
const style = document.createElement("style");
style.innerHTML = `
.edit-btn {
    padding: 6px 12px;
    background: #3498db;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
.delete-btn {
    padding: 6px 12px;
    background: #e74c3c;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
.delete-btn:hover { background: #c0392b; }
.edit-btn:hover { background: #2980b9; }
`;
document.head.appendChild(style);
// ================= DEBUG =================
console.log("admin.js loaded");

// ================= ADMIN LOGIN =================
function adminLogin() {
    const usernameInput = document.getElementById("adminUsername");
    const passwordInput = document.getElementById("adminPassword");
    const errorBox = document.getElementById("loginError");

    if (!usernameInput || !passwordInput) {
        alert("Input fields not found");
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // DEMO CREDENTIALS
    if (username === "you3212@gmail.com" && password === "Yagnik@610") {
        localStorage.setItem("adminLogin", "true");
        window.location.href = "admin.html";
    } else {
        errorBox.innerText = "Invalid username or password";
    }
}

// ================= CHECK LOGIN =================
function checkAdminLogin() {
    if (localStorage.getItem("adminLogin") !== "true") {
        window.location.href = "admin-login.html";
    }
}

// ================= LOGOUT =================
function adminLogout() {
    localStorage.removeItem("adminLogin");
    window.location.href = "admin-login.html";
}
