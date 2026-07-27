const loading = document.getElementById("loading-screen");
const supabaseUrl = "https://wldmnkdjgyxpacbjlwfr.supabase.co";
const supabaseKey = "sb_publishable_Utwa-4_IPf7uGBAVA4M0uQ_5dX5fYvb";
const client = window.supabase.createClient(supabaseUrl, supabaseKey);
const params = new URLSearchParams(window.location.search);
const roomId = params.get("id");

console.log(roomId);

async function getRooms() {
    const { data, error } = await client
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    tampilkanRoom(data); // sementara ambil kamar pertama
    initSwiper();
    setTimeout(() => {
        loading.classList.add("hide");

        setTimeout(() => {
            loading.remove();
        }, 400);
    }, 500);
}

function tampilkanRoom(room) {
    document.title = `${room.name} | Uni Reservasi`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute("content", room.description);
    }

    const detailKamar = document.getElementById("detail-kamar");
    const footer = document.getElementById("contact");

    footer.innerHTML = "";
    detailKamar.innerHTML = "";

    detailKamar.innerHTML = `
    <div class="detail-header">
        <h1>${room.name}</h1>
        <div class="detail-halaman">
            <a href="../index.html">Beranda</a>
            <span>></span>
            <a href="../kamar-page/index.html" id="lokasi-halaman">Kamar</a>
            <span>></span>
            <a id="detail-halaman">${room.name}</a>
        </div>
    </div>
    <div class="detail-content">
        <div class="detail-content-img">
            <div class="detail-img-container swiper swiper-main">
                <div class="detail-img-wrapper swiper-wrapper">
                    ${room.images
                        .map(
                            (image) => `
                            <div class="swiper-slide">
                                <img src="${image}" alt="${room.name}">
                            </div>`,
                        )
                        .join("")}
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="swiper swiper-thumbs">
                <div class="swiper-wrapper">
                    ${room.images
                        .map(
                            (image) => `
                            <div class="swiper-slide">
                                <img src="${image}" alt="${room.name}">
                            </div>`,
                        )
                        .join("")}
                </div>
            </div>
        </div>
        <div class="about">
            <h1>${room.name}</h1>
            <h2>Rp ${room.price.toLocaleString("id-ID")} <span>/malam</span></h2>
            <span class="status ${room.status.toLowerCase()}">
                        ${room.status}
            </span>
            <div class="about-capacity">
                <div class="guest">
                    <img src="../assets/icons/guest-icon.png" alt=""/>
                    <p>${room.guest} Tamu</p>
                </div>
                <div class="bed">
                    <img src="../assets/icons/bed-icon.png" alt=""/>
                    <p>${room.bed}</p>
                </div>
            </div>
            <div class="about-button">
                <img src="../assets/icons/whatsapp-icon-white.svg" alt="">
                <a href="">Reservasi Via Whatsapp</a>
            </div>
        </div>
    </div>

    <div class="detail-content-second">
        <div class="description">
            <h3>Deskripsi</h3>
            <p>${room.description}</p>
        </div>
        <div class="fasilitas">
            <div class="fasilitas-header">
                <h3>fasilitas</h3>
            </div>
            <div class="fasilitas-content">
                ${room.fasilitas
                    .map(
                        (item) => `
                        <div class="fasilitas-list">
                            <img src="../assets/icons/check-rounded-icon.svg" alt=""/>
                            <p>${item}</p>
                        </div>`,
                    )
                    .join("")}
            </div>
        </div>
        <div class="rules">
            <h4>Ketentuan / Aturan</h4>
            ${room.rules
                .map(
                    (rule) => `
                    <div class="rules-content">
                        <img src="../assets/icons/no-icon.svg">
                        <p>${rule}</p>
                    </div>`,
                )
                .join("")}
            <div class="detail-button-container">
                <div class="detail-button">
                    <img src="../assets/icons/whatsapp-icon-white.svg" alt="">
                    <a href="">Reservasi Via Whatsapp</a>
                </div>
            </div>
        </div>
    </div>
                   
    `;
    if (footer) {
        if (room.phoneNumber) {
            footer.style.display = "block"; // atau 'flex'
            footer.innerHTML = `<p>${room.phoneNumber}</p>`;
        } else {
            footer.style.display = "none";
        }
    }
}

getRooms();

function initSwiper() {
    // 1. Swiper Thumbnail (Gambar kecil di bawah)
    const swiperThumbs = new Swiper(".swiper-thumbs", {
        spaceBetween: 10,
        slidesPerView: 4, // Jumlah thumbnail yang kelihatan
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            768: {
                slidesPerView: 5,
                spaceBetween: 12,
            },
        },
    });

    // 2. Swiper Utama (Gambar besar di atas)
    const swiperMain = new Swiper(".swiper-main", {
        loop: true,
        grabCursor: true,
        spaceBetween: 10,

        // Menghubungkan ke tombol panah kiri-kanan
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        // KUNCI: Menghubungkan slider utama dengan thumbnail!
        thumbs: {
            swiper: swiperThumbs,
        },

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
}

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
