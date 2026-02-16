const activeClasses = "bg-indigo-600 text-white";
const normalClasses =
  "px-4 py-1 border rounded-full text-sm text-gray-600 hover:bg-indigo-600 hover:text-white transition";


// active-nav.js
function setActiveNavLink() {
  const links = document.querySelectorAll('.menu a');
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // Remove existing active classes
      link.classList.remove('text-primary', 'font-semibold');
      
      // Check if this link matches current page
      if (href === currentPage || 
          (currentPage === '' && href === 'index.html') ||
          (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('text-primary', 'font-semibold');
      }
    }
  });
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', setActiveNavLink);
  const allProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      displayAllProducts(data);
    });
};

const displayAllProducts = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // clear previous products

  products.forEach((product) => {
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
            <button class="flex-1 border cursor-pointer border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition">
              <i class="fa-solid fa-eye"></i> Details
            </button>
            <button class="flex-1 cursor-pointer bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Add
            </button>
          </div>

        </div>
      </div>
    `;

    productContainer.appendChild(productCard);
  });
};

const categories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayCategories(data);
    });
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

  // ALL button
  const allBtn = document.createElement("button");
  allBtn.className = normalClasses;
  allBtn.textContent = "All";
  allBtn.classList.add("bg-indigo-600", "text-white");
  allBtn.addEventListener("click", () => {
    setActive(allBtn);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => displayAllProducts(data));
  });

  categoriesContainer.appendChild(allBtn);

  // Dynamic categories
  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.className = normalClasses;
    categoryBtn.textContent = category;

    categoryBtn.addEventListener("click", () => {
      setActive(categoryBtn);

      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => displayAllProducts(data));
    });

    categoriesContainer.appendChild(categoryBtn);
  });
};

const trendingProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      displayTrandingProducts(data);
    });
};

const displayTrandingProducts = (products) => {
  const sortedProducts = products
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 3);
  const trendingProductsContainer =
    document.getElementById("trending-products");
  sortedProducts.forEach((product) => {
    const productCard = document.createElement("div");
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
        <button class="flex-1 border cursor-pointer border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition">
          <i class="fa-solid fa-eye"></i> Details
        </button>
        <button class="flex-1 cursor-pointer bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Add
        </button>
      </div>

    </div>
  </div>
`;

    trendingProductsContainer.appendChild(productCard);
  });
};

trendingProducts();
allProducts();
categories();


