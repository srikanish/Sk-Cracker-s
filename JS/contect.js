// Complete Contact Page JavaScript with Mobile Menu + Form Validation
document.addEventListener("DOMContentLoaded", () => {
  // ========== MOBILE MENU FUNCTIONALITY ==========
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const body = document.body;
  
  console.log('Mobile Toggle:', mobileToggle);
  console.log('Nav Menu:', navMenu);
  
  if (mobileToggle && navMenu) {
    // Mobile Menu Toggle Function
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Mobile toggle clicked');
      
      // Toggle the active class
      navMenu.classList.toggle('active');
      
      // Change the icon and prevent body scroll
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          // Menu is open
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
          body.style.overflow = 'hidden';
          console.log('Menu opened');
        } else {
          // Menu is closed
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
          body.style.overflow = 'auto';
          console.log('Menu closed');
        }
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          navMenu.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
          body.style.overflow = 'auto';
        }
      }
    });
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Handle dropdown toggle
        if (href === '#' || !href) {
          e.preventDefault();
          return;
        }
        
        // Close mobile menu after clicking any link
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
          body.style.overflow = 'auto';
        }
      });
    });
    
    // Handle dropdown functionality
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      const dropdownLink = dropdown.querySelector('.nav-link');
      
      if (dropdownContent && dropdownLink) {
        // Desktop hover
        dropdown.addEventListener('mouseenter', function() {
          if (window.innerWidth > 768) {
            dropdownContent.style.opacity = '1';
            dropdownContent.style.visibility = 'visible';
            dropdownContent.style.transform = 'translateY(0)';
          }
        });
        
        dropdown.addEventListener('mouseleave', function() {
          if (window.innerWidth > 768) {
            dropdownContent.style.opacity = '0';
            dropdownContent.style.visibility = 'hidden';
            dropdownContent.style.transform = 'translateY(-10px)';
          }
        });
        
        // Mobile click
        dropdownLink.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            
            const isVisible = dropdownContent.style.opacity === '1';
            if (isVisible) {
              dropdownContent.style.opacity = '0';
              dropdownContent.style.visibility = 'hidden';
              dropdownContent.style.transform = 'translateY(-10px)';
            } else {
              dropdownContent.style.opacity = '1';
              dropdownContent.style.visibility = 'visible';
              dropdownContent.style.transform = 'translateY(0)';
            }
          }
        });
      }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        body.style.overflow = 'auto';
      }
    });
    
  } else {
    console.error('Mobile toggle or nav menu not found!');
  }
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // ========== CONTACT FORM FUNCTIONALITY ==========
  const contactForm = document.getElementById("contactForm")
  
  if (!contactForm) {
    console.log('Contact form not found');
    return;
  }
  
  const submitBtn = contactForm.querySelector(".submit-btn")
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")

  // Initialize EmailJS (you need to get these from emailjs.com)
  const EMAILJS_SERVICE_ID = "your_service_id" // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = "your_template_id" // Replace with your EmailJS template ID
  const EMAILJS_PUBLIC_KEY = "your_public_key" // Replace with your EmailJS public key

  // Load EmailJS library
  const emailjsScript = document.createElement("script")
  emailjsScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
  emailjsScript.onload = () => {
    window.emailjs = window.emailjs || {}
    window.emailjs.init = window.emailjs.init || (() => {})
    window.emailjs.init(EMAILJS_PUBLIC_KEY)
  }
  document.head.appendChild(emailjsScript)

  // Form validation function
  function validateForm() {
    const requiredFields = [
      { id: "firstName", name: "First Name" },
      { id: "lastName", name: "Last Name" },
      { id: "email", name: "Email" },
      { id: "phone", name: "Phone Number" },
      { id: "subject", name: "Subject" },
      { id: "message", name: "Message" },
    ]

    let isValid = true
    const emptyFields = []

    // Remove existing error messages
    document.querySelectorAll(".error-message").forEach((error) => error.remove())
    document.querySelectorAll(".form-group.error").forEach((group) => group.classList.remove("error"))

    // Check each required field
    requiredFields.forEach((field) => {
      const input = document.getElementById(field.id)
      if (!input) return;
      
      const formGroup = input.closest(".form-group")
      if (!input.value.trim()) {
        isValid = false
        emptyFields.push(field.name)
        // Add error styling
        formGroup.classList.add("error")
        // Add error message
        const errorMsg = document.createElement("span")
        errorMsg.className = "error-message"
        errorMsg.textContent = "Fill the field"
        errorMsg.style.color = "#e74c3c"
        errorMsg.style.fontSize = "12px"
        errorMsg.style.marginTop = "5px"
        errorMsg.style.display = "block"
        formGroup.appendChild(errorMsg)
      }
    })

    // Email validation
    const emailInput = document.getElementById("email")
    if (emailInput && emailInput.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(emailInput.value.trim())) {
        isValid = false
        const formGroup = emailInput.closest(".form-group")
        formGroup.classList.add("error")
        const errorMsg = document.createElement("span")
        errorMsg.className = "error-message"
        errorMsg.textContent = "Please enter a valid email address"
        errorMsg.style.color = "#e74c3c"
        errorMsg.style.fontSize = "12px"
        errorMsg.style.marginTop = "5px"
        errorMsg.style.display = "block"
        formGroup.appendChild(errorMsg)
      }
    }

    // Phone validation
    const phoneInput = document.getElementById("phone")
    if (phoneInput && phoneInput.value.trim()) {
      const phoneRegex = /^[+]?[\d\s\-()]{10,}$/
      if (!phoneRegex.test(phoneInput.value.trim())) {
        isValid = false
        const formGroup = phoneInput.closest(".form-group")
        formGroup.classList.add("error")
        const errorMsg = document.createElement("span")
        errorMsg.className = "error-message"
        errorMsg.textContent = "Please enter a valid phone number"
        errorMsg.style.color = "#e74c3c"
        errorMsg.style.fontSize = "12px"
        errorMsg.style.marginTop = "5px"
        errorMsg.style.display = "block"
        formGroup.appendChild(errorMsg)
      }
    }

    return isValid
  }

  // Alternative: Simple mailto approach (works immediately without setup)
  function sendEmailSimple(formData) {
    const subject = `Contact Form: ${formData.subject}`
    const body =
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Sent from SK Crackers Contact Form`

    const mailtoLink = `mailto:srikanishthanu2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, "_blank")
    return { success: true, simple: true }
  }

  // Form submission handler
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".form-group.error")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    // Show loading state
    submitBtn.disabled = true
    btnText.style.display = "none"
    btnLoading.style.display = "inline"

    try {
      // Collect form data
      const formData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value.trim(),
      }

      // Use simple mailto approach
      const result = sendEmailSimple(formData)

      if (result.success) {
        // Show success message
        showMessage(
          "Your email client has been opened with the message. Please send it to complete your submission.",
          "info",
        )

        // Reset form
        contactForm.reset()

        // Remove any error styling
        document.querySelectorAll(".form-group.error").forEach((group) => {
          group.classList.remove("error")
        })
        document.querySelectorAll(".error-message").forEach((error) => error.remove())
      }
    } catch (error) {
      console.error("Form submission error:", error)
      showMessage("Sorry, there was an error. Please try again.", "error")
    } finally {
      // Reset button state
      submitBtn.disabled = false
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
    }
  })

  // Function to show messages
  function showMessage(message, type) {
    // Remove existing messages
    document.querySelectorAll(".form-message").forEach((msg) => msg.remove())

    const messageDiv = document.createElement("div")
    messageDiv.className = `form-message ${type}`
    messageDiv.textContent = message

    // Styling based on type
    const styles = {
      success: { backgroundColor: "#d4edda", color: "#155724", borderColor: "#c3e6cb" },
      error: { backgroundColor: "#f8d7da", color: "#721c24", borderColor: "#f5c6cb" },
      info: { backgroundColor: "#d1ecf1", color: "#0c5460", borderColor: "#bee5eb" },
    }

    Object.assign(messageDiv.style, {
      padding: "12px 20px",
      margin: "20px 0",
      border: "1px solid",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      ...styles[type],
    })

    // Insert message after form
    contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling)

    // Auto remove after 8 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove()
      }
    }, 8000)

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  // Real-time validation on input
  const inputs = contactForm.querySelectorAll("input[required], select[required], textarea[required]")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      const formGroup = this.closest(".form-group")
      const existingError = formGroup.querySelector(".error-message")
      if (!this.value.trim()) {
        if (!existingError) {
          formGroup.classList.add("error")
          const errorMsg = document.createElement("span")
          errorMsg.className = "error-message"
          errorMsg.textContent = "Fill the field"
          errorMsg.style.color = "#e74c3c"
          errorMsg.style.fontSize = "12px"
          errorMsg.style.marginTop = "5px"
          errorMsg.style.display = "block"
          formGroup.appendChild(errorMsg)
        }
      } else {
        formGroup.classList.remove("error")
        if (existingError) {
          existingError.remove()
        }
      }
    })
  })
})

