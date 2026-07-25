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
}

function tampilkanRoom(room) {
    const detailKamar = document.getElementById("detail-kamar");

    const footer = document.getElementById("contact");

    footer.innerHTML = "";
    detailKamar.innerHTML =""

    detailKamar.innerHTML = `
        <div class="detail-img-container swiper">
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
            <div class="swiper-pagination"></div>
        </div>
        <div class="about">
            <h1>${room.name}</h1>
            <h2>Rp ${room.price.toLocaleString("id-ID")} <span>/malam</span></h2>
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
            <p>${room.description}</p>
        </div>
                    
        <div class="fasilitas">
            <h3>fasilitas</h3>
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
        <div class="description">
            <h4>Ketentuan / Aturan</h4>
            ${room.rules
                .map(
                    (rule) => `
                    <p>${rule}</p>`,
                )
                .join("")}
        </div>
        <div class="detail-button">
            <img src="../assets/icons/whatsapp-icon-white.svg" alt="">
            <a href="">Reservasi Via Whatsapp</a>
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
    new Swiper(".detail-img-container", {
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        grabCursor: true,
        spaceBetween: 10,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
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
