const supabaseUrl = "https://wldmnkdjgyxpacbjlwfr.supabase.co";
const supabaseKey = "sb_publishable_Utwa-4_IPf7uGBAVA4M0uQ_5dX5fYvb";

const client = window.supabase.createClient(supabaseUrl, supabaseKey);

async function getRooms() {
    const { data, error } = await client.from("rooms").select("*");

    if (error) {
        console.error(error);
        return;
    }

    tampilkanRooms(data);
}

function tampilkanRooms(rooms) {
    const listKamar = document.getElementById("list-kamar");

    listKamar.innerHTML = "";

    rooms.forEach((room) => {
        listKamar.innerHTML += `
            <div class="kamar-produk swiper-slide"> 
                <div class="kamar-produk-img">
                    <img src="${room.image}" alt="${room.name}">
                </div>
                <div class="kamar-produk-detail">
                    <h2>${room.name}</h2>
                    
                    <div class="kamar-produk-detail-icon">
                        <img src="../assets/icons/guest.svg">
                        <p>${room.guest} Tamu</p>
                    </div>
                    <div class="kamar-produk-detail-icon">
                        <img src="../assets/icons/bed-icon.svg">
                        <p>${room.bed} Tamu</p>
                    </div>
                    <p>Status : ${room.status}</p>
                    <h3>
                            Rp ${room.price.toLocaleString("id-ID")} / malam
                    </h3>
                    <a>Lihat Detail</a>
                </div>
            </div>
        `;
    });
}

getRooms();

AOS.init({
    once: true,
}); //initialization aos

const navbarMenu = document.querySelector(".navbar-menu");
const hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerMenu.addEventListener("click", () => {
    navbarMenu.classList.toggle("pop-up");
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
