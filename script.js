
AOS.init( {
    once : true
}) ; //initialization aos

const navbarMenu = document.querySelector(".navbar-menu");
const hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerMenu.addEventListener("click", ()=> {
    navbarMenu.classList.toggle("pop-up")
});

document.addEventListener("click", (e) => {
    if (
        navbarMenu.classList.contains("pop-up") &&
        !navbarMenu.contains(e.target) &&
        !hamburgerMenu.contains(e.target)
    ) {
        navbarMenu.classList.remove("pop-up");
    }
});

const swiper = new Swiper(".kamar-produk-container", {
    slidesPerView: 1.2 /* Menampilkan 1 kartu penuh + sedikit potongan kartu berikutnya (seperti pada gambar mockup Anda) */,
    spaceBetween: 16 /* Jarak antar kartu produk (dalam piksel) */,
    grabCursor: true /* Mengubah kursor mouse menjadi icon tangan siap geser */,

    /* Pengaturan Responsif Layar */
    breakpoints: {
        // Layar HP berukuran sedang ke atas (contoh: mulai lebar 480px)
        480: {
            slidesPerView: 2.2,
            spaceBetween: 20,
        },
        // Layar Tablet/Laptop (mulai lebar 768px)
        768: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
        // Layar Monitor besar (mulai lebar 1024px)
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },
});