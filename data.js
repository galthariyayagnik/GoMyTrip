/* =====================================================
   LOCALSTORAGE DATABASE INITIALIZATION
===================================================== */

// Initialize tables if not already created
if (!localStorage.getItem("hotels")) localStorage.setItem("hotels", JSON.stringify([]));
if (!localStorage.getItem("temples")) localStorage.setItem("temples", JSON.stringify([]));
if (!localStorage.getItem("blogs")) localStorage.setItem("blogs", JSON.stringify([]));
if (!localStorage.getItem("bookings")) localStorage.setItem("bookings", JSON.stringify([]));
if (!localStorage.getItem("subAdmins")) localStorage.setItem("subAdmins", JSON.stringify([]));

/* =====================================================
   ADD FUNCTIONS (ADMIN SIDE)
===================================================== */

// Add Hotel
function addHotel(hotel) {
    let hotels = JSON.parse(localStorage.getItem("hotels"));
    hotels.push(hotel);
    localStorage.setItem("hotels", JSON.stringify(hotels));
}

// Add Temple
function addTemple(temple) {
    let temples = JSON.parse(localStorage.getItem("temples"));
    temples.push(temple);
    localStorage.setItem("temples", JSON.stringify(temples));
}

// Add Blog
function addBlog(blog) {
    let blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
}

// Add Booking (User Side)
function addBooking(booking) {
    let bookings = JSON.parse(localStorage.getItem("bookings"));
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

// Add Sub Admin
function addSubAdmin(admin) {
    let admins = JSON.parse(localStorage.getItem("subAdmins"));
    admins.push(admin);
    localStorage.setItem("subAdmins", JSON.stringify(admins));
}


/* =====================================================
   UPDATE FUNCTIONS
===================================================== */

// Update Hotel
function updateHotel(id, updatedData) {
    let hotels = JSON.parse(localStorage.getItem("hotels"));
    hotels[id] = { ...hotels[id], ...updatedData };
    localStorage.setItem("hotels", JSON.stringify(hotels));
}

// Update Temple
function updateTemple(id, updatedData) {
    let temples = JSON.parse(localStorage.getItem("temples"));
    temples[id] = { ...temples[id], ...updatedData };
    localStorage.setItem("temples", JSON.stringify(temples));
}

// Update Blog
function updateBlog(id, updatedData) {
    let blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs[id] = { ...blogs[id], ...updatedData };
    localStorage.setItem("blogs", JSON.stringify(blogs));
}


/* =====================================================
   DELETE FUNCTIONS
===================================================== */

// Delete Hotel
function removeHotel(id) {
    let hotels = JSON.parse(localStorage.getItem("hotels"));
    hotels.splice(id, 1);
    localStorage.setItem("hotels", JSON.stringify(hotels));
}

// Delete Temple
function removeTemple(id) {
    let temples = JSON.parse(localStorage.getItem("temples"));
    temples.splice(id, 1);
    localStorage.setItem("temples", JSON.stringify(temples));
}

// Delete Blog
function removeBlog(id) {
    let blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.splice(id, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));
}

// Delete Booking
function removeBooking(id) {
    let bookings = JSON.parse(localStorage.getItem("bookings"));
    bookings.splice(id, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

// Delete Sub Admin
function removeSubAdmin(id) {
    let admins = JSON.parse(localStorage.getItem("subAdmins"));
    admins.splice(id, 1);
    localStorage.setItem("subAdmins", JSON.stringify(admins));
}


/* =====================================================
   GLOBAL EXPORTS (OPTIONAL FOR FUTURE BACKEND)
===================================================== */
function getHotels() { return JSON.parse(localStorage.getItem("hotels")); }
function getTemples() { return JSON.parse(localStorage.getItem("temples")); }
function getBlogs() { return JSON.parse(localStorage.getItem("blogs")); }
function getBookings() { return JSON.parse(localStorage.getItem("bookings")); }
function getSubAdmins() { return JSON.parse(localStorage.getItem("subAdmins")); }
if (!localStorage.getItem("destinations"))
    localStorage.setItem("destinations", JSON.stringify([]));

function addDestination(dest) {
    let d = JSON.parse(localStorage.getItem("destinations"));
    d.push(dest);
    localStorage.setItem("destinations", JSON.stringify(d));
}

function updateDestination(id, dest) {
    let d = JSON.parse(localStorage.getItem("destinations"));
    d[id] = dest;
    localStorage.setItem("destinations", JSON.stringify(d));
}

function deleteDestination(id) {
    let d = JSON.parse(localStorage.getItem("destinations"));
    d.splice(id, 1);
    localStorage.setItem("destinations", JSON.stringify(d));
}
// INITIALIZE STORAGE
if (!localStorage.getItem("hotels")) {
    localStorage.setItem("hotels", JSON.stringify([]));
}

if (!localStorage.getItem("destinations")) {
    localStorage.setItem("destinations", JSON.stringify([]));
}

if (!localStorage.getItem("temples")) {
    localStorage.setItem("temples", JSON.stringify([]));
}

if (!localStorage.getItem("blogs")) {
    localStorage.setItem("blogs", JSON.stringify([]));
}

console.log("LocalStorage Initialized");
