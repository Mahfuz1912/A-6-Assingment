// Shared Navbar Component
const loadNavbar = () => {
  const navbar = `
    <section class="w-11/12 mx-auto">
      <div class="navbar bg-base-100">
        <div class="navbar-start">
          <a href="./index.html" class="btn btn-ghost text-xl text-primary font-bold">SwiftCart</a>
        </div>

        <!-- Desktop Menu -->
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            <li><a href="./index.html" class="${window.location.pathname.includes("index") || window.location.pathname.endsWith("/") ? "active" : ""}">Home</a></li>
            <li><a href="./product.html" class="${window.location.pathname.includes("product") ? "active" : ""}">Products</a></li>

            <li><a href="#contact">Contact</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>

        <div class="navbar-end">
          <div class="flex-none">
            <!-- Shopping Cart -->
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <div class="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span class="badge badge-sm indicator-item">0</span>
                </div>
              </div>
              <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-50 mt-3 w-52 shadow">
                <div class="card-body">
                  <span id="cart-items-count" class="text-lg font-bold">0 Items</span>
                  <span id="cart-subtotal" class="text-info">Subtotal: $0</span>
                  <div class="card-actions">
                    <a href="./cart.html" class="btn btn-primary btn-block">View cart</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hamburger Menu (Mobile) -->
            <div class="dropdown dropdown-end lg:hidden">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle" title="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow right-0">
                <li><a href="./index.html">Home</a></li>
                <li><a href="./product.html">Products</a></li>
                <li><a href="./cart.html">Cart</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById("navbar").innerHTML = navbar;
  updateNavbarCart();
};

// Shared Footer Component
const loadFooter = () => {
  const footer = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-xl font-bold mb-4 text-primary">SwiftCart</h3>
          <p class="text-gray-400">
            Your one-stop shop for all your fashion and lifestyle needs.
            Quality products, fast delivery, and excellent support.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">QUICK LINKS</h4>
          <ul class="space-y-2">
            <li><a href="./index.html" class="text-gray-400 hover:text-white transition">Home</a></li>
            <li><a href="./product.html" class="text-gray-400 hover:text-white transition">Products</a></li>
            <li><a href="./cart.html" class="text-gray-400 hover:text-white transition">Cart</a></li>
            <li><a href="#contact" class="text-gray-400 hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-lg font-semibold mb-4">SUPPORT</h4>
          <ul class="space-y-2">
            <li><a href="#faq" class="text-gray-400 hover:text-white transition">FAQ</a></li>
            <li><a href="#shipping" class="text-gray-400 hover:text-white transition">Shipping</a></li>
            <li><a href="#returns" class="text-gray-400 hover:text-white transition">Returns</a></li>
            <li><a href="#privacy" class="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-lg font-semibold mb-4">SUBSCRIBE TO OUR NEWSLETTER</h4>
          <p class="text-gray-400 mb-4">The latest news, articles, and resources, sent to your inbox weekly.</p>
          <form id="newsletterForm" class="space-y-3">
            <input type="email" placeholder="Enter your email" class="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600" required />
            <button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Subscribe</button>
          </form>
        </div>
      </div>

      <!-- Social Links & Copyright -->
      <div class="border-t border-gray-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-center">&copy; 2025 SwiftCart, Inc. All rights reserved.</p>
          <div class="flex space-x-6 mb-4 md:mb-0">
            <a href="#" class="text-white text-2xl transition" title="Twitter"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" class="text-white text-2xl transition" title="Facebook"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" class="text-white text-2xl" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="text-white text-2xl transition" title="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#" class="text-white text-2xl" title="Email"><i class="fa-regular fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("footer").innerHTML = footer;
};

// Update navbar cart badge from localStorage
const updateNavbarCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const badges = document.querySelectorAll(".indicator-item");
  badges.forEach((badge) => (badge.textContent = totalItems));

  const itemsCount = document.getElementById("cart-items-count");
  const cartSubtotal = document.getElementById("cart-subtotal");

  if (itemsCount) itemsCount.textContent = `${totalItems} Items`;
  if (cartSubtotal)
    cartSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
};

// Make updateNavbarCart globally accessible
window.updateNavbarCart = updateNavbarCart;

// Initialize components

loadNavbar();
loadFooter();
