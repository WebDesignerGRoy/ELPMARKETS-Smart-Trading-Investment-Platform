// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Live ticker: subtle price drift
const rows = document.querySelectorAll("#ticker .ticker__list li");
const state = [
  { base: 2384.10, decimals: 2 },
  { base: 1.0921, decimals: 4 },
  { base: 68940, decimals: 0 },
  { base: 5412.6, decimals: 1 },
];

function fmt(n, d) {
  return n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

setInterval(() => {
  rows.forEach((row, i) => {
    const s = state[i];
    const drift = (Math.random() - 0.5) * (s.base * 0.001);
    s.base = Math.max(0.0001, s.base + drift);
    const pct = ((Math.random() - 0.45) * 2).toFixed(2);
    const up = parseFloat(pct) >= 0;
    row.querySelector(".px").textContent = fmt(s.base, s.decimals);
    const chg = row.querySelector(".chg");
    chg.textContent = (up ? "+" : "") + pct + "%";
    chg.classList.toggle("up", up);
    chg.classList.toggle("down", !up);
  });
}, 2000);
