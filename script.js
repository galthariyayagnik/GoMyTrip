/* ============================================================
   ACTIVE NAVIGATION HIGHLIGHT
============================================================ */
document.querySelectorAll(".nav-links a")?.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active-link");
    }
});


/* ============================================================
   LOAD HOTELS FROM LOCAL STORAGE
============================================================ */
let hotels = JSON.parse(localStorage.getItem("hotels")) || [];


/* ============================================================
   DISPLAY HOTELS ON ACCOMMODATION PAGE
============================================================ */
function displayHotels(list) {
    const container = document.getElementById("accommodation-container");
    if (!container) return; 

    if (!list.length) {
        container.innerHTML = `
            <p style="text-align:center; color:#555; padding:20px; font-size:18px;">
                No hotels found.
            </p>`;
        return;
    }

    container.innerHTML = list.map((h, i) => `
        <div class="hotel-card" data-id="${i}">
            <img src="${h.image}" class="hotel-img"
                 onerror="this.src='../no-image.png'" />

            <h3>${h.name || "Hotel Name Not Available"}</h3>
            <p class="location">📍 ${h.location || "Location not added"}</p>

            <p class="price">₹${h.price || "0"}</p>

            <div class="details">
                <strong>Facilities:</strong>
                ${h.facilities?.length ? h.facilities.join(", ") : "Not available"}
            </div>

            <div class="details">
                <strong>Check-in:</strong> ${h.checkIn || "—"} |
                <strong>Check-out:</strong> ${h.checkOut || "—"}
            </div>

            <div class="details">
                <strong>Cancellation:</strong>
                ${h.facilities?.includes("Cancellation") ? "Available" : "Not available"}
            </div>
        </div>
    `).join("");

    bindHotelClicks();
}


displayHotels(hotels);


/* ============================================================
   SMART SEARCH
============================================================ */
function searchHotels() {
    const q = document.getElementById("searchInput")?.value.toLowerCase() || "";

    const filtered = hotels.filter(h =>
        h.name?.toLowerCase().includes(q) ||
        h.location?.toLowerCase().includes(q) ||
        h.facilities?.join(" ").toLowerCase().includes(q) ||
        h.rooms?.some(r => r.name.toLowerCase().includes(q))
    );

    displayHotels(filtered);
}


/* ============================================================
   CLICK → OPEN HOTEL DETAIL PAGE
============================================================ */
function bindHotelClicks() {
    document.querySelectorAll(".hotel-card").forEach(card => {
        card.addEventListener("click", () => {
            const id = card.dataset.id;

            localStorage.setItem("hotelId", id);

            // IMPORTANT: FIXED REDIRECT PATH
            window.location.href = "accommodation-detail.html";
        });
    });
}
/* ============================================================
   LOAD TOP DESTINATIONS ON HOME PAGE
============================================================ */
function loadDestinations() {
    let destinationBox = document.getElementById("dest-container");
    if (!destinationBox) return; // If not on home page

    let destinations = JSON.parse(localStorage.getItem("destinations")) || [];

    if (destinations.length === 0) {
        destinationBox.innerHTML = `
            <p style="text-align:center; color:#666; width:100%;">No destinations added yet.</p>
        `;
        return;
    }

    destinationBox.innerHTML = destinations.map(d => `
        <div class="dest-card">
            <img src="${d.image}" class="dest-img" 
                 onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
            <p class="dest-name">${d.name}</p>
        </div>
    `).join("");
}

loadDestinations();
/* USER MENU SYSTEM */

// Check login status
let loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || null;

function updateUserMenu() {
    let menu = document.getElementById("userDropdown");
    if (!menu) return;

    if (loggedUser) {
        // User logged in
        menu.innerHTML = `
            <a href="../User Page/user-profile.html">My Profile</a>
            <a href="../User Page/my-bookings.html">My Bookings</a>
            <a href="#" id="logoutBtn">Logout</a>
        `;

        // Add logout event
        setTimeout(() => {
            document.getElementById("logoutBtn").onclick = () => {
                localStorage.removeItem("loggedUser");
                loggedUser = null;
                updateUserMenu();
                alert("Logged out!");
            }
        }, 10);

    } else {
        // User NOT logged in
        menu.innerHTML = `
            <a href="../User Page/user-login.html">Login</a>
            <a href="../User Page/user-register.html">Register</a>
        `;
    }
}

// Toggle menu visibility
document.getElementById("userIcon")?.addEventListener("click", () => {
    let dropdown = document.getElementById("userDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

updateUserMenu();

function isUserLoggedIn() {
    const user = localStorage.getItem("loggedInUser");
    return user && user !== "null" && user !== "undefined";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "home.html";
}
