const activeClasses = "bg-indigo-600 text-white";
const normalClasses =
  "px-4 py-1 border rounded-full text-sm text-gray-600 hover:bg-indigo-600 hover:text-white transition";

// Loading spinner functions
const showLoader = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="col-span-full flex justify-center items-center py-16">
      <span class="loading loading-spinner loading-lg text-indigo-600"></span>
    </div>
  `;
};

const hideLoader = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = "";
};

const createProductCard = (product) => {
  const productCard = document.createElement("div");
  productCard.className = "w-full";

  productCard.innerHTML = `
    <div class="bg-white rounded-xl shadow-md overflow-hidden 
                hover:shadow-lg transition duration-300 
                h-[420px] flex flex-col">
      
      <div class="bg-gray-100 flex justify-center items-center p-6 h-48">
        <img src="${product.image}"
             alt="${product.title}" 
             class="h-full object-contain">
      </div>

      <div class="p-5 flex flex-col justify-between flex-1">
        
        <div class="space-y-3">
          <div class="flex justify-between items-center text-sm">
            <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full truncate max-w-[120px]">
              ${product.category}
            </span>
            <span class="text-yellow-500 font-medium">
              ⭐ ${product.rating.rate} 
              <span class="text-gray-500">(${product.rating.count})</span>
            </span>
          </div>

          <h3 class="font-semibold text-gray-800 line-clamp-2">
            ${product.title}
          </h3>

          <p class="text-lg font-bold text-gray-900">
            $${product.price}
          </p>
        </div>

        <div class="flex gap-3 pt-2">
          <button class="details-btn flex-1 border cursor-pointer border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition">
            <i class="fa-solid fa-eye"></i> Details
          </button>
          <button class="add-btn flex-1 cursor-pointer bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            Add
          </button>
        </div>

      </div>
    </div>
  `;
  productCard
    .querySelector(".details-btn")
    .addEventListener("click", () => showProductDetails(product));
  productCard
    .querySelector(".add-btn")
    .addEventListener("click", () => addToCart(product));

  return productCard;
};

const allProducts = () => {
  showLoader("product-container");
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => displayAllProducts(data));
};

const displayAllProducts = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
  products.forEach((product) =>
    productContainer.appendChild(createProductCard(product)),
  );
};

const categories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data));
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("category-container");
  categoriesContainer.innerHTML = "";

  const setActive = (clickedBtn) => {
    document.querySelectorAll("#category-container button").forEach((btn) => {
      btn.className = normalClasses;
    });

    clickedBtn.classList.add("bg-indigo-600", "text-white");
  };

  const allBtn = document.createElement("button");
  allBtn.className = normalClasses;
  allBtn.textContent = "All";
  allBtn.classList.add("bg-indigo-600", "text-white");
  allBtn.addEventListener("click", () => {
    setActive(allBtn);
    showLoader("product-container");
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => displayAllProducts(data));
  });

  categoriesContainer.appendChild(allBtn);

// Add category buttons
  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.className = normalClasses;
    categoryBtn.textContent = category;

    categoryBtn.addEventListener("click", () => {
      setActive(categoryBtn);
      showLoader("product-container");
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => displayAllProducts(data));
    });

    categoriesContainer.appendChild(categoryBtn);
  });
};

const trendingProducts = () => {
  showLoader("trending-products");
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => displayTrandingProducts(data));
};

const displayTrandingProducts = (products) => {
  const sortedProducts = products
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 3);
  const trendingProductsContainer =
    document.getElementById("trending-products");
  trendingProductsContainer.innerHTML = "";
  sortedProducts.forEach((product) =>
    trendingProductsContainer.appendChild(createProductCard(product)),
  );
};


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCartToStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const addToCart = (product) => {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    showToast(`${product.title} is already in cart!`, "warning");
    return;
  }
  cart.push({ ...product, quantity: 1 });
  saveCartToStorage();
  updateCartBadge();
  showToast(`${product.title} added to cart!`, "success");
};

const showToast = (message, type = "success") => {
  // Remove existing toast if any
  const existingToast = document.getElementById("cart-toast");
  if (existingToast) existingToast.remove();

  const isWarning = type === "warning";
  const alertClass = isWarning ? "alert-warning" : "alert-success";
  const iconPath = isWarning
    ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";

  const toast = document.createElement("div");
  toast.id = "cart-toast";
  toast.className = `fixed top-0 right-80 z-50 alert ${alertClass} shadow-lg `;
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}" />
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

const updateCartBadge = () => {
  const badges = document.querySelectorAll(".indicator-item");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  badges.forEach((badge) => (badge.textContent = totalItems));

  // Update dropdown
  const itemsCount = document.getElementById("cart-items-count");
  const cartSubtotal = document.getElementById("cart-subtotal");

  if (itemsCount) itemsCount.textContent = `${totalItems} Items`;
  if (cartSubtotal)
    cartSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;

  // Also update navbar cart if components.js is loaded
  if (typeof window.updateNavbarCart === "function") {
    window.updateNavbarCart();
  }
};

// Initialize only if not using shared components
if (!document.getElementById("navbar")) {
  updateCartBadge();
}

// Only run product functions if their containers exist
if (document.getElementById("trending-products")) {
  trendingProducts();
}
if (document.getElementById("product-container")) {
  allProducts();
}
if (document.getElementById("category-container")) {
  categories();
}

const showProductDetails = (product) => {
  const modal = document.getElementById("productModal");
  const detailsContainer = document.getElementById("productDetails");

  if (!modal || !detailsContainer) return;

  detailsContainer.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/3">
                <img src="${product.image}" alt="${product.title}" class="w-full h-auto object-contain">
            </div>
            <div class="md:w-2/3">
                <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded mb-4">${product.category}</span>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">${product.title}</h2>
                <p class="text-gray-600 mb-6">${product.description}</p>
                <div class="flex items-center mb-4">
                    <div class="flex mr-3">
                        ${Array(5)
                          .fill(0)
                          .map((_, i) => {
                            if (i < Math.floor(product.rating.rate)) {
                              return '<i class="fas fa-star text-yellow-400"></i>';
                            } else if (
                              i === Math.floor(product.rating.rate) &&
                              product.rating.rate % 1 >= 0.5
                            ) {
                              return '<i class="fas fa-star-half-alt text-yellow-400"></i>';
                            }
                            return '<i class="far fa-star text-yellow-400"></i>';
                          })
                          .join("")}
                    </div>
                    <span class="text-gray-600">${product.rating.rate}/5 (${product.rating.count} reviews)</span>
                </div>
                <div class="text-3xl font-bold text-blue-600 mb-6">$${product.price}</div>
                <div class="flex space-x-4">
                    <button id="modalAddToCart" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Add to Cart
                    </button>
                    <button class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;

  // Add event listener for modal Add to Cart button
  const modalAddBtn = document.getElementById("modalAddToCart");
  if (modalAddBtn) {
    modalAddBtn.addEventListener("click", () => addToCart(product));
  }

  modal.classList.remove("hidden");
};

const setupModals = () => {
  const cartIcon = document.getElementById("cartIcon");
  const cartModal = document.getElementById("cartModal");
  const closeCart = document.getElementById("closeCart");
  const productModal = document.getElementById("productModal");
  const closeProductModal = document.getElementById("closeProductModal");

  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      cartModal.classList.remove("hidden");
      cartManager.updateCartModal();
    });
  }

  if (closeCart) {
    closeCart.addEventListener("click", () => {
      cartModal.classList.add("hidden");
    });
  }

  if (closeProductModal) {
    closeProductModal.addEventListener("click", () => {
      productModal.classList.add("hidden");
    });
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.classList.add("hidden");
    }
    if (e.target === productModal) {
      productModal.classList.add("hidden");
    }
  });
};

setupModals();
