// ===============================
// EVENT DETAILS
// ===============================
const EVENT_TIME = "20:00";
const EVENT_TIME_LABEL = "8:00 PM";

// Event date: 30 September 2026
const eventDate = new Date(`2026-09-30T${EVENT_TIME}:00`);

document.getElementById("eventTimeText").textContent = EVENT_TIME_LABEL;
document.getElementById("timeCard").innerHTML = EVENT_TIME_LABEL;

function updateCountdown() {
  const now = new Date();
  const difference = eventDate - now;

  if (difference <= 0) {
    document.getElementById("countdown").innerHTML =
      '<p class="eyebrow" style="color:var(--gold)">THE NIGHT IS HERE ✧</p>';
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===============================
// GOOGLE SCRIPT URL FOR AHMED & HUDA
// ===============================
const GOOGLE_SCRIPT_URL = "PUT_YOUR_NEW_GOOGLE_SCRIPT_URL_HERE";

// ===============================
// RSVP SUBMISSION
// ===============================
document.getElementById("rsvpForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("rsvpMessage");

  if (!name || !attendance) {
    message.textContent = "Please complete all fields.";
    return false;
  }

  message.textContent = "Sending your RSVP...";

  try {
    const formData = new FormData();
    formData.append("type", "rsvp");
    formData.append("name", name);
    formData.append("attendance", attendance);
    formData.append("guests", guests);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    message.textContent =
      attendance === "yes"
        ? `Thank you, ${name}! We look forward to seeing you ✧`
        : `Thank you for letting us know, ${name}. ✧`;

    this.reset();
    document.getElementById("guests").value = 1;

  } catch (error) {
    console.error("RSVP Error:", error);
    message.textContent = "Something went wrong. Please try again.";
  }

  return false;
});

// ===============================
// WISHES SUBMISSION
// ===============================
document.getElementById("wishForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const name = document.getElementById("wishName").value.trim();
  const messageText = document.getElementById("wishMessage").value.trim();
  const statusMessage = document.getElementById("wishStatusMessage");

  if (!name || !messageText) {
    statusMessage.textContent = "Please fill in all fields.";
    return false;
  }

  statusMessage.textContent = "Sending your wish...";

  try {
    const formData = new FormData();
    formData.append("type", "wish");
    formData.append("name", name);
    formData.append("message", messageText);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    statusMessage.textContent = `Thank you, ${name}! Your wish has been sent ✧`;
    this.reset();

  } catch (error) {
    console.error("Wish Error:", error);
    statusMessage.textContent = "Something went wrong. Please try again.";
  }

  return false;
});
