const baseUrl = "/jokebook";

async function loadCategories() {
  const res = await fetch(`${baseUrl}/categories`);
  const categories = await res.json();

  const html = `
    <h2>Categories</h2>
    <ul>
      ${categories.map(c => `<li>${c}</li>`).join("")}
    </ul>
  `;
  document.getElementById("output").innerHTML = html;
}

async function loadRandomJoke() {
  const res = await fetch(`${baseUrl}/random`);
  const joke = await res.json();

  document.getElementById("output").innerHTML = `
    <h2>Random Joke</h2>
    <p><strong>${joke.setup}</strong><br>${joke.delivery}</p>
  `;
}

async function promptCategory() {
  const category = prompt("Enter a category name:");
  if (!category) return;

  const res = await fetch(`${baseUrl}/category/${category}`);
  const data = await res.json();

  if (data.error) {
    document.getElementById("output").innerHTML = `<p style="color:red">${data.error}</p>`;
  } else {
    const html = `
      <h2>${category} Jokes</h2>
      ${data.map(j => `<p><strong>${j.setup}</strong><br>${j.delivery}</p>`).join("")}
    `;
    document.getElementById("output").innerHTML = html;
  }
}

async function addJoke() {
  const category = prompt("Enter category:");
  const setup = prompt("Enter setup:");
  const delivery = prompt("Enter delivery:");

  if (!category || !setup || !delivery) {
    alert("All fields are required.");
    return;
  }

  const res = await fetch(`${baseUrl}/joke/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category, setup, delivery }),
  });

  const data = await res.json();

  if (data.error) {
    document.getElementById("output").innerHTML = `<p style="color:red">${data.error}</p>`;
  } else {
    const html = `
      <h2>${category} (Updated)</h2>
      ${data.map(j => `<p><strong>${j.setup}</strong><br>${j.delivery}</p>`).join("")}
    `;
    document.getElementById("output").innerHTML = html;
  }
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-categories").addEventListener("click", loadCategories);
  document.getElementById("btn-random").addEventListener("click", loadRandomJoke);
  document.getElementById("btn-category").addEventListener("click", promptCategory);
  document.getElementById("btn-add").addEventListener("click", addJoke);
});
