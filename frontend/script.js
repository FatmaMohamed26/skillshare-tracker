const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

// ضع هنا رابط السيرفر النهائي بعد رفعه على Render
const baseURL = "http://localhost:3000";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const skillHave = document.getElementById("skillHave").value.trim();
  const skillWant = document.getElementById("skillWant").value.trim();
  if (!name || !skillHave || !skillWant) return;

  await fetch(`${baseURL}/addUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, skillHave, skillWant })
  });

  form.reset();
  loadUsers();
});

async function loadUsers() {
  const res = await fetch(`${baseURL}/users`);
  const users = await res.json();

  userList.innerHTML = users.length ? users.map(u => `
    <div class="user">
      <b>${u.name}</b> يعرف: <i>${u.skillHave}</i><br>
      عايز يتعلم: <i>${u.skillWant}</i>
    </div>
  `).join('') : '<p>لا يوجد مشاركون بعد.</p>';
}

loadUsers();
