(function () {
  const D = window.PORTFOLIO || { profile: {}, works: [] };
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const has = (v) => v !== undefined && v !== null && String(v).trim() !== "";

  /* ---------- 인물 정보 ---------- */
  function renderProfile() {
    const p = D.profile || {};
    const photo = has(p.photo)
      ? `<div class="photo has-img"><img src="${esc(p.photo)}" alt=""></div>`
      : `<div class="photo">사진</div>`;

    const boxes = (p.boxes || []).map((b) => {
      let inner = "";
      if (b.rows && b.rows.length) {
        inner = b.rows.map((r) => {
          const v = has(r.href) ? `<a href="${esc(r.href)}" target="_blank" rel="noopener">${esc(r.v)}</a>` : esc(r.v);
          return `<div class="fact-row"><span class="k">${esc(r.k)}</span><span class="v">${v}</span></div>`;
        }).join("");
      }
      if (b.skills && b.skills.length) {
        inner += `<div class="skill-list">${b.skills.map((s) => `<span class="chip static">${esc(s)}</span>`).join("")}</div>`;
      }
      return `<div class="fact-box"><h3>${esc(b.title)}</h3>${inner}</div>`;
    }).join("");

    $("#profile").innerHTML = `
      ${photo}
      <div>
        <h1 class="name">${esc(p.name)}</h1>
        ${has(p.role) ? `<p class="role">${esc(p.role)}</p>` : ""}
        ${has(p.headline) ? `<p class="headline">${esc(p.headline)}</p>` : ""}
        ${has(p.intro) ? `<p class="intro">${esc(p.intro)}</p>` : ""}
        ${boxes ? `<div class="facts">${boxes}</div>` : ""}
      </div>`;
    if (has(p.name)) document.title = `${p.name} — Portfolio`;
    $("#foot").textContent = D.footer || "";
  }

  /* ---------- 태그 우선 정렬 ---------- */
  // 기본 순서: 만든 순서 번호(no)가 큰 것부터 → 없으면 파일에 적힌 순서
  const works = (D.works || []).map((w, i) => ({ ...w, tags: w.tags || [], _src: i }))
    .sort((a, b) => (b.no ?? -Infinity) - (a.no ?? -Infinity) || a._src - b._src)
    .map((w, i) => ({ ...w, _i: i }));
  let order = []; // 누른 순서 = 우선순위

  // 등장 횟수순 태그 목록
  const tagCount = {};
  works.forEach((w) => w.tags.forEach((t) => (tagCount[t] = (tagCount[t] || 0) + 1)));
  const allTags = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a] || a.localeCompare(b, "ko"));

  // 해시로 상태 보존: #tags=전투,밸런스
  function readHash() {
    const m = location.hash.match(/tags=([^&]*)/);
    if (m) order = decodeURIComponent(m[1]).split(",").filter((t) => tagCount[t]);
  }
  function writeHash() {
    const h = order.length ? `#tags=${encodeURIComponent(order.join(","))}` : "#works";
    history.replaceState(null, "", h);
  }

  function toggle(t) {
    const k = order.indexOf(t);
    if (k >= 0) order.splice(k, 1); else order.push(t);
    writeHash();
    renderWorks();
  }

  // 앞 순위 태그를 가진 작업이 먼저 → 같으면 맞춘 개수 → 같으면 원래 순서
  function sorted() {
    if (!order.length) return works.slice();
    const key = (w) => order.map((t) => (w.tags.includes(t) ? 1 : 0));
    return works.slice().sort((a, b) => {
      const ka = key(a), kb = key(b);
      for (let i = 0; i < ka.length; i++) if (ka[i] !== kb[i]) return kb[i] - ka[i];
      const sa = ka.reduce((x, y) => x + y, 0), sb = kb.reduce((x, y) => x + y, 0);
      return sb - sa || a._i - b._i;
    });
  }

  function renderTags() {
    $("#tag-list").innerHTML = allTags.map((t) =>
      `<button type="button" class="chip${order.includes(t) ? " on" : ""}" data-tag="${esc(t)}">${esc(t)}<span class="n">${tagCount[t]}</span></button>`
    ).join("");
    $("#tag-order").innerHTML = order.length
      ? order.map((t, i) => `${i ? '<span class="arrow">→</span>' : ""}<button type="button" class="chip on" data-tag="${esc(t)}">${esc(t)} ×</button>`).join("")
      : `<span class="empty">태그 선택 시 해당 작업 우선</span>`;
    $("#tag-clear").style.visibility = order.length ? "visible" : "hidden";
  }

  function renderWorks() {
    renderTags();
    const list = sorted();
    $("#work-grid").innerHTML = list.map((w) => {
      const hit = order.length && w.tags.some((t) => order.includes(t));
      const dim = order.length && !hit;
      const thumb = has(w.thumb)
        ? `<div class="thumb"><img src="${esc(w.thumb)}" alt="${esc(w.title)} 대표 페이지" loading="lazy"></div>`
        : `<div class="thumb empty">썸네일</div>`;
      const links = (w.links || []).filter((l) => has(l.label)).map((l) =>
        has(l.href) ? `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>` : `<span style="color:var(--chrome)">${esc(l.label)}</span>`
      ).join("");
      const open = has(w.pdf)
        ? `<a class="open-hint" href="${esc(w.pdf)}" target="_blank" rel="noopener"><span>PDF 보기<span class="go"> →</span></span>${has(w.pages) ? `<span class="n">${esc(w.pages)}</span>` : ""}</a>`
        : "";
      return `
        <article class="work${dim ? " dim" : ""}${has(w.pdf) ? " clickable" : ""}" data-pdf="${esc(w.pdf || "")}">
          ${thumb}
          <div class="body">
            <div class="meta">${w.no != null ? `<span class="no"><span class="k">제작 순서</span> ${esc(w.no)}</span>` : ""}${["game","period","type"].filter((k) => has(w[k])).map((k) => `<span>${esc(w[k])}</span>`).join("")}${has(w.status) ? `<span class="status">${esc(w.status)}</span>` : ""}</div>
            <h3>${esc(w.title)}</h3>
            ${has(w.summary) ? `<p class="summary">${esc(w.summary)}</p>` : ""}
            ${(w.points || []).length ? `<ul class="points">${w.points.map((q) => `<li>${esc(q)}</li>`).join("")}</ul>` : ""}
            <div class="tags">${w.tags.map((t) => `<button type="button" class="chip${order.includes(t) ? " hit" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`).join("")}</div>
            ${links ? `<div class="links">${links}</div>` : ""}
            ${open}
          </div>
        </article>`;
    }).join("");
    const n = order.length ? list.filter((w) => w.tags.some((t) => order.includes(t))).length : list.length;
    $("#work-count").textContent = order.length ? `${n} / ${list.length}` : `${list.length}`;
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tag]");
    if (b) { toggle(b.dataset.tag); return; }
    if (e.target.closest("a")) return; // 링크는 기본 동작
    const card = e.target.closest(".work.clickable");
    if (card) window.open(card.dataset.pdf, "_blank", "noopener"); // 카드 아무 곳 = PDF 새 탭
  });
  $("#tag-clear").addEventListener("click", () => { order = []; writeHash(); renderWorks(); });

  readHash();
  renderProfile();
  renderWorks();
})();