// Add CSS for error styling and mobile menu
const style = document.createElement("style")
style.textContent = `
    /* Form Error Styles */
    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.1) !important;
    }
    
    .form-group.error label {
        color: #e74c3c !important;
    }
    
    .error-message {
        animation: fadeIn 0.3s ease-in;
    }
    
    .form-message {
        animation: slideIn 0.4s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }

    /* Mobile Menu Styles */
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block !important;
            background: none;
            border: none;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 4px;
            transition: all 0.3s ease;
            z-index: 1001;
        }
        
        .mobile-menu-toggle:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .nav-menu {
            position: fixed !important;
            top: 80px;
            left: 0;
            width: 100% !important;
            height: calc(100vh - 80px);
            background: rgba(0, 0, 0, 0.95) !important;
            backdrop-filter: blur(10px);
            flex-direction: column !important;
            justify-content: flex-start;
            align-items: center;
            padding: 2rem 0;
            gap: 1rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 999;
            overflow-y: auto;
            list-style: none;
            margin: 0;
            display: flex !important;
        }
        
        .nav-menu.active {
            transform: translateX(0) !important;
        }
        
        .nav-item {
            width: 90%;
            text-align: center;
            margin: 0;
        }
        
        .nav-link {
            display: block !important;
            width: 100%;
            padding: 1rem !important;
            font-size: 1.1rem;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1) !important;
            margin-bottom: 0.5rem;
            color: #fff !important;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .nav-link:hover {
            background: rgba(255, 215, 0, 0.2) !important;
            color: #ffd700 !important;
        }
        
        .order-btn {
            background: linear-gradient(45deg, #ff6b35, #ffd700) !important;
            color: #000 !important;
            font-weight: bold !important;
        }
        
        .dropdown-content {
            position: static !important;
            background: rgba(255, 255, 255, 0.1) !important;
            box-shadow: none !important;
            border-radius: 8px;
            margin-top: 0.5rem;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            width: 100%;
        }
        
        .dropdown-content a {
            padding: 0.8rem 1rem !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff !important;
            text-decoration: none;
            display: block;
            background: none !important;
            margin: 0;
        }
        
        .header {
            position: fixed !important;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.9) !important;
        }
        
        .contact-hero {
            margin-top: 80px;
        }
    }

    @media (min-width: 769px) {
        .mobile-menu-toggle {
            display: none !important;
        }
        
        .nav-menu {
            position: static !important;
            transform: none !important;
            background: none !important;
            height: auto !important;
            flex-direction: row !important;
            padding: 0 !important;
            gap: 2rem !important;
            width: auto !important;
            display: flex !important;
        }
    }
`
document.head.appendChild(style)