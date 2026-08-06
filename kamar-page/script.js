const loading = document.getElementById("loading-screen");
const supabaseUrl = "https://bpqeuadxvtluiebvybgu.supabase.co";
const supabaseKey = "sb_publishable_wwmgUbkJM4YauF-CAyw_rg_98IJJ4K0";
const client = window.supabase.createClient(supabaseUrl, supabaseKey);

async function getRooms() {
    const { data, error } = await client.from("rooms").select("*");

    if (error) {
        console.error(error);
        return;
    }

    tampilkanRooms(data);
    setTimeout(() => {
        loading.classList.add("hide");

        setTimeout(() => {
            loading.remove();
        }, 400);
    }, 500);
}

function tampilkanRooms(rooms) {
    const listKamar = document.getElementById("list-kamar");
    const footer = document.getElementById("contact");
    let phoneNumberFound = null;

    listKamar.innerHTML = "";
    footer.innerHTML = "";

    rooms.forEach((room) => {
        listKamar.innerHTML += `
            <div class="kamar-produk" data-aos="fade-up" data-aos-duration="800" data-aos-easing="linear">

                <div class="kamar-produk-img">
                    <img src="${room.image}" alt="${room.name}" loading="lazy">
                </div>

                <div class="kamar-produk-deskripsi">

                    <h2>${room.name}</h2>

                    <p id="description">${room.description}</p>

                    <div class="kamar-produk-detail">

                        <div class="kapasitas-tamu">
                            <img src="../assets/icons/guest-icon.png" alt="Guest Icon" loading="lazy">
                            <p>${room.guest} Tamu</p>
                        </div>

                        <div class="jumlah-kasur">
                            <img src="../assets/icons/bed-icon.png" alt="Bed Icon" loading="lazy">
                            <p>${room.bed}</p>
                        </div>

                        <span class="status ${room.status.toLowerCase()}">
                            ${room.status}
                        </span>

                        <h3>
                            Rp ${room.price.toLocaleString("id-ID")} / malam
                        </h3>
                        <a href="../detail-kamar/index.html?id=${room.id}">
                            Lihat Detail
                        </a>

                    </div>

                </div>

            </div>
        `;
        if (room.phoneNumber && !phoneNumberFound) {
            phoneNumberFound = room.phoneNumber;
        }
    });
    // 2. Render Footer Sekali Saja (Di Luar Loop forEach)
    if (phoneNumberFound) {
        footer.style.display = "block"; // atau 'flex'
        footer.innerHTML = `<p>${phoneNumberFound}</p>`;
    } else {
        footer.style.display = "none";
    }
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
