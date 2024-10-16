document.addEventListener('DOMContentLoaded', function() {
    let userData;
    let menuData;

    // Fetch data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            userData = data.user;
            menuData = data.menu;
            renderProfile();
            renderMenu();
            renderReferralInfo();
        });

    function renderProfile() {
        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `
            <p class="text-gray-800"><strong class="text-orange-500">Name:</strong> ${userData.name}</p>
            <p class="text-gray-800"><strong class="text-orange-500">Student ID:</strong> ${userData.studentId}</p>
            <p class="text-gray-800"><strong class="text-orange-500">Phone:</strong> ${userData.phone}</p>
            <p class="text-gray-800"><strong class="text-orange-500">Email:</strong> ${userData.email}</p>
            <p class="text-gray-800"><strong class="text-orange-500">Total Points:</strong> ${userData.totalPoints}</p>
            <p class="text-gray-800"><strong class="text-orange-500">Points in KSH:</strong> ${userData.pointsInKsh}</p>
            <h3 class="mt-6 text-2xl font-bold text-orange-500">Order History</h3>
            <table class="w-full mt-4 bg-white rounded-lg shadow-md overflow-hidden">
                <thead class="bg-orange-500 text-white">
                    <tr>
                        <th class="py-2 px-4 text-left">Food</th>
                        <th class="py-2 px-4 text-left">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${userData.orderHistory.map(order => `
                        <tr class="hover:bg-orange-100 transition-colors duration-200">
                            <td class="py-2 px-4 border-t">${order.food}</td>
                            <td class="py-2 px-4 border-t">${order.price}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    function renderMenu() {
        const menuItems = document.getElementById('menuItems');
        menuItems.innerHTML = menuData.map(item => `
            <div class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-200">
                <img src="${item.image}" alt="${item.title}" class="w-36 h-36 object-cover rounded-lg mb-2">
                <h3 class="font-bold text-orange-500">${item.title}</h3>
                <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                <div class="mt-2">
                    ${generateStars(item.rating)}
                </div>
            </div>
        `).join('');
    }

    function generateStars(rating) {
        return Array(5).fill().map((_, i) => `
            <i class="${i < rating ? 'fas' : 'far'} fa-star text-orange-400"></i>
        `).join('');
    }

    function renderReferralInfo() {
        const referralInfo = document.getElementById('referralInfo');
        referralInfo.innerHTML = `
            <p class="text-gray-800"><strong class="text-orange-500">Your Referral Link:</strong> ${userData.referralLink}</p>
            <p class="text-gray-800"><strong class="text-orange-500">Referrals Made:</strong> ${userData.referrals}</p>
            <p class="text-gray-800"><strong class="text-orange-500">Rewards Earned:</strong> ${userData.rewardsEarned}</p>
        `;
    }

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMenu = menuData.filter(item => 
            item.title.toLowerCase().includes(searchTerm)
        );
        renderFilteredMenu(filteredMenu);
    });

    // Sort functionality
    document.getElementById('sortSelect').addEventListener('change', function(e) {
        const sortValue = e.target.value;
        let sortedMenu = [...menuData];
        if (sortValue === 'lowToHigh') {
            sortedMenu.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'highToLow') {
            sortedMenu.sort((a, b) => b.price - a.price);
        }
        renderFilteredMenu(sortedMenu);
    });

    function renderFilteredMenu(filteredMenu) {
        const menuItems = document.getElementById('menuItems');
        menuItems.innerHTML = filteredMenu.map(item => `
            <div class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-200">
                <img src="${item.image}" alt="${item.title}" class="w-36 h-36 object-cover rounded-lg mb-2">
                <h3 class="font-bold text-orange-500">${item.title}</h3>
                <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                <div class="mt-2">
                    ${generateStars(item.rating)}
                </div>
            </div>
        `).join('');
    }

    // Feedback modal
    const modal = document.getElementById('feedbackModal');
    const openModalBtn = document.getElementById('openFeedbackBtn');
    const closeModalBtn = document.getElementById('closeFeedbackBtn');
    const feedbackForm = document.getElementById('feedbackForm');
    const stars = document.querySelectorAll('.fa-star');

    openModalBtn.onclick = function() {
        modal.classList.remove('hidden');
    }

    closeModalBtn.onclick = function() {
        modal.classList.add('hidden');
    }

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });

    feedbackForm.onsubmit = function(e) {
        e.preventDefault();
        const feedbackText = document.getElementById('feedbackText').value;
        const rating = document.querySelectorAll('.fas.fa-star').length;
        console.log('Feedback:', feedbackText, 'Rating:', rating);
        // Here you would typically send this data to your backend
        alert('Thank you for your feedback!');
        modal.classList.add('hidden');
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        // Here you would typically handle the logout process
        alert('Logged out successfully');
    });

    // Add neumorphism effect to buttons and input fields
    const buttons = document.querySelectorAll('button');
    const inputs = document.querySelectorAll('input');

    buttons.forEach(button => {
        button.classList.add('neumorphism-button');
    });

    inputs.forEach(input => {
        input.classList.add('neumorphism-input');
    });

    // Add parallax scrolling effect
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    });
});

// Add these styles to your CSS file or in a <style> tag in your HTML
/*
.neumorphism-button {
    background: #ff4500;
    box-shadow: 5px 5px 10px #cc3700, -5px -5px 10px #ff5300;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
    transition: all 0.3s ease;
}

.neumorphism-button:hover {
    box-shadow: inset 5px 5px 10px #cc3700, inset -5px -5px 10px #ff5300;
}

.neumorphism-input {
    background: #ffffff;
    box-shadow: inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff;
    border: none;
    border-radius: 10px;
    padding: 10px;
    transition: all 0.3s ease;
}

.neumorphism-input:focus {
    outline: none;
    box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
}

.parallax {
    position: relative;
    overflow: hidden;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
*/
