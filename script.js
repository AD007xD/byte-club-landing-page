// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bootstrapForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Validate SASTRA email
    const emailInput = document.getElementById("376013449");
    if (
      emailInput &&
      !emailInput.value.toLowerCase().endsWith("@sastra.ac.in")
    ) {
      alert("Please enter a valid SASTRA email address ending with @sastra.ac.in");
      return;
    }

    // Build URL-encoded body exactly as Google expects
    const body = new URLSearchParams(new FormData(form));

    try {
      const r = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });

      if (r.ok) {
        window.location.href = "/thankyou.html";

      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (e) {
      alert("Network error. Please try again.");
    }
  });
});
