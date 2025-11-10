// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const address = this.querySelectorAll('input[type="text"]')[1].value;
        const brand = this.querySelector('select').value;
        const description = this.querySelector('textarea').value;
        
        // Create message for Zalo or phone call
        let message = `Xin chào anh Dương Vũ! Tôi cần sửa chữa đèn thủy sinh.\n\n`;
        message += `Thông tin khách hàng:\n`;
        message += `- Tên: ${name}\n`;
        message += `- Số điện thoại: ${phone}\n`;
        message += `- Địa chỉ: ${address}\n`;
        message += `- Thương hiệu đèn: ${brand}\n`;
        if (description) {
            message += `- Mô tả tình trạng: ${description}\n`;
        }
        message += `\nVui lòng liên hệ lại để tư vấn. Cảm ơn anh!`;
        
        // Create Zalo link
        const zaloLink = `https://zalo.me/0886090397?text=${encodeURIComponent(message)}`;
        
        // Show success message
        alert('Cảm ơn bạn đã gửi thông tin! Anh Dương Vũ sẽ liên hệ lại trong thời gian sớm nhất để tư vấn về đèn thủy sinh.');
        
        // Open Zalo chat
        window.open(zaloLink, '_blank');
        
        // Reset form
        this.reset();
    });
}

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function() {
        // Track phone call clicks (you can add analytics here)
        console.log('Phone call initiated:', this.href);
    });
});

// Zalo link click tracking
document.querySelectorAll('a[href*="zalo.me"]').forEach(zaloLink => {
    zaloLink.addEventListener('click', function() {
        // Track Zalo clicks (you can add analytics here)
        console.log('Zalo chat opened:', this.href);
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.brand-item, .service-item, .reason-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// WhatsApp integration (alternative to Zalo)
function openWhatsApp(phone, message) {
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Quick contact buttons
function quickContact(method) {
    const phone = '0886090397';
    const message = 'Xin chào anh Dương Vũ! Tôi cần tư vấn dịch vụ sửa chữa đèn thủy sinh. Vui lòng liên hệ lại. Cảm ơn anh!';
    
    switch(method) {
        case 'call':
            window.location.href = `tel:${phone}`;
            break;
        case 'zalo':
            window.open(`https://zalo.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
            break;
        case 'whatsapp':
            openWhatsApp(phone.replace(/^0/, '84'), message);
            break;
    }
}

// Add click handlers for quick contact
document.addEventListener('DOMContentLoaded', () => {
    // Add data attributes to contact buttons for tracking
    document.querySelectorAll('.btn-primary, .phone-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Track button clicks
            console.log('Contact button clicked:', btn.textContent.trim());
        });
    });
});

// Product order function - redirect to Facebook with product info
function orderProduct(productName, power, connection, price) {
    // Create detailed message
    let message = `Chào Dương Vũ, tôi muốn đặt hàng sản phẩm:\n\n`;
    message += `🔸 Sản phẩm: ${productName}\n`;
    message += `🔸 Công suất: ${power}\n`;
    message += `🔸 Kết nối: ${connection}\n`;
    message += `🔸 Bảo hành: 12 tháng\n`;
    message += `🔸 Giá: ${price}\n\n`;
    message += `Bạn hãy tư vấn thêm cho tôi nhé. Cảm ơn bạn!\n\n`;
    
    // Facebook cá nhân thật của Dương Vũ
    const facebookPageURL = 'https://www.facebook.com/duongvu.228386';
    
    // Create Facebook Messenger URL với username cá nhân
    const messengerURL = `https://m.me/duongvu.228386?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(messengerURL, '_blank');
    
    // Track order clicks
    console.log('Product order:', productName, price);
}