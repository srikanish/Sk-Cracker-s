// Product data
const productCategories = {
  "ONE SOUND CRACKERS": [
    { id: "1", name: '2 3/4" Kuruvi', per: "1 Pkt", mrp: 30, discount: 24, ourPrice: 6, inStock: true },
    {
      id: "2",
      name: '3 1/2" Redbull / Chotta bheem',per: "1 Pkt",mrp: 60, discount: 48, ourPrice: 12, inStock: true },
    { id: "3", name: '5" Vikram/Tiger/Jallikattu', per: "1 Pkt", mrp: 200, discount: 160, ourPrice: 40, inStock: true },
  ],
  "TWO SOUND CRACKERS": [
    { id: "4", name: "2 Sound", per: "1 Pkt", mrp: 145, discount: 116, ourPrice: 29, inStock: true },
  ],
  BIJILI: [
    { id: "5", name: "Red Bijili (100 Pcs)", per: "1 Pkt", mrp: 135, discount: 108, ourPrice: 27, inStock: true },
  ],
  "BOMBS (NAACHIAR/SRI VIJAI/RAMCO)": [
    { id: "6", name: "Bullet Bomb", per: "1 Box", mrp: 145, discount: 116, ourPrice: 29, inStock: true },
    { id: "7", name: "Hydro Bomb", per: "1 Box", mrp: 325, discount: 260, ourPrice: 65, inStock: true },
    { id: "8", name: "King of King Bomb", per: "1 Box", mrp: 395, discount: 316, ourPrice: 79, inStock: true },
    { id: "9", name: "Mega Flash", per: "1 Box", mrp: 625, discount: 500, ourPrice: 125, inStock: true },
    { id: "10", name: "555 Bomb", per: "1 Box", mrp: 550, discount: 440, ourPrice: 110, inStock: true },
  ],
  "FLOWER POTS": [
    { id: "11", name: "Flower Pots Small", per: "1 Box", mrp: 275, discount: 220, ourPrice: 55, inStock: true },
    { id: "12", name: "Flower Pots Big", per: "1 Box", mrp: 350, discount: 280, ourPrice: 70, inStock: true },
    { id: "13", name: "Flower Pots Asoka", per: "1 Box", mrp: 725, discount: 580, ourPrice: 145, inStock: true },
    { id: "14", name: "Colour Koti", per: "1 Box", mrp: 1050, discount: 840, ourPrice: 210, inStock: true },
  ],
  ROCKETS: [
    { id: "15", name: "Baby Rocket", per: "1 Box", mrp: 200, discount: 160, ourPrice: 40, inStock: true },
    { id: "16", name: "Colour Rocket", per: "1 Box", mrp: 300, discount: 240, ourPrice: 60, inStock: true },
    { id: "17", name: "Lunik Rocket", per: "1 Box", mrp: 800, discount: 640, ourPrice: 160, inStock: true },
    { id: "18", name: "Two Sound Rocket", per: "1 Box", mrp: 825, discount: 660, ourPrice: 165, inStock: true },
  ],
  SPARKLERS: [
    { id: "19", name: "10Cm Electric Sparklers", per: "1 Box", mrp: 85, discount: 68, ourPrice: 17, inStock: true },
    { id: "20", name: "15Cm Electric Sparklers", per: "1 Box", mrp: 180, discount: 144, ourPrice: 36, inStock: true },
    { id: "21", name: "50Cm Sparklers", per: "1 Box", mrp: 875, discount: 700, ourPrice: 175, inStock: true },
  ],
  "MULTICOLOUR SHOTS": [
    {
      id: "22",
      name: "12 Shots crackling / Raider star",
      per: "1 Pce",
      mrp: 1175,
      discount: 940,
      ourPrice: 235,
      inStock: true,
    },
    { id: "23", name: "30 Shot Multi Colour", per: "1 Pce", mrp: 1950, discount: 1560, ourPrice: 390, inStock: true },
    { id: "24", name: "60 Shot Multi Colour", per: "1 Pce", mrp: 3900, discount: 3120, ourPrice: 780, inStock: true },
  ],
}

// Cart functionality
let cart = []

// Update quantity function
function updateQuantity(productId, change) {
  const qtyInput = document.getElementById(`qty-${productId}`)
  const currentQty = Number.parseInt(qtyInput.value) || 0
  const newQty = Math.max(0, currentQty + change)
  qtyInput.value = newQty
}

