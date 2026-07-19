const supabaseUrl = "https://wldmnkdjgyxpacbjlwfr.supabase.co";
const supabaseKey = "sb_publishable_Utwa-4_IPf7uGBAVA4M0uQ_5dX5fYvb";

const client = window.supabase.createClient(supabaseUrl, supabaseKey);

async function getRooms() {
    const { data, error } = await client
        .from("rooms")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    tampilkanRooms(data);
}

function tampilkanRooms(rooms) {
    const listKamar = document.getElementById("list-kamar");

    listKamar.innerHTML = "";

    rooms.forEach(room => {
        listKamar.innerHTML += `
            <div class="kamar-produk">

                <div class="kamar-produk-img">
                    <img src="../assets/img/${room.image}" alt="${room.name}">
                </div>

                <div class="kamar-produk-deskripsi">

                    <h2>${room.name}</h2>

                    <p>${room.description}</p>

                    <div class="kamar-produk-detail">

                        <div class="kapasitas-tamu">
                            <img src="../assets/icons/guest.png">
                            <p>${room.guest} Tamu</p>
                        </div>

                        <div class="jumlah-kasur">
                            <img src="../assets/icons/bed-icon.png">
                            <p>${room.bed}</p>
                        </div>

                        <p>Status : ${room.status}</p>

                        <h3>
                            Rp ${room.price.toLocaleString("id-ID")} / malam
                        </h3>

                        <a href="">
                            Lihat Detail
                        </a>

                    </div>

                </div>

            </div>
        `;
    });
}

getRooms();

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
