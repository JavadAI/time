document.addEventListener("DOMContentLoaded", function () {
    startLiveTime();
    updatePrayerTimes();
    loadTheme();
});

function startLiveTime() {
    setInterval(() => {
        const now = new Date();
        document.getElementById("live-time").innerText = `ساعت زنده: ${now.toLocaleTimeString("fa-IR")}`;
    }, 1000);
}

async function updatePrayerTimes() {
    const province = document.getElementById("province-select").value;
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${province}&country=IR&method=8`);
    const data = await response.json();

    if (data.code === 200) {
        const timings = data.data.timings;
        document.getElementById("fajr-time").innerText = timings.Fajr;
        document.getElementById("sunrise-time").innerText = timings.Sunrise;
        document.getElementById("dhuhr-time").innerText = timings.Dhuhr;
        document.getElementById("maghrib-time").innerText = timings.Maghrib;
        document.getElementById("isha-time").innerText = timings.Isha;
    } else {
        alert("خطا در دریافت اطلاعات!");
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme + "-theme");
}
