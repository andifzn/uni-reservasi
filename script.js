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
    console.log(document.querySelectorAll(".swiper-slide").length);
    initSwiper();
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
                        <img src="../assets/icons/guest-icon.png">
                        <p>${room.guest} Tamu</p>
                    </div>
                    <div class="kamar-produk-detail-icon">
                        <img src="../assets/icons/bed-icon.png">
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

function initSwiper() {
    new Swiper(".kamar-produk-container", {
        slidesPerView: 1.1,
        spaceBetween: 16,
        grabCursor: true,
        centeredSlides: true,
        initialSlide: 1,
        loop: true,

        breakpoints: {
            450: {
                slidesPerView: 1.5,
                spaceBetween: 16,
            },
            575: {
                slidesPerView: 2.2,
            },
            580: {
                slidesPerView: 2.4,
            },
            620: {
                slidesPerView: 2.2,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 3.3,
                spaceBetween: 50,
            },
        },
    });
}