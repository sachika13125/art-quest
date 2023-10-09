// Navigation bar
function toggleMobileMenu() {
    let mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
    } else {
        mobileMenu.style.display = 'none';
    }
}