// Add to cart function with green notification
function addToCart(id, name, per, mrp, discount, ourPrice) {
  const qtyInput = document.getElementById(`qty-${id}`)
  const quantity = Number.parseInt(qtyInput.value) || 0

  if (quantity === 0) {
    showNotification("Please select quantity first!", "error")
    return
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex((item) => item.id === id)

  if (existingItemIndex > -1) {
    // Update existing item quantity
    cart[existingItemIndex].quantity += quantity
  } else {
    // Add new item to cart
    cart.push({
      id: id,
      name: name,
      per: per,
      mrp: mrp,
      discount: discount,
      ourPrice: ourPrice,
      quantity: quantity,
    })
  }

  // Reset quantity input
  qtyInput.value = 0

  // Update cart display
  updateCartDisplay()

  // Show green success notification
  showNotification(`${name} added to cart successfully! 🎆`, "success")
}

// Remove item from cart function
function removeFromCart(productId) {
  // Find the item to remove
  const itemIndex = cart.findIndex(item => item.id === productId)
  
  if (itemIndex > -1) {
    const removedItem = cart[itemIndex]
    
    // Remove item from cart
    cart.splice(itemIndex, 1)
    
    // Update cart display
    updateCartDisplay()
    
    // Show notification
    showNotification(`${removedItem.name} removed from cart! 🗑️`, "success")
  }
}

// Update cart display with remove functionality
function updateCartDisplay() {
  const totalItemsElement = document.getElementById("total-items")
  const totalAmountElement = document.getElementById("total-amount")
  const cartItemsElement = document.getElementById("cart-items")

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = cart.reduce((sum, item) => sum + item.ourPrice * item.quantity, 0)
  const minimumOrderAmount = 3000

  // Update totals display
  totalItemsElement.textContent = totalItems
  totalAmountElement.textContent = `₹${totalAmount.toFixed(2)}`

  // Update cart items display
  cartItemsElement.innerHTML = ""

  if (cart.length > 0) {
    cart.forEach((item) => {
      const cartItemDiv = document.createElement("div")
      cartItemDiv.className = "cart-item"
      cartItemDiv.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: #f9fafb;
        border-radius: 0.25rem;
        margin-bottom: 0.5rem;
        position: relative;
      `
      
      cartItemDiv.innerHTML = `
        <div class="cart-item-info" style="flex: 1;">
          <div class="cart-item-name" style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.25rem;">${item.name}</div>
          <div class="cart-item-details" style="font-size: 0.75rem; color: #6b7280;">₹${item.ourPrice} × ${item.quantity}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div class="cart-item-total" style="font-size: 0.875rem; font-weight: bold;">₹${(item.ourPrice * item.quantity).toFixed(2)}</div>
          <button class="remove-item-btn" onclick="removeFromCart('${item.id}')" style="
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 0.75rem;
            font-weight: bold;
            transition: all 0.2s;
          " onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
            ✕
          </button>
        </div>
      `
      cartItemsElement.appendChild(cartItemDiv)
    })

    // Add minimum order indicator
    if (totalAmount < minimumOrderAmount) {
      const remainingAmount = minimumOrderAmount - totalAmount
      const minOrderDiv = document.createElement("div")
      minOrderDiv.className = "min-order-indicator"
      minOrderDiv.style.cssText = `
        background: #fef3c7;
        color: #92400e;
        padding: 0.75rem;
        border-radius: 0.5rem;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        text-align: center;
        border: 1px solid #fbbf24;
      `
      minOrderDiv.innerHTML = `
        ⚠️ Minimum order: ₹${minimumOrderAmount}<br>
        Add ₹${remainingAmount.toFixed(2)} more to checkout
      `
      cartItemsElement.appendChild(minOrderDiv)
    }
  }

  // Enable/disable buttons based on cart status and minimum order
  const clearBtn = document.querySelector(".clear-btn")
  const checkoutBtn = document.querySelector(".checkout-btn")

  if (cart.length === 0) {
    clearBtn.disabled = true
    checkoutBtn.disabled = true
  } else {
    clearBtn.disabled = false
    // Disable checkout if below minimum order amount
    checkoutBtn.disabled = totalAmount < minimumOrderAmount
    
    // Change checkout button text based on minimum order
    if (totalAmount < minimumOrderAmount) {
      checkoutBtn.textContent = `Minimum ₹${minimumOrderAmount}`
      checkoutBtn.style.background = "#6b7280"
    } else {
      checkoutBtn.textContent = "Checkout"
      checkoutBtn.style.background = "linear-gradient(90deg, #22c55e, #16a34a)"
    }
  }
}

// Clear cart function
function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = []
    updateCartDisplay()
    showNotification("Cart cleared successfully!", "success")
  }
}

// Checkout function with minimum order validation
function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error")
    return
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.ourPrice * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  // Minimum order amount validation
  const minimumOrderAmount = 3000
  
  if (totalAmount < minimumOrderAmount) {
    const remainingAmount = minimumOrderAmount - totalAmount
    showNotification(
      `Minimum order amount is ₹${minimumOrderAmount}. Please add ₹${remainingAmount.toFixed(2)} more to place order! 🛒`, 
      "error"
    )
    return
  }

  // If validation passes, proceed with order
  showNotification(`Order placed successfully! Total: ₹${totalAmount.toFixed(2)} 🎊`, "success")

  // Clear cart after checkout
  setTimeout(() => {
    cart = []
    updateCartDisplay()
  }, 2000)
}

// Green notification system
function showNotification(message, type = "success") {
  const notification = document.createElement("div")

  const backgroundColor = type === "success" ? "#22c55e" : "#ef4444"
  const icon = type === "success" ? "✅" : "❌"

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${backgroundColor};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    font-weight: 600;
    animation: slideIn 0.3s ease;
    max-width: 300px;
    font-size: 0.9rem;
  `

  notification.innerHTML = `${icon} ${message}`
  document.body.appendChild(notification)

  // Add CSS animation if not already added
  if (!document.getElementById("notification-styles")) {
    const style = document.createElement("style")
    style.id = "notification-styles"
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `
    document.head.appendChild(style)
  }

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Initialize cart display on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay()

  // Add event listeners for quantity inputs
  const qtyInputs = document.querySelectorAll(".qty-input")
  qtyInputs.forEach((input) => {
    input.addEventListener("change", function () {
      if (this.value < 0) {
        this.value = 0
      }
    })
  })
})

// FIXED: Navigation links - only prevent default for dropdown toggles
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href")
    
    // Only prevent default for dropdown toggles (#)
    if (href === "#") {
      e.preventDefault()
    }
    // Let other links work normally
  })
})