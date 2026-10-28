/* ==========================================================================
   Digital Laboratory
   All rendering and interaction logic.
   Every value shown here is read from assets/js/data.js.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     0. SHORT HELPERS
     --------------------------------------------------------------------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const PREVIEW_SECONDS = 15; // length of the hover preview clip

  function plural(n, one, many) {
    return n + " " + (n === 1 ? one : many || one + "s");
  }

  function initialsOf(name) {
    const parts = String(name || "")
      .replace(/[^A-Za-z\s.]/g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function highlightMatch(text, query) {
    const safe = esc(text);
    if (!query) return safe;
    const needle = query.trim();
    if (!needle) return safe;
    const rx = new RegExp("(" + needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
    return safe.replace(rx, "<mark>$1</mark>");
  }

  let toastTimer = null;
  function toast(message) {
    const node = $("#toast");
    if (!node) return;
    node.textContent = message;
    node.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      node.classList.remove("is-show");
    }, 2200);
  }

  const ICON = {
    play: '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor"/></svg>',
    stop: '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><rect x="6.5" y="6.5" width="11" height="11" rx="2" fill="currentColor"/></svg>',
    info: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
    link: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M10 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.3 1.3"/><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.3-1.3"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M13.2 5.4 11.8 6.8l4.2 4.2H4v2h12l-4.2 4.2 1.4 1.4L19.8 12 13.2 5.4Z" fill="currentColor"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M10.8 18.6 12.2 17.2 8 13h16v-2H8l4.2-4.2-1.4-1.4L4.2 12l6.6 6.6Z" fill="currentColor"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    sound: '<svg class="on" viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.2-3.9v7.8A4.5 4.5 0 0 0 16.5 12Zm-2.2-8.3v2.1a7 7 0 0 1 0 12.4v2.1a9 9 0 0 0 0-16.6Z"/></svg>',
    soundOff: '<svg class="off" viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm17.3 1.3-1.4-1.4-2.3 2.3-2.3-2.3-1.4 1.4 2.3 2.3-2.3 2.3 1.4 1.4 2.3-2.3 2.3 2.3 1.4-1.4-2.3-2.3 2.3-2.3Z"/></svg>',
    video: '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="5.5" width="13" height="13" rx="2.5"/><path d="m16 10.5 5.5-3.2v9.4L16 13.5v-3Z"/></svg>',
    person: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.4-3.8 4-5.7 7.5-5.7s6.1 1.9 7.5 5.7"/></svg>',
    pencil: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6.5A3.5 3.5 0 0 0 3 6.5v6A2.5 2.5 0 0 0 5.5 15"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4.5 4.5L19 7"/></svg>',
    download: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2c-.2-1.5-.9-2.3-2.4-2.5C17.2 4.4 14.8 4.4 12 4.4s-5.2 0-7.2.3c-1.5.2-2.2 1-2.4 2.5C2.2 9.2 2.2 10.4 2.2 12s0 2.8.2 4.8c.2 1.5.9 2.3 2.4 2.5 2 .3 4.4.3 7.2.3s5.2 0 7.2-.3c1.5-.2 2.2-1 2.4-2.5.2-2 .2-3.2.2-4.8s0-2.8-.2-4.8ZM10.1 14.9V9.1l5.1 2.9-5.1 2.9Z"/></svg>',
    github: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>',
    external: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h5"/></svg>',
    doc: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a1.8 1.8 0 0 0-1.8 1.8v14.4A1.8 1.8 0 0 0 7 21h10a1.8 1.8 0 0 0 1.8-1.8V7.8L14 3Z"/><path d="M13.8 3v5h5M8.6 12.6h6.8M8.6 16.4h4.8"/></svg>'
  };

  /* ---------------------------------------------------------------------
     1. PYTHON SYNTAX HIGHLIGHTER  (offline, no external library)
     --------------------------------------------------------------------- */
  const PYTHON_RULES = new RegExp(
    [
      "(?<com>#[^\\n]*)",
      "(?<tri>\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?''')",
      "(?<str>[fFrRbB]{0,2}\"(?:\\\\.|[^\"\\\\])*\"|[fFrRbB]{0,2}'(?:\\\\.|[^'\\\\])*')",
      "(?<dec>@[A-Za-z_][\\w.]*)",
      "(?<mag>![A-Za-z_]\\w*)",
      "(?<num>\\b0[xXbBoO][0-9a-fA-F_]+\\b|\\b\\d[\\d_]*\\.?[\\d_]*(?:[eE][+-]?\\d+)?\\b)",
      "(?<kw>\\b(?:and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|lambda|match|None|nonlocal|not|or|pass|raise|return|True|try|while|with|yield)\\b)",
      "(?<bi>\\b(?:abs|all|any|bool|dict|enumerate|filter|float|format|frozenset|getattr|hasattr|input|int|isinstance|iter|len|list|map|max|min|next|open|print|range|repr|reversed|round|set|setattr|sorted|str|sum|tuple|type|zip|json|os|re|sys|requests|sqlite3|pd|np|plt|sns|requests|conn|cursor|fig|ax|db|df|text|ax0|ax1)\\b)",
      "(?<fn>\\b[A-Za-z_]\\w*(?=\\s*\\())",
      "(?<id>\\b[A-Za-z_]\\w*\\b)",
      "(?<pun>[{}()\\[\\].,:;=+\\-*/%<>!&|^~$?]+)"
    ].join("|"),
    "gm"
  );

  const TOKEN_CLASS = {
    com: "tok-com", tri: "tok-tri", str: "tok-str", dec: "tok-dec",
    mag: "tok-mag", num: "tok-num", kw: "tok-kw", bi: "tok-bi",
    fn: "tok-fn", id: "tok-id", pun: "tok-pun"
  };

  function highlightPython(code) {
    const source = String(code == null ? "" : code);
    let out = "";
    let cursor = 0;
    let match;

    PYTHON_RULES.lastIndex = 0;
    while ((match = PYTHON_RULES.exec(source)) !== null) {
      if (match[0] === "") { PYTHON_RULES.lastIndex++; continue; }
      if (match.index > cursor) {
        out += esc(source.slice(cursor, match.index));
      }
      const kind = Object.keys(match.groups).find(function (k) {
        return match.groups[k] !== undefined;
      });
      out += '<span class="' + (TOKEN_CLASS[kind] || "tok-id") + '">' + esc(match[0]) + "</span>";
      cursor = match.index + match[0].length;
    }
    if (cursor < source.length) out += esc(source.slice(cursor));
    return out;
  }

  /* ---------------------------------------------------------------------
     1b. STUDENT CARD EDITOR  (edit form + localStorage persistence)
     --------------------------------------------------------------------- */
  const CARD_STORE_KEY = "dslab.student-card.v1";
  const CARD_DEFAULTS = {
    student: JSON.parse(JSON.stringify(student)),
    labMeta: {
      subjectCode: labMeta.subjectCode,
      academicYear: labMeta.academicYear,
      department: labMeta.department
    }
  };

  /* Every editable field of the card, in form order. `group` says which
     data.js object owns the value; `req` / `min` / `max` / `rx` drive
     validation. These are the only keys that are ever written to storage. */
  const CARD_FIELDS = [
    { key: "name", label: "Student Name", group: "student", req: true, min: 2, max: 80 },
    { key: "idNumber", label: "Student ID / Roll Number", group: "student", req: true, max: 32,
      rx: /^[A-Za-z0-9][A-Za-z0-9\-/. ]*$/, rxMsg: "Use letters, numbers and - / . only." },
    { key: "section", label: "Section", group: "student", req: true, max: 40 },
    { key: "department", label: "Branch / Course", group: "labMeta", req: true, max: 100 },
    { key: "subjectCode", label: "Subject Code", group: "labMeta", req: true, max: 40,
      rx: /^[A-Za-z0-9][A-Za-z0-9\-/. ]*$/, rxMsg: "Use letters, numbers and - / . only." },
    { key: "academicYear", label: "Academic Year", group: "labMeta", req: true, max: 30,
      rx: /^\d{4}\s*[-\u2013\u2014/]\s*\d{2,4}$/, rxMsg: "Use a range like 2025 - 2026." },
    { key: "faculty", label: "Faculty", group: "student", req: true, max: 80 },
    { key: "profession", label: "Profession", group: "student", req: true, max: 80 },
    { key: "photo", label: "Photo path / URL", group: "student", req: false, max: 300,
      rx: /^(?:https?:\/\/|assets\/|\.?\.?\/)[^\s]+\.(?:png|jpe?g|webp|gif|avif)$/i,
      rxMsg: "Use an image path or URL ending in .jpg, .png, .webp or .gif.",
      hint: "Optional. Leave empty for the initials placeholder, for example assets/img/student-photo.jpg" }
  ];

  /* ---- storage ---- */
  function readCardStore() {
    try {
      const raw = localStorage.getItem(CARD_STORE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return data && typeof data === "object" ? data : null;
    } catch (e) {
      return null;
    }
  }

  function applyCardData(data) {
    if (!data) return;
    CARD_FIELDS.forEach(function (f) {
      const src = f.group === "student" ? data.student : data.labMeta;
      if (src && typeof src[f.key] === "string") {
        if (f.group === "student") student[f.key] = src[f.key];
        else labMeta[f.key] = src[f.key];
      }
    });
  }

  function restoreStudentCard() {
    applyCardData(readCardStore());
  }

  function writeCardStore() {
    const data = { v: 1, student: {}, labMeta: {} };
    CARD_FIELDS.forEach(function (f) {
      if (f.group === "student") data.student[f.key] = student[f.key];
      else data.labMeta[f.key] = labMeta[f.key];
    });
    try {
      localStorage.setItem(CARD_STORE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearCardStore() {
    try { localStorage.removeItem(CARD_STORE_KEY); } catch (e) { /* ignore */ }
  }

  /* ---- re-render only what the model change affects ---- */
  function refreshStudentCardUI() {
    const card = document.getElementById("studentCard");
    if (card) {
      const holder = document.createElement("div");
      holder.innerHTML = studentCardHtml();
      const fresh = holder.firstElementChild;
      if (fresh && card.parentNode) card.parentNode.replaceChild(fresh, card);
    }
    const codeNode = $(".univ-card__code b");
    if (codeNode) codeNode.textContent = labMeta.subjectCode;
    paintBranding();
  }

  /* ---- modal ---- */
  let cardModal = null;
  let cardModalTrigger = null;

  function cardFieldHtml(f) {
    const id = "cf-" + f.key;
    return (
      '<div class="fld">' +
        '<label class="fld__label" for="' + id + '">' + esc(f.label) +
          (f.req ? ' <span class="fld__req" aria-hidden="true">*</span>' : "") +
        "</label>" +
        '<input class="fld__input" id="' + id + '" name="' + f.key + '" type="text"' +
          ' maxlength="' + f.max + '" autocomplete="off" spellcheck="false"' +
          ' aria-describedby="' + id + '-err">' +
        (f.hint ? '<p class="fld__hint">' + esc(f.hint) + "</p>" : "") +
        '<p class="fld__err" id="' + id + '-err" role="alert"></p>' +
      "</div>"
    );
  }

  function ensureCardModal() {
    if (cardModal) return cardModal;
    const wrap = document.createElement("div");
    wrap.className = "cm";
    wrap.id = "cardModal";
    wrap.hidden = true;
    wrap.innerHTML =
      '<div class="cm__backdrop" data-cm-close></div>' +
      '<div class="cm__panel" role="dialog" aria-modal="true" aria-labelledby="cmTitle">' +
        '<div class="cm__head">' +
          "<div>" +
            '<h3 class="cm__title" id="cmTitle">Edit Student Card</h3>' +
            '<p class="cm__sub">Saved in this browser, so the changes stay after you close the site.</p>' +
          "</div>" +
          '<button class="cm__x" type="button" aria-label="Close" data-cm-close>' + ICON.close + "</button>" +
        "</div>" +
        '<form class="cm__form" id="cardEditForm" novalidate>' +
          '<div class="cm__grid">' + CARD_FIELDS.map(cardFieldHtml).join("") + "</div>" +
          '<div class="cm__actions">' +
            '<button class="btn btn--sm btn--ghost cm__reset" id="cardResetBtn" type="button">Reset / Restore Default</button>' +
            '<span class="cm__gap"></span>' +
            '<button class="btn btn--sm" type="button" data-cm-close>Cancel</button>' +
            '<button class="btn btn--sm btn--primary" type="submit">Save</button>' +
          "</div>" +
        "</form>" +
      "</div>";
    document.body.appendChild(wrap);
    cardModal = wrap;

    wrap.addEventListener("click", function (event) {
      if (event.target.closest("[data-cm-close]")) closeCardEditor();
    });
    $("#cardEditForm", wrap).addEventListener("submit", function (event) {
      event.preventDefault();
      saveCardEditor();
    });
    $("#cardResetBtn", wrap).addEventListener("click", resetStudentCard);
    wrap.addEventListener("input", function (event) {
      if (event.target.classList && event.target.classList.contains("fld__input")) {
        clearFieldError(event.target);
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && cardModal && !cardModal.hidden) closeCardEditor();
    });
    return wrap;
  }

  function fillCardForm() {
    CARD_FIELDS.forEach(function (f) {
      const input = $("#cf-" + f.key, cardModal);
      if (!input) return;
      input.value = String((f.group === "student" ? student[f.key] : labMeta[f.key]) || "");
      clearFieldError(input);
    });
  }

  function showFieldError(input, message) {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    const err = document.getElementById(input.id + "-err");
    if (err) err.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    const err = document.getElementById(input.id + "-err");
    if (err) err.textContent = "";
  }

  function fieldError(f, raw) {
    const value = String(raw == null ? "" : raw).trim();
    if (f.req && !value) return f.label + " is required.";
    if (!value) return "";
    if (f.min && value.length < f.min) return f.label + " must be at least " + f.min + " characters.";
    if (f.max && value.length > f.max) return f.label + " must be " + f.max + " characters or fewer.";
    if (f.rx && !f.rx.test(value)) return f.rxMsg || (f.label + " is not valid.");
    return "";
  }

  function saveCardEditor() {
    const values = {};
    let firstBad = null;
    CARD_FIELDS.forEach(function (f) {
      const input = $("#cf-" + f.key, cardModal);
      if (!input) return;
      const value = input.value.trim();
      const message = fieldError(f, value);
      if (message) {
        showFieldError(input, message);
        if (!firstBad) firstBad = input;
      } else {
        clearFieldError(input);
      }
      values[f.key] = value;
    });
    if (firstBad) {
      firstBad.focus();
      firstBad.scrollIntoView({ block: "nearest" });
      return;
    }

    CARD_FIELDS.forEach(function (f) {
      if (f.group === "student") student[f.key] = values[f.key];
      else labMeta[f.key] = values[f.key];
    });
    const stored = writeCardStore();
    refreshStudentCardUI();
    closeCardEditor();
    toast(stored ? "Student card updated" : "Card updated - browser storage is unavailable, changes last for this session only");
  }

  function resetStudentCard() {
    CARD_FIELDS.forEach(function (f) {
      if (f.group === "student") student[f.key] = CARD_DEFAULTS.student[f.key];
      else labMeta[f.key] = CARD_DEFAULTS.labMeta[f.key];
    });
    clearCardStore();
    fillCardForm();
    refreshStudentCardUI();
    toast("Student card restored to the default details");
  }

  function openCardEditor(trigger) {
    ensureCardModal();
    cardModalTrigger = trigger || document.activeElement;
    fillCardForm();
    cardModal.hidden = false;
    document.body.classList.add("cm-open");
    const first = $("#cf-name", cardModal);
    if (first) first.focus();
  }

  function closeCardEditor() {
    if (!cardModal || cardModal.hidden) return;
    cardModal.hidden = true;
    document.body.classList.remove("cm-open");
    const fresh = document.getElementById("editCardBtn");
    if (fresh) fresh.focus();
    else if (cardModalTrigger && document.contains(cardModalTrigger)) cardModalTrigger.focus();
    cardModalTrigger = null;
  }

  /* ---------------------------------------------------------------------
     1c. USER-CREATED CONTENT
     ---------------------------------------------------------------------
     Experiments, Tools and Projects created through the in-app forms are
     kept in localStorage and merged with the arrays from data.js at boot.
     Only user-created items carry custom: true, so the entries that ship
     with the site can never be edited or deleted from the UI.
     --------------------------------------------------------------------- */
  const CONTENT_STORES = {
    experiments: "dslab.experiments.custom.v1",
    tools: "dslab.tools.custom.v1",
    projects: "dslab.projects.custom.v1"
  };

  const URL_RX = /^https?:\/\/[^\s]+$/i;

  function contentList(kind) {
    if (kind === "experiments") return window.experiments || (window.experiments = []);
    if (kind === "tools") return window.tools || (window.tools = []);
    return window.projects || (window.projects = []);
  }

  function readContentStore(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.filter(function (x) { return x && typeof x === "object"; })
        : [];
    } catch (e) {
      return [];
    }
  }

  function writeContentStore(key, list) {
    try {
      localStorage.setItem(key, JSON.stringify(list));
      return true;
    } catch (e) {
      return false;
    }
  }

  function customItems(kind) {
    return contentList(kind).filter(function (item) { return item && item.custom === true; });
  }

  function makeUid(prefix) {
    return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
  }

  function todayIso() {
    const d = new Date();
    const pad = function (n) { return String(n).padStart(2, "0"); };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function splitList(value) {
    return String(value == null ? "" : value)
      .split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
  }

  function splitLines(value) {
    return String(value == null ? "" : value)
      .split(/\r?\n/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
  }

  /* Backfill fields added after a record was first saved, so editing an
     older saved experiment does not wipe its procedure notes. */
  function migrateExperiment(item) {
    if (!item || typeof item !== "object") return item;
    if (!item.procedure && Array.isArray(item.sections)) {
      const proc = item.sections.filter(function (s) {
        return s && s.notes && String(s.title || "").toLowerCase() === "procedure";
      })[0];
      if (proc) item.procedure = proc.notes;
    }
    return item;
  }

  /* Merge every saved item into the arrays the renderers already read. */
  function loadContent() {
    ["experiments", "tools", "projects"].forEach(function (kind) {
      const list = contentList(kind);
      readContentStore(CONTENT_STORES[kind]).forEach(function (item) {
        if (kind === "experiments") migrateExperiment(item);
        const clash = kind === "experiments"
          ? list.some(function (x) { return String(x.id) === String(item.id); })
          : list.some(function (x) { return x.uid && x.uid === item.uid; });
        if (!clash) list.push(item);
      });
    });
  }

  /* ---- form field definitions -----------------------------------------
     type: text | textarea | url | date | select
     `section` groups the fields under a heading in the modal.
     `from` maps a field to a differently-named stored property.
     `join` separates array values when editing (tags, reference links). */
  const EXPERIMENT_FIELDS = [
    { key: "name", label: "Experiment Name", type: "text", req: true, min: 3, max: 120, section: "General Information" },
    { key: "code", label: "Experiment ID / Code", type: "text", max: 32, section: "General Information",
      rx: /^[A-Za-z0-9][A-Za-z0-9\-_ /. ]*$/, rxMsg: "Use letters, numbers and - _ / . only.",
      hint: "Optional unique identifier, for example EXP-08." },
    { key: "tagline", label: "Short Description", type: "text", req: true, max: 200, section: "General Information",
      placeholder: "One line summarising the experiment." },
    { key: "summary", label: "Detailed Description", type: "textarea", rows: 4, max: 4000, section: "General Information" },
    { key: "category", label: "Category / Subject", type: "text", max: 80, section: "General Information" },
    { key: "status", label: "Status", type: "select", req: true, section: "General Information",
      options: ["Not Started", "In Progress", "Completed"] },
    { key: "created", label: "Created Date", type: "date", req: true, section: "General Information" },
    { key: "tags", label: "Tags", type: "text", max: 160, section: "General Information",
      hint: "Comma separated, for example pandas, csv, io." },

    { key: "language", label: "Programming Language", type: "text", max: 60, section: "Technical Details" },
    { key: "technologies", label: "Technologies / Libraries Used", type: "text", max: 200, section: "Technical Details",
      hint: "Comma separated." },
    { key: "dataset", label: "Dataset Name", type: "text", max: 120, section: "Technical Details" },
    { key: "datasetSource", label: "Dataset Source / URL", type: "url", max: 300, section: "Technical Details" },
    { key: "notebook", label: "Notebook File or URL", type: "text", max: 300, section: "Technical Details" },

    { key: "objective", label: "Objective", type: "textarea", rows: 3, max: 1500, section: "Implementation" },
    { key: "procedure", label: "Procedure / Implementation Steps", type: "textarea", rows: 5, max: 6000, section: "Implementation" },
    { key: "input", label: "Input Details", type: "textarea", rows: 3, max: 1500, section: "Implementation" },

    { key: "expected", label: "Expected Output", type: "textarea", rows: 3, max: 1500, section: "Results & Outcomes" },
    { key: "actual", label: "Actual Output", type: "textarea", rows: 3, max: 1500, section: "Results & Outcomes" },
    { key: "results", label: "Results / Observations", type: "textarea", rows: 3, max: 2000, section: "Results & Outcomes" },

    { key: "github", label: "GitHub Repository URL", type: "url", max: 300, section: "Links & References", from: "githubLink" },
    { key: "references", label: "Reference Links", type: "textarea", rows: 3, max: 1500, section: "Links & References",
      join: "\n", hint: "One URL per line." }
  ];

  const TOOL_FIELDS = [
    { key: "name", label: "Tool Name", type: "text", req: true, min: 2, max: 100, section: "General Information" },
    { key: "desc", label: "Short Description", type: "text", req: true, max: 200, section: "General Information" },
    { key: "details", label: "Detailed Description", type: "textarea", rows: 4, max: 4000, section: "General Information" },
    { key: "category", label: "Tool Category", type: "text", max: 80, section: "General Information" },
    { key: "type", label: "Tool Type", type: "text", max: 80, section: "General Information",
      hint: "For example Library, Language, Database, IDE." },
    { key: "status", label: "Tool Status", type: "select", req: true, section: "General Information",
      options: ["Active", "Inactive"] },
    { key: "created", label: "Created Date", type: "date", req: true, section: "General Information" },
    { key: "tags", label: "Tags", type: "text", max: 160, section: "General Information", hint: "Comma separated." },

    { key: "language", label: "Programming Language", type: "text", max: 60, section: "Technical Details" },
    { key: "platforms", label: "Supported Platforms", type: "text", max: 160, section: "Technical Details",
      hint: "For example Windows, macOS, Linux, Web." },
    { key: "related", label: "Related Technologies / Libraries", type: "text", max: 200, section: "Technical Details" },
    { key: "install", label: "Installation Instructions", type: "textarea", rows: 3, max: 2000, section: "Technical Details" },
    { key: "usage", label: "Usage Instructions", type: "textarea", rows: 3, max: 2000, section: "Technical Details" },

    { key: "website", label: "Website URL", type: "url", max: 300, section: "Links" },
    { key: "docs", label: "Documentation URL", type: "url", max: 300, section: "Links" },
    { key: "github", label: "GitHub Repository URL", type: "url", max: 300, section: "Links" }
  ];

  const PROJECT_FIELDS = [
    { key: "title", label: "Project Name", type: "text", req: true, min: 3, max: 140, section: "General Information" },
    { key: "desc", label: "Short Description", type: "text", req: true, max: 220, section: "General Information" },
    { key: "details", label: "Detailed Description", type: "textarea", rows: 4, max: 5000, section: "General Information" },
    { key: "category", label: "Project Category", type: "text", max: 80, section: "General Information" },
    { key: "type", label: "Project Type", type: "text", max: 80, section: "General Information" },
    { key: "status", label: "Project Status", type: "select", req: true, section: "General Information",
      options: ["Planning", "In Progress", "Completed", "On Hold"] },
    { key: "visibility", label: "Project Visibility", type: "select", section: "General Information",
      options: ["Public", "Private", "Unlisted"] },
    { key: "start", label: "Project Start Date", type: "date", section: "General Information" },
    { key: "end", label: "Project End Date", type: "date", section: "General Information" },
    { key: "tags", label: "Tags", type: "text", max: 160, section: "General Information", hint: "Comma separated." },

    { key: "languages", label: "Programming Languages", type: "text", max: 160, section: "Technical Details" },
    { key: "tech", label: "Technologies & Frameworks", type: "text", max: 220, section: "Technical Details" },
    { key: "team", label: "Team Members", type: "text", max: 200, section: "Technical Details", hint: "Comma separated." },
    { key: "image", label: "Project Image / Thumbnail URL", type: "url", max: 300, section: "Technical Details" },

    { key: "objective", label: "Project Objective", type: "textarea", rows: 3, max: 1500, section: "Details" },
    { key: "features", label: "Key Features", type: "textarea", rows: 4, max: 2500, section: "Details" },

    { key: "github", label: "GitHub Repository URL", type: "url", max: 300, section: "Links" },
    { key: "demo", label: "Live Demo URL", type: "url", max: 300, section: "Links" },
    { key: "docs", label: "Documentation URL", type: "url", max: 300, section: "Links" }
  ];

  /* ---- values -> stored model ----------------------------------------- */
  function experimentFromValues(v) {
    const sections = [];
    if (v.procedure) {
      sections.push({ id: "a", letter: "A", title: "Procedure", video: "", code: "", notes: v.procedure, outputImage: "" });
    }
    const outcome = [];
    if (v.expected) outcome.push("Expected Output\n" + v.expected);
    if (v.actual) outcome.push("Actual Output\n" + v.actual);
    if (v.results) outcome.push("Results / Observations\n" + v.results);
    if (outcome.length) {
      sections.push({ id: "b", letter: "B", title: "Results", video: "", code: "", notes: outcome.join("\n\n"), outputImage: "" });
    }
    if (!sections.length) {
      sections.push({ id: "a", letter: "A", title: "Overview", video: "", code: "", notes: v.summary || "", outputImage: "" });
    }
    return {
      code: v.code,
      name: v.name,
      tagline: v.tagline,
      summary: v.summary,
      category: v.category,
      status: v.status,
      created: v.created,
      tags: splitList(v.tags),
      language: v.language,
      technologies: splitList(v.technologies),
      dataset: v.dataset,
      datasetSource: v.datasetSource,
      notebook: v.notebook,
      objective: v.objective,
      procedure: v.procedure,
      input: v.input,
      expected: v.expected,
      actual: v.actual,
      results: v.results,
      githubLink: v.github,
      references: splitLines(v.references),
      previewVideo: "",
      youtubeVideo: "",
      youtubeLink: "",
      sections: sections
    };
  }

  function toolFromValues(v) {
    return {
      name: v.name,
      desc: v.desc,
      details: v.details,
      category: v.category,
      type: v.type,
      status: v.status,
      created: v.created,
      tags: splitList(v.tags),
      language: v.language,
      platforms: v.platforms,
      related: v.related,
      install: v.install,
      usage: v.usage,
      website: v.website,
      docs: v.docs,
      github: v.github,
      exps: []
    };
  }

  function projectFromValues(v) {
    return {
      title: v.title,
      desc: v.desc,
      details: v.details,
      category: v.category,
      type: v.type,
      status: v.status,
      visibility: v.visibility,
      start: v.start,
      end: v.end,
      tags: splitList(v.tags),
      languages: v.languages,
      tech: v.tech,
      team: v.team,
      image: v.image,
      objective: v.objective,
      features: v.features,
      github: v.github,
      demo: v.demo,
      docs: v.docs,
      tools: [v.tech, v.languages].filter(Boolean).join(", ")
    };
  }

  function nextExperimentId() {
    let max = 0;
    contentList("experiments").forEach(function (e) {
      const n = parseInt(e.id, 10);
      if (!isNaN(n) && n > max) max = n;
    });
    return max + 1;
  }

  const ENTITY_NOUNS = { experiments: "Experiment", tools: "Tool", projects: "Project" };

  function itemTitle(item) {
    return String((item && (item.name || item.title)) || "Untitled");
  }

  /* Insert or replace a custom item and persist the whole custom set. */
  function addOrUpdate(kind, model, uid) {
    const list = contentList(kind);
    if (uid) {
      const idx = list.findIndex(function (x) { return x.uid === uid; });
      if (idx < 0) return { ok: false, message: "That item is no longer available." };
      model.uid = uid;
      model.custom = true;
      if (kind === "experiments") model.id = list[idx].id;
      list[idx] = model;
    } else {
      model.uid = makeUid(kind === "experiments" ? "exp" : kind === "tools" ? "tool" : "project");
      model.custom = true;
      if (kind === "experiments") model.id = nextExperimentId();
      list.push(model);
    }
    const persisted = writeContentStore(CONTENT_STORES[kind], customItems(kind));
    const noun = ENTITY_NOUNS[kind];
    return {
      ok: true,
      message: persisted
        ? noun + (uid ? " updated successfully" : " added successfully")
        : noun + (uid ? " updated" : " added") + " for this session only \u2014 browser storage is unavailable"
    };
  }

  const ENTITY_META = {
    experiments: {
      addTitle: "Add Experiment",
      editTitle: "Edit Experiment",
      subtitle: "Saved in this browser, so the experiment stays after you reload the site.",
      saveLabel: "Save Experiment",
      fields: EXPERIMENT_FIELDS,
      defaults: function () { return { status: "Not Started", created: todayIso() }; },
      toModel: experimentFromValues,
      validate: function (values, uid) {
        const out = {};
        const code = String(values.code || "").trim().toLowerCase();
        if (code && contentList("experiments").some(function (e) {
          return e.uid !== uid && String(e.code || "").trim().toLowerCase() === code;
        })) out.code = "Another experiment already uses this ID.";
        return out;
      }
    },
    tools: {
      addTitle: "Add Tool",
      editTitle: "Edit Tool",
      subtitle: "Saved in this browser, so the tool stays after you reload the site.",
      saveLabel: "Save Tool",
      fields: TOOL_FIELDS,
      defaults: function () { return { status: "Active", created: todayIso() }; },
      toModel: toolFromValues,
      validate: function (values, uid) {
        const out = {};
        const name = String(values.name || "").trim().toLowerCase();
        if (name && contentList("tools").some(function (t) {
          return t.uid !== uid && String(t.name || "").trim().toLowerCase() === name;
        })) out.name = "A tool with this name already exists.";
        return out;
      }
    },
    projects: {
      addTitle: "Add Project",
      editTitle: "Edit Project",
      subtitle: "Saved in this browser, so the project stays after you reload the site.",
      saveLabel: "Save Project",
      fields: PROJECT_FIELDS,
      defaults: function () { return { status: "Planning" }; },
      toModel: projectFromValues,
      validate: function (values, uid) {
        const out = {};
        const title = String(values.title || "").trim().toLowerCase();
        if (title && contentList("projects").some(function (p) {
          return p.uid !== uid && String(p.title || "").trim().toLowerCase() === title;
        })) out.title = "A project with this name already exists.";
        if (values.start && values.end && new Date(values.end) < new Date(values.start)) {
          out.end = "The end date cannot be before the start date.";
        }
        return out;
      }
    }
  };

  /* ---- generic add / edit modal --------------------------------------- */
  let entityModal = null;
  let entityModalState = null;

  function entityControlHtml(f, value) {
    const id = "ef-" + f.key;
    const val = String(value == null ? "" : value);
    const cls = "fld__input" + (f.type === "textarea" ? " fld__input--area" : "");
    let control;

    if (f.type === "textarea") {
      control = '<textarea class="' + cls + '" id="' + id + '" name="' + f.key + '" rows="' + (f.rows || 3) +
        '" maxlength="' + (f.max || 4000) + '" placeholder="' + esc(f.placeholder || "") +
        '" aria-describedby="' + id + '-err">' + esc(val) + "</textarea>";
    } else if (f.type === "select") {
      const opts = [];
      if (!f.req) opts.push('<option value=""' + (val === "" ? " selected" : "") + ">&mdash; Not set &mdash;</option>");
      f.options.forEach(function (o) {
        opts.push('<option value="' + esc(o) + '"' + (val === o ? " selected" : "") + ">" + esc(o) + "</option>");
      });
      control = '<select class="' + cls + '" id="' + id + '" name="' + f.key + '" aria-describedby="' + id + '-err">' +
        opts.join("") + "</select>";
    } else {
      const inputType = f.type === "date" ? "date" : f.type === "url" ? "url" : "text";
      control = '<input class="' + cls + '" id="' + id + '" name="' + f.key + '" type="' + inputType +
        '" maxlength="' + (f.max || 300) + '" value="' + esc(val) + '" placeholder="' + esc(f.placeholder || "") +
        '" autocomplete="off" spellcheck="false" aria-describedby="' + id + '-err">';
    }

    return (
      '<div class="fld' + (f.type === "textarea" ? " fld--wide" : "") + '">' +
        '<label class="fld__label" for="' + id + '">' + esc(f.label) +
          (f.req ? ' <span class="fld__req" aria-hidden="true">*</span>' : "") + "</label>" +
        control +
        (f.hint ? '<p class="fld__hint">' + esc(f.hint) + "</p>" : "") +
        '<p class="fld__err" id="' + id + '-err" role="alert"></p>' +
      "</div>"
    );
  }

  function entityFormHtml(meta, values) {
    const order = [];
    const groups = {};
    meta.fields.forEach(function (f) {
      const name = f.section || "Details";
      if (!groups[name]) { groups[name] = []; order.push(name); }
      groups[name].push(f);
    });
    return order.map(function (name) {
      return '<div class="fld__group"><span>' + esc(name) + "</span></div>" +
        groups[name].map(function (f) { return entityControlHtml(f, values[f.key]); }).join("");
    }).join("");
  }

  function ensureEntityModal() {
    if (entityModal) return entityModal;
    const wrap = document.createElement("div");
    wrap.className = "cm";
    wrap.id = "entityModal";
    wrap.hidden = true;
    wrap.innerHTML =
      '<div class="cm__backdrop" data-entity-close></div>' +
      '<div class="cm__panel cm__panel--wide" role="dialog" aria-modal="true" aria-labelledby="entityTitle">' +
        '<div class="cm__head">' +
          "<div>" +
            '<h3 class="cm__title" id="entityTitle">Add</h3>' +
            '<p class="cm__sub" id="entitySub"></p>' +
          "</div>" +
          '<button class="cm__x" type="button" aria-label="Close" data-entity-close>' + ICON.close + "</button>" +
        "</div>" +
        '<form class="cm__form" id="entityForm" novalidate>' +
          '<div class="cm__grid" id="entityGrid"></div>' +
          '<div class="cm__actions">' +
            '<button class="btn btn--sm btn--ghost cm__reset" id="entityResetBtn" type="button">Reset Form</button>' +
            '<span class="cm__gap"></span>' +
            '<button class="btn btn--sm" type="button" data-entity-close>Cancel</button>' +
            '<button class="btn btn--sm btn--primary" id="entitySaveBtn" type="submit">Save</button>' +
          "</div>" +
        "</form>" +
      "</div>";
    document.body.appendChild(wrap);
    entityModal = wrap;

    wrap.addEventListener("click", function (event) {
      if (event.target.closest("[data-entity-close]")) closeEntityModal();
    });
    $("#entityForm", wrap).addEventListener("submit", function (event) {
      event.preventDefault();
      submitEntityForm();
    });
    $("#entityResetBtn", wrap).addEventListener("click", function () {
      if (!entityModalState) return;
      fillEntityGrid(entityModalState.defaults);
    });
    wrap.addEventListener("input", function (event) {
      if (event.target.classList && event.target.classList.contains("fld__input")) clearEntityError(event.target);
    });
    wrap.addEventListener("change", function (event) {
      if (event.target.classList && event.target.classList.contains("fld__input")) clearEntityError(event.target);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && entityModal && !entityModal.hidden) closeEntityModal();
    });
    return wrap;
  }

  function showEntityError(input, message) {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    const err = document.getElementById(input.id + "-err");
    if (err) err.textContent = message;
  }

  function clearEntityError(input) {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    const err = document.getElementById(input.id + "-err");
    if (err) err.textContent = "";
  }

  function entityFieldError(f, raw) {
    const value = String(raw == null ? "" : raw).trim();
    if (f.req && !value) return f.label + " is required.";
    if (!value) return "";
    if (f.min && value.length < f.min) return f.label + " must be at least " + f.min + " characters.";
    if (f.max && value.length > f.max) return f.label + " must be " + f.max + " characters or fewer.";
    if (f.rx && !f.rx.test(value)) return f.rxMsg || (f.label + " is not valid.");
    if (f.type === "url" && !URL_RX.test(value)) return f.label + " must be a full http:// or https:// link.";
    if (f.type === "date" && isNaN(new Date(value).getTime())) return f.label + " is not a valid date.";
    return "";
  }

  function collectEntityValues(meta, item) {
    const values = {};
    meta.fields.forEach(function (f) {
      let raw = item ? item[f.from || f.key] : "";
      if (Array.isArray(raw)) raw = raw.join(f.join || ", ");
      values[f.key] = String(raw == null ? "" : raw);
    });
    return values;
  }

  function fillEntityGrid(values) {
    const meta = ENTITY_META[entityModalState.kind];
    $("#entityGrid").innerHTML = entityFormHtml(meta, values || {});
    meta.fields.forEach(function (f) {
      const input = $("#ef-" + f.key, entityModal);
      if (input) clearEntityError(input);
    });
  }

  function openEntityForm(kind, item, trigger) {
    const meta = ENTITY_META[kind];
    if (!meta) return;
    ensureEntityModal();
    const defaults = item
      ? collectEntityValues(meta, item)
      : Object.assign({}, meta.defaults ? meta.defaults() : {});
    entityModalState = {
      kind: kind,
      uid: item && item.uid ? item.uid : null,
      defaults: defaults,
      trigger: trigger || document.activeElement
    };
    $("#entityTitle").textContent = item ? meta.editTitle : meta.addTitle;
    $("#entitySub").textContent = meta.subtitle;
    $("#entitySaveBtn").textContent = item ? "Save Changes" : meta.saveLabel;
    fillEntityGrid(defaults);
    entityModal.hidden = false;
    document.body.classList.add("cm-open");
    const first = $("#ef-" + meta.fields[0].key, entityModal);
    if (first) first.focus();
  }

  function closeEntityModal() {
    if (!entityModal || entityModal.hidden) return;
    entityModal.hidden = true;
    if (!document.getElementById("confirmModal")) document.body.classList.remove("cm-open");
    const trigger = entityModalState && entityModalState.trigger;
    entityModalState = null;
    if (trigger && document.contains(trigger)) trigger.focus();
  }

  function submitEntityForm() {
    if (!entityModalState) return;
    const meta = ENTITY_META[entityModalState.kind];
    const values = {};
    meta.fields.forEach(function (f) {
      const input = $("#ef-" + f.key, entityModal);
      values[f.key] = input ? String(input.value).trim() : "";
    });

    const extra = meta.validate ? meta.validate(values, entityModalState.uid) : {};
    let firstBad = null;
    meta.fields.forEach(function (f) {
      const input = $("#ef-" + f.key, entityModal);
      if (!input) return;
      const message = entityFieldError(f, values[f.key]) || extra[f.key] || "";
      if (message) {
        showEntityError(input, message);
        if (!firstBad) firstBad = input;
      } else {
        clearEntityError(input);
      }
    });

    if (firstBad) {
      firstBad.focus();
      firstBad.scrollIntoView({ block: "nearest" });
      return;
    }

    const saveBtn = $("#entitySaveBtn", entityModal);
    if (saveBtn) saveBtn.disabled = true;
    let result;
    try {
      result = addOrUpdate(entityModalState.kind, meta.toModel(values), entityModalState.uid);
    } catch (err) {
      result = { ok: false, message: "Could not save: " + ((err && err.message) || "unexpected error") };
    }
    if (saveBtn) saveBtn.disabled = false;

    if (!result.ok) { toast(result.message); return; }
    closeEntityModal();
    render();
    toast(result.message);
  }

  function editCustomItem(kind, uid, trigger) {
    const item = contentList(kind).filter(function (x) { return x.uid === uid; })[0];
    if (item) openEntityForm(kind, item, trigger);
  }

  function deleteCustomItem(kind, uid) {
    const list = contentList(kind);
    const item = list.filter(function (x) { return x.uid === uid; })[0];
    if (!item) return;
    const noun = ENTITY_NOUNS[kind];
    openConfirm({
      title: "Delete this " + noun.toLowerCase() + "?",
      message: "\"" + itemTitle(item) + "\" will be permanently removed from this browser.",
      confirmLabel: "Delete " + noun.toLowerCase(),
      onConfirm: function () {
        const idx = list.findIndex(function (x) { return x.uid === uid; });
        if (idx >= 0) list.splice(idx, 1);
        const persisted = writeContentStore(CONTENT_STORES[kind], customItems(kind));
        render();
        toast(persisted
          ? noun + " deleted"
          : noun + " removed (browser storage is unavailable)");
      }
    });
  }

  /* ---- confirmation dialog -------------------------------------------- */
  function openConfirm(opts) {
    closeConfirm();
    const dlg = document.createElement("div");
    dlg.className = "cm";
    dlg.id = "confirmModal";
    dlg.innerHTML =
      '<div class="cm__backdrop" data-confirm-cancel></div>' +
      '<div class="cm__panel cm__panel--sm" role="dialog" aria-modal="true" aria-labelledby="confirmTitle">' +
        '<div class="cm__head"><div>' +
          '<h3 class="cm__title" id="confirmTitle">' + esc(opts.title) + "</h3>" +
          (opts.message ? '<p class="cm__sub">' + esc(opts.message) + "</p>" : "") +
        "</div></div>" +
        '<div class="cm__actions">' +
          '<span class="cm__gap"></span>' +
          '<button class="btn btn--sm" type="button" data-confirm-cancel>Cancel</button>' +
          '<button class="btn btn--sm btn--danger" type="button" data-confirm-ok>' + esc(opts.confirmLabel || "Delete") + "</button>" +
        "</div>" +
      "</div>";
    document.body.appendChild(dlg);
    document.body.classList.add("cm-open");

    let closed = false;
    const finish = function (ok) {
      if (closed) return;
      closed = true;
      closeConfirm();
      if (ok && opts.onConfirm) opts.onConfirm();
    };
    dlg.addEventListener("click", function (event) {
      if (event.target.closest("[data-confirm-ok]")) finish(true);
      else if (event.target.closest("[data-confirm-cancel]") || event.target === dlg) finish(false);
    });
    dlg.__key = function (event) { if (event.key === "Escape") finish(false); };
    document.addEventListener("keydown", dlg.__key);
    const okBtn = $("[data-confirm-ok]", dlg);
    if (okBtn) okBtn.focus();
  }

  function closeConfirm() {
    const dlg = document.getElementById("confirmModal");
    if (!dlg) return;
    if (dlg.__key) document.removeEventListener("keydown", dlg.__key);
    if (dlg.parentNode) dlg.parentNode.removeChild(dlg);
    if (!entityModal || entityModal.hidden) document.body.classList.remove("cm-open");
  }

  /* ---- small card building blocks ------------------------------------- */
  function entityActionsHtml(kind, uid, isCustom) {
    if (!isCustom || !uid) return "";
    return (
      '<div class="card-actions">' +
        '<button class="btn btn--sm" type="button" data-entity-action="' + esc(kind) +
          '" data-entity-op="edit" data-entity-uid="' + esc(uid) + '">' + ICON.pencil + " Edit</button>" +
        '<button class="btn btn--sm btn--danger" type="button" data-entity-action="' + esc(kind) +
          '" data-entity-op="delete" data-entity-uid="' + esc(uid) + '">' + ICON.close + " Delete</button>" +
      "</div>"
    );
  }

  function addButtonHtml(kind, label) {
    return '<button class="btn btn--add" type="button" data-add-entity="' + esc(kind) + '">+ ' + esc(label) + "</button>";
  }

  function externalLinkButton(href, label) {
    return '<a class="btn btn--sm" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' +
      ICON.external + esc(label) + "</a>";
  }

  function metaFactHtml(label, value) {
    return "<span><b>" + esc(label) + "</b> " + esc(value) + "</span>";
  }

  function detailBlockHtml(title, body) {
    return '<div class="entity-block"><p class="entity-block__title">' + esc(title) +
      "</p><p>" + esc(body) + "</p></div>";
  }

  function tagChipsHtml(values) {
    const list = Array.isArray(values) ? values : splitList(values);
    if (!list.length) return "";
    return '<div class="tag-row">' + list.map(function (t) {
      return '<span class="chip">' + esc(t) + "</span>";
    }).join("") + "</div>";
  }

  /* ---- experiment cards ------------------------------------------------ */
  function experimentCardHtml(experiment, query, index) {
    const custom = experiment.custom === true;
    const sections = experiment.sections || [];
    const q = query || "";
    const nameHtml = q ? highlightMatch(experiment.name, q) : esc(experiment.name);
    const delay = typeof index === "number"
      ? ' style="animation-delay:' + Math.min(index * 45, 400) + 'ms"'
      : "";

    const metaChips = [];
    if (custom) {
      if (experiment.code) metaChips.push('<span class="chip chip--gold">' + esc(experiment.code) + "</span>");
      if (experiment.category) metaChips.push('<span class="chip chip--accent">' + esc(experiment.category) + "</span>");
      if (experiment.status) metaChips.push('<span class="chip">' + esc(experiment.status) + "</span>");
      if (experiment.created) metaChips.push('<span class="chip chip--ghost">' + esc(experiment.created) + "</span>");
    }

    const tech = custom && Array.isArray(experiment.technologies) ? experiment.technologies.slice(0, 5) : [];

    return (
      '<article class="exp-card" data-exp-card="' + esc(experiment.id) + '"' + delay +
        ' tabindex="0" role="button" aria-label="Open preview of Experiment ' + esc(experiment.id) + ", " + esc(experiment.name) + '">' +
        '<div class="exp-card__top">' +
          '<span class="exp-card__num">' + esc(experiment.id) + "</span>" +
          '<h3 class="exp-card__name">' + nameHtml + "</h3>" +
        "</div>" +
        '<p class="exp-card__tag">' + esc(experiment.tagline || "") + "</p>" +
        (metaChips.length ? '<div class="tag-row">' + metaChips.join("") + "</div>" : "") +
        (tech.length ? tagChipsHtml(tech) : "") +
        '<div class="exp-card__foot">' +
          '<span class="chip">' + plural(sections.length, "part") + "</span>" +
          (sections.length ? '<span class="exp-card__parts">' + sections.map(function (s) {
            return "<i>" + esc(s.letter) + "</i>";
          }).join("") + "</span>" : "") +
        "</div>" +
        entityActionsHtml("experiments", experiment.uid, custom) +
      "</article>"
    );
  }

  /* ---- tool cards ------------------------------------------------------ */
  function toolCardHtml(tool) {
    const custom = tool.custom === true;
    const exps = Array.isArray(tool.exps) ? tool.exps : [];
    const expsChip = exps.length
      ? '<span class="chip">' + esc(exps.map(function (x) { return "Exp " + x; }).join(", ")) + "</span>"
      : "";

    /* Entries that ship with the site keep their original compact card. */
    if (!custom) {
      const linkTarget = tool.website || tool.docs || tool.github || tool.url || "";
      return (
        '<article class="exp-card">' +
          '<div class="exp-card__top">' +
            '<h3 class="exp-card__name">' + esc(tool.name) + "</h3>" +
          "</div>" +
          '<p class="exp-card__tag">' + esc(tool.desc) + "</p>" +
          '<div style="margin-top:8px">' +
            (expsChip || '<span class="chip">' + esc(tool.category || "Tool") + "</span>") +
          "</div>" +
          '<div style="margin-top:auto;padding-top:12px">' +
            (linkTarget
              ? '<a class="btn btn--sm btn--primary" href="' + esc(linkTarget) + '" target="_blank" rel="noopener noreferrer">Learn More</a>'
              : "") +
          "</div>" +
        "</article>"
      );
    }

    const metaChips = [];
    if (tool.category) metaChips.push('<span class="chip chip--accent">' + esc(tool.category) + "</span>");
    if (tool.type) metaChips.push('<span class="chip">' + esc(tool.type) + "</span>");
    if (tool.status) metaChips.push('<span class="chip' + (tool.status === "Inactive" ? " chip--ghost" : "") + '">' + esc(tool.status) + "</span>");
    if (tool.created) metaChips.push('<span class="chip chip--ghost">' + esc(tool.created) + "</span>");

    const facts = [];
    if (tool.language) facts.push(metaFactHtml("Language", tool.language));
    if (tool.platforms) facts.push(metaFactHtml("Platforms", tool.platforms));
    if (tool.related) facts.push(metaFactHtml("Related", tool.related));

    const details = [];
    if (tool.details) details.push(detailBlockHtml("Description", tool.details));
    if (tool.install) details.push(detailBlockHtml("Installation", tool.install));
    if (tool.usage) details.push(detailBlockHtml("Usage", tool.usage));

    const links = [];
    if (tool.website) links.push(externalLinkButton(tool.website, "Website"));
    if (tool.docs) links.push(externalLinkButton(tool.docs, "Docs"));
    if (tool.github) links.push(externalLinkButton(tool.github, "GitHub"));

    return (
      '<article class="exp-card">' +
        '<div class="exp-card__top">' +
          '<h3 class="exp-card__name">' + esc(tool.name) + "</h3>" +
        "</div>" +
        (metaChips.length ? '<div class="tag-row">' + metaChips.join("") + "</div>" : "") +
        '<p class="exp-card__tag">' + esc(tool.desc) + "</p>" +
        (facts.length ? '<div class="entity-meta-list">' + facts.join("") + "</div>" : "") +
        tagChipsHtml(tool.tags) +
        (details.length
          ? '<details class="entity-details"><summary>More details</summary>' + details.join("") + "</details>"
          : "") +
        (links.length ? '<div class="entity-links">' + links.join("") + "</div>" : "") +
        entityActionsHtml("tools", tool.uid, custom) +
      "</article>"
    );
  }

  /* ---- project cards --------------------------------------------------- */
  function projectCardHtml(project) {
    const custom = project.custom === true;

    if (!custom) {
      const link = project.github
        ? '<div style="margin-top:auto;padding-top:12px">' +
            '<a class="btn btn--sm btn--primary" href="' + esc(project.github) + '" target="_blank" rel="noopener noreferrer">GitHub Link</a>' +
          "</div>"
        : "";
      return (
        '<article class="exp-card">' +
          '<div class="exp-card__top">' +
            '<h3 class="exp-card__name">' + esc(project.title) + "</h3>" +
          "</div>" +
          '<div style="margin-top:8px">' +
            '<span class="chip">' + esc(project.tools) + "</span>" +
          "</div>" +
          '<p class="exp-card__tag" style="margin-top:10px">' + esc(project.desc) + "</p>" +
          link +
        "</article>"
      );
    }

    const metaChips = [];
    if (project.category) metaChips.push('<span class="chip chip--accent">' + esc(project.category) + "</span>");
    if (project.type) metaChips.push('<span class="chip">' + esc(project.type) + "</span>");
    if (project.status) metaChips.push('<span class="chip">' + esc(project.status) + "</span>");
    if (project.visibility) metaChips.push('<span class="chip chip--ghost">' + esc(project.visibility) + "</span>");

    const tech = splitList(project.tech);
    const facts = [];
    if (project.languages) facts.push(metaFactHtml("Languages", project.languages));
    if (project.team) facts.push(metaFactHtml("Team", project.team));
    if (project.start) facts.push(metaFactHtml("Start", project.start));
    if (project.end) facts.push(metaFactHtml("End", project.end));

    const links = [];
    if (project.github) links.push(externalLinkButton(project.github, "GitHub"));
    if (project.demo) links.push(externalLinkButton(project.demo, "Live Demo"));
    if (project.docs) links.push(externalLinkButton(project.docs, "Docs"));

    const details = [];
    if (project.objective) details.push(detailBlockHtml("Objective", project.objective));
    if (project.features) details.push(detailBlockHtml("Key Features", project.features));
    if (project.details) details.push(detailBlockHtml("Detailed Description", project.details));

    const thumb = project.image
      ? '<img class="project-thumb" src="' + esc(project.image) + '" alt="Thumbnail for ' + esc(project.title) + '" loading="lazy">'
      : "";

    return (
      '<article class="exp-card">' +
        thumb +
        '<div class="exp-card__top">' +
          '<h3 class="exp-card__name">' + esc(project.title) + "</h3>" +
        "</div>" +
        (metaChips.length ? '<div class="tag-row">' + metaChips.join("") + "</div>" : "") +
        '<p class="exp-card__tag">' + esc(project.desc) + "</p>" +
        (tech.length ? tagChipsHtml(tech) : "") +
        tagChipsHtml(project.tags) +
        (facts.length ? '<div class="entity-meta-list">' + facts.join("") + "</div>" : "") +
        (links.length ? '<div class="entity-links">' + links.join("") + "</div>" : "") +
        (details.length
          ? '<details class="entity-details"><summary>More details</summary>' + details.join("") + "</details>"
          : "") +
        entityActionsHtml("projects", project.uid, custom) +
      "</article>"
    );
  }

  function emptyExperimentsHtml() {
    return (
      '<div class="empty-state">' +
        ICON.search +
        "<h3>No experiments yet</h3>" +
        '<p class="muted">Use the Add Experiment button to create your first experiment.</p>' +
      "</div>"
    );
  }

  function emptyToolsHtml() {
    return (
      '<div class="empty-state">' +
        ICON.search +
        "<h3>No tools yet</h3>" +
        '<p class="muted">Use the Add Tool button to add your first tool.</p>' +
      "</div>"
    );
  }

  function emptyProjectsHtml() {
    return (
      '<div class="empty-state">' +
        ICON.search +
        "<h3>No projects yet</h3>" +
        '<p class="muted">Use the Add Project button to showcase your first project.</p>' +
      "</div>"
    );
  }

  /* ---------------------------------------------------------------------
     2. SHARED PARTIALS
     --------------------------------------------------------------------- */
  function studentFieldsHtml() {
    const rows = [
      ["Name:", student.name],
      ["ID Number:", student.idNumber],
      ["Section:", student.section],
      ["Branch:", labMeta.department],
      ["Faculty:", student.faculty],
      ["Profession:", student.profession]
    ];
    return rows
      .map(function (row) {
        return '<div class="idcard__field"><dt>' + esc(row[0]) + "</dt><dd>" + esc(row[1]) + "</dd></div>";
      })
      .join("");
  }

  function studentCardHtml(options) {
    const opts = options || {};
    const sizeClass = opts.compact ? ' idcard--compact' : '';
    const photoHtml = student.photo
      ? '<img class="idcard__photo" src="' + esc(student.photo) + '" alt="Photograph of ' + esc(student.name) + '" id="profilePhotoBtn" tabindex="0" role="button">'
      : '<div class="idcard__photo-ph" id="profilePhotoBtn" tabindex="0" role="button" aria-label="View LinkedIn profile">' +
          ICON.person +
          '<span class="idcard__initials">' + esc(initialsOf(student.name)) + "</span>" +
          "<small>Your photo goes here<br>assets/img/student-photo.jpg</small>" +
        "</div>";

    const social = socialLinksHtml();

    return (
      '<aside class="card idcard' + sizeClass + '" id="studentCard">' +
        '<div class="idcard__strip">' +
          '<span class="idcard__strip-txt"><b>' + esc(laboratory.name) + "</b></span>" +
        "</div>" +
        '<div class="idcard__body">' +
          photoHtml +
          '<dl class="idcard__fields">' + studentFieldsHtml() + "</dl>" +
        "</div>" +
        (social ? '<div class="idcard__social">' + social + "</div>" : "") +
        '<div class="idcard__foot">' +
          "<span>" + esc(labMeta.subjectCode) + "</span>" +
          '<span class="idcard__bars" aria-hidden="true">' +
            [10, 16, 8, 18, 12, 20, 9, 15, 11, 19, 7, 14].map(function (h) {
              return "<i style=\"height:" + h + "px\"></i>";
            }).join("") +
          "</span>" +
          "<span>" + esc(labMeta.academicYear) + "</span>" +
        "</div>" +
        '<div class="idcard__actions">' +
          '<button class="btn btn--sm btn--ghost idcard__edit" id="editCardBtn" type="button">' +
            ICON.pencil + "<span>Edit Student Card</span>" +
          "</button>" +
        "</div>" +
      "</aside>"
    );
  }

  /* video frame with 10 second hover-to-play behaviour */
  function previewVideoHtml(experiment) {
    const src = experiment.previewVideo;
    const ytId = youtubeIdOf(experiment.previewYoutube || experiment.youtubeVideo);

    if (!src && ytId) {
      return (
        '<div class="media media--yt">' +
          '<a class="media__poster" href="https://www.youtube.com/watch?v=' + esc(ytId) + '" ' +
            'target="_blank" rel="noopener noreferrer" aria-label="Watch the preview on YouTube">' +
            '<img class="media__poster-img" alt="" loading="lazy" ' +
              'src="https://i.ytimg.com/vi/' + esc(ytId) + '/hqdefault.jpg">' +
            '<span class="media__poster-play">' + ICON.youtube + ICON.play + "</span>" +
            '<span class="badge badge--live">' + ICON.youtube + " YOUTUBE PREVIEW</span>" +
          "</a>" +
          '<div class="media__hint">' + ICON.youtube + " Click to watch the preview on YouTube</div>" +
        "</div>"
      );
    }

    if (!src) {
      return (
        '<div class="media">' +
          '<div class="media__ph">' + ICON.video +
            "<strong>Preview video pending</strong>" +
            "<span>Set <code>previewVideo</code> (or <code>youtubeVideo</code>) in <code>assets/js/data.js</code></span>" +
          "</div>" +
        "</div>"
      );
    }

    return (
      '<div class="media" data-preview>' +
        '<video class="media__video" src="' + esc(src) + '" playsinline preload="metadata" ' +
          'aria-label="Preview of ' + esc(experiment.name) + '"></video>' +
        '<div class="media__badges">' +
          '<span class="badge badge--live">' + ICON.play + " " + PREVIEW_SECONDS + "s PREVIEW</span>" +
          '<span class="badge">Hover to play</span>' +
        "</div>" +
        '<button class="media__sound is-muted" type="button" data-sound aria-label="Unmute preview">' +
          ICON.sound + ICON.soundOff +
        "</button>" +
        '<div class="media__hint">' + ICON.play + " Move the mouse over the video to preview</div>" +
      "</div>"
    );
  }

  /* Overlay a "file not found" notice without destroying the player element,
     so the card keeps its shape and badges and works again after a refresh
     once the mp4 has been added. */
  function showMediaFallback(frame, src, tall) {
    if (frame.querySelector(".media__overlay")) return;
    const video = frame.querySelector("video");
    if (video) video.style.visibility = "hidden";

    const overlay = document.createElement("div");
    overlay.className = "media__overlay" + (tall ? " media__ph--tall" : "");
    overlay.innerHTML =
      ICON.video +
      "<strong>Video file not added yet</strong>" +
      "<span>Place <code>" + esc(src) + "</code> in the videos folder, then refresh</span>";
    frame.appendChild(overlay);
  }

  /* regular video for an individual section */
  /* Some experiments were written for the site rather than converted from a
     submitted lab-notebook file. Say so plainly instead of implying the whole
     set came from the student's own record. */
  function authoredNoticeHtml(experiment) {
    if (!experiment || experiment.authored !== true) return "";
    return (
      '<p class="notice notice--warn">' +
        '<strong>Added for this site.</strong> ' +
        esc(experiment.authoredNote || "This experiment is not part of the submitted lab record.") +
      "</p>"
    );
  }

  /* Data files each section actually touches, so the button only appears when
     there is a real file behind it. */
  var SECTION_FILES = {
    "1-a": ["StudentOutputs.csv", "StudentsOutputs.csv"],
    "1-b": ["Student.json"],
    "1-c": ["Student.xlsx"],
    "2-b": ["Engineer.db", "ds_experiment2b.db"],
    "5-a": ["iris.csv"]
  };

  function humanFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  /* Offers the section's Python source and the data files it reads or writes.
     The .py is built in the browser from the same string that feeds the Code
     Lab, so the download can never drift from the code shown on screen. */
  function downloadsHtml(experiment, section) {
    const key = experiment.id + "-" + section.id;
    const fileName = "experiment-" + experiment.id + "-" + section.id.toLowerCase() + ".py";
    const dataFiles = SECTION_FILES[key] || [];
    const code = String(section.code || "");

    const rows = [];
    rows.push(
      '<div class="dl-row">' +
        '<div class="dl-row__text">' +
          '<b>Python source</b>' +
          "<span>" + esc(fileName) + " &middot; " + plural(code.split("\n").length, "line") +
            " &middot; same code the Code Lab runs</span>" +
        "</div>" +
        '<button class="btn btn--ghost dl-btn" type="button" data-dl-src="' + esc(key) + '">' +
          ICON.download + " Download .py" +
        "</button>" +
      "</div>"
    );

    dataFiles.forEach(function (f) {
      const href = "assets/downloads/" + f;
      rows.push(
        '<div class="dl-row">' +
          '<div class="dl-row__text">' +
            "<b>" + esc(f) + "</b>" +
            "<span>Data file used by this part</span>" +
          "</div>" +
          '<a class="btn btn--ghost dl-btn" href="' + esc(href) + '" download>' +
            ICON.download + " Download" +
          "</a>" +
        "</div>"
      );
    });

    return (
      '<div class="downloads">' +
        '<h3 class="field-label"><span class="dot"></span>Download</h3>' +
        rows.join("") +
      "</div>"
    );
  }

  function sectionVideoHtml(section) {
    const src = section.video;
    const ytId = youtubeIdOf(section.youtubeVideo);

    /* A YouTube link takes priority: the embedded player gives real
       play/pause/scrub/fullscreen, which a linked file also does. */
    if (ytId) {
      return (
        '<div class="media media--yt">' +
          '<iframe class="media__embed" src="https://www.youtube-nocookie.com/embed/' + esc(ytId) +
            '?rel=0" title="Video for section ' + esc(section.letter) + '" ' +
            'loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; ' +
            'gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
          '<div class="media__badges">' +
            '<span class="badge badge--live">' + ICON.youtube + " YOUTUBE</span>" +
          "</div>" +
          '<a class="media__watch" href="https://www.youtube.com/watch?v=' + esc(ytId) + '" ' +
            'target="_blank" rel="noopener noreferrer">' + ICON.youtube + " Watch on YouTube</a>" +
        "</div>"
      );
    }

    if (!src) {
      return (
        '<div class="media">' +
          '<div class="media__ph media__ph--tall">' + ICON.video +
            "<strong>Section video pending</strong>" +
            "<span>Set this section's <code>youtubeVideo</code> or <code>video</code> in <code>assets/js/data.js</code></span>" +
          "</div>" +
        "</div>"
      );
    }

    return (
      '<div class="media">' +
        '<video class="media__video media__video--tall" src="' + esc(src) + '" controls playsinline preload="metadata" ' +
          'aria-label="Video for section ' + esc(section.letter) + '"></video>' +
      "</div>"
    );
  }

  /* Compact, in-page player for one part. It reads the same `video` /
     `youtubeVideo` fields as sectionVideoHtml(), but is sized to sit beside
     the part details instead of filling the whole column, so each sub
     experiment (A / B / B(i) / ...) gets a small screen-recording. */
  function sectionVideoSmallHtml(section) {
    const src = section.video;
    const ytId = youtubeIdOf(section.youtubeVideo);
    const label = "Video for section " + section.letter;

    let frame;
    if (ytId) {
      frame =
        '<div class="media media--yt">' +
          '<iframe class="media__embed" src="https://www.youtube-nocookie.com/embed/' + esc(ytId) +
            '?rel=0" title="' + esc(label) + '" loading="lazy" ' +
            'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        "</div>";
    } else if (src) {
      frame =
        '<div class="media">' +
          '<video class="media__video" src="' + esc(src) + '" controls playsinline ' +
            'preload="metadata" aria-label="' + esc(label) + '"></video>' +
        "</div>";
    } else {
      frame =
        '<div class="media">' +
          '<div class="media__ph">' + ICON.video +
            "<strong>Video pending</strong>" +
            "<span>Drop the <code>.mp4</code> into <code>assets/videos/</code> and set this part&rsquo;s <code>video</code></span>" +
          "</div>" +
        "</div>";
    }

    return (
      '<figure class="sec-video">' +
        '<figcaption class="field-label"><span class="dot"></span>Video &middot; Part ' + esc(section.letter) + "</figcaption>" +
        frame +
      "</figure>"
    );
  }

  function youtubeIdOf(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const m = raw.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
    if (m) return m[1];
    return /^[A-Za-z0-9_-]{6,}$/.test(raw) ? raw : "";
  }

  function youtubeBlockHtml(experiment) {
    const id = youtubeIdOf(experiment.youtubeVideo);
    const media = id
      ? '<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(id) +
        '?rel=0" title="YouTube video for ' + esc(experiment.name) +
        '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
      : '<div class="media"><div class="media__ph">' + ICON.youtube +
        "<strong>YouTube video pending</strong>" +
        "<span>Set <code>youtubeVideo</code> in <code>assets/js/data.js</code></span>" +
        "</div></div>";

    const link = experiment.youtubeLink
      ? '<a class="link-row link-row--yt" href="' + esc(experiment.youtubeLink) + '" target="_blank" rel="noopener noreferrer">' +
          ICON.youtube +
          '<span class="link-row__text"><b>YouTube Link</b>' +
          '<span class="link-row__url">' + esc(experiment.youtubeLink) + "</span></span>" +
          ICON.external +
        "</a>"
      : "";

    const gh = experiment.githubLink
      ? '<a class="link-row link-row--gh" href="' + esc(experiment.githubLink) + '" target="_blank" rel="noopener noreferrer">' +
          ICON.github +
          '<span class="link-row__text"><b>GitHub Link</b>' +
          '<span class="link-row__url">' + esc(experiment.githubLink) + "</span></span>" +
          ICON.external +
        "</a>"
      : "";

    return (
      '<div class="stack-sm">' + media + link + gh + "</div>"
    );
  }

  /* ---------------------------------------------------------------------
     3. CODE VIEWER
     --------------------------------------------------------------------- */
  function codeViewerHtml(rawCode, fileName) {
    const code = String(rawCode || "").replace(/\s+$/, "");
    const lines = code ? code.split("\n") : [""];

    const rows = lines
      .map(function (line, i) {
        return (
          '<div class="code-line">' +
            '<span class="code-gutter">' + (i + 1) + "</span>" +
            '<span class="code-code">' + (highlightPython(line) || "&nbsp;") + "</span>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<div class="code">' +
        '<div class="code__bar">' +
          '<span class="code__dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
          '<span class="code__name">' + esc(fileName) + "</span>" +
          '<span class="code__bar-spacer"></span>' +
          '<span class="chip chip--accent">Python</span>' +
        "</div>" +
        '<div class="code-panel" data-code-panel tabindex="0">' +
          '<div class="code-table">' + rows + "</div>" +
        "</div>" +
        '<div class="code-foot">' +
          "<span>" + plural(lines.length, "line") + "</span>" +
          '<span class="code-foot__spacer"></span>' +
          '<button class="btn btn--sm" type="button" data-copy>' + ICON.copy + " Copy Code</button>" +
          '<button class="btn btn--sm btn--ghost" type="button" data-download>' + ICON.download + " .py</button>" +
        "</div>" +
      "</div>"
    );
  }

  function wireCodeViewer(root, code, fileName) {
    const copyBtn = $("[data-copy]", root);
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        copyText(code).then(function (ok) {
          toast(ok ? "Code copied to clipboard" : "Copy blocked by the browser - select the code manually");
          copyBtn.innerHTML = (ok ? ICON.check : ICON.copy) + " " + (ok ? "Copied" : "Copy Code");
          setTimeout(function () {
            copyBtn.innerHTML = ICON.copy + " Copy Code";
          }, 1900);
        });
      });
    }

    const dlBtn = $("[data-download]", root);
    if (dlBtn) {
      dlBtn.addEventListener("click", function () {
        const blob = new Blob([code], { type: "text/x-python;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        toast("Downloaded " + fileName);
      });
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (err) {
      return false;
    }
  }

  /* ---------------------------------------------------------------------
     4. HOVER PREVIEW BEHAVIOUR
     --------------------------------------------------------------------- */
  function bindHoverPreview(frame) {
    const video = $("video", frame);
    if (!video) return;

    const soundBtn = $("[data-sound]", frame);
    let timer = null;

    // browsers only allow unattended autoplay when muted
    video.muted = true;
    if (soundBtn) soundBtn.classList.add("is-muted");

    function start() {
      clearInterval(timer);
      if (video.currentTime > 0.05) video.currentTime = 0;
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(function () {
          video.muted = true;           // fall back to muted autoplay
          if (soundBtn) soundBtn.classList.add("is-muted");
          video.play().catch(function () {});
        });
      }
      // keep the preview running for about ten seconds, then loop the clip
      timer = setInterval(function () {
        if (video.ended || video.currentTime >= PREVIEW_SECONDS) {
          video.currentTime = 0;
          video.play().catch(function () {});
        }
      }, 220);
    }

    function stop() {
      clearInterval(timer);
      timer = null;
      video.pause();
      video.currentTime = 0;             // rewind on mouse leave
    }

    frame.addEventListener("mouseenter", start);
    frame.addEventListener("mouseleave", stop);
    frame.addEventListener("click", function (event) {
      if (event.target.closest("[data-sound]")) return;
      if (video.paused) { start(); } else { stop(); }
    });

    video.addEventListener("error", function () {
      stop();
      clearInterval(timer);
      showMediaFallback(frame, video.getAttribute("src") || "", false);
    });

    if (soundBtn) {
      soundBtn.addEventListener("click", function () {
        video.muted = !video.muted;
        soundBtn.classList.toggle("is-muted", video.muted);
        soundBtn.setAttribute("aria-label", video.muted ? "Unmute preview" : "Mute preview");
      });
    }
  }

  function wireAllPreviews(root) {
    $$("[data-preview]", root).forEach(bindHoverPreview);
  }

  function wireVideoErrors(root) {
    $$("video", root).forEach(function (video) {
      if (video.hasAttribute("controls")) {
        video.addEventListener("error", function () {
          showMediaFallback(video.parentElement, video.getAttribute("src") || "", true);
        });
      }
    });
  }

  /* ---------------------------------------------------------------------
     4b. PYTHON CODE LAB
     ---------------------------------------------------------------------
     Runs real Python in the browser with Pyodide (CPython compiled to
     WebAssembly) inside a Web Worker.

     Why a worker: Pyodide executes synchronously, so running it on the main
     thread would freeze the whole page and make the Stop button useless. The
     worker is built from a Blob URL, which keeps the site working when opened
     straight from the filesystem (a file:// worker script is blocked by
     Chrome, a blob:// one is not).

     Why not a server: the whole site stays double-click-and-open, with no
     install and no build step. The only cost is a one-time ~10 MB download
     of the Python runtime, after which the browser caches it.
     --------------------------------------------------------------------- */
  const PYODIDE_VERSION = "0.27.2";
  const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v" + PYODIDE_VERSION + "/full/";

  /* Source handed over by a section page's "Run this code" button. */
  let pendingLabCode = null;

  /* Survives route changes so the runtime is only downloaded once. */
  let labWorker = null;
  let labReady = false;
  let labBusy = false;

  const LAB_SAMPLES = {
    starter: [
      "# Digital Laboratory - Python 3.12",
      "# Press Run (or Ctrl+Enter). Output appears below, plots on the right.",
      "",
      "import pandas as pd",
      "import numpy as np",
      "",
      "marks = [78, 85, 90, 72, 88, 65, 70]",
      "df = pd.DataFrame({\"Marks\": marks})",
      "",
      "print(df)",
      "print(\"Mean:\", df[\"Marks\"].mean())",
      "print(\"Std :\", round(df[\"Marks\"].std(), 3))"
    ].join("\n"),
    plot: [
      "import matplotlib",
      "matplotlib.use(\"Agg\")",
      "import matplotlib.pyplot as plt",
      "import numpy as np",
      "",
      "x = np.linspace(0, 2 * np.pi, 200)",
      "plt.figure(figsize=(6, 3.6))",
      "plt.plot(x, np.sin(x), label=\"sin x\")",
      "plt.plot(x, np.cos(x), label=\"cos x\")",
      "plt.title(\"Trigonometric functions\")",
      "plt.grid(alpha=0.3)",
      "plt.legend()",
      "plt.show()",
      "print(\"figure rendered\")"
    ].join("\n"),
    data: [
      "import pandas as pd",
      "import numpy as np",
      "",
      "df = pd.DataFrame({",
      "    \"Department\": [\"CSE\"] * 5 + [\"ECE\"] * 5,",
      "    \"Marks\": [78, 85, 90, 72, 88, 65, 70, 82, 75, 80],",
      "})",
      "",
      "print(df.groupby(\"Department\")[\"Marks\"].agg([\"mean\", \"max\"]))",
      "",
      "q1 = df[\"Marks\"].quantile(0.25)",
      "q3 = df[\"Marks\"].quantile(0.75)",
      "iqr = q3 - q1",
      "outliers = df[(df[\"Marks\"] < q1 - 1.5 * iqr) | (df[\"Marks\"] > q3 + 1.5 * iqr)]",
      "print(\"IQR outliers:\")",
      "print(outliers if len(outliers) else \"none\")"
    ].join("\n")
  };

  function renderCodeLab() {
    const carry = pendingLabCode;
    const seed = carry && carry.code ? carry.code : LAB_SAMPLES.starter;

    return (
      '<div class="page stack">' +
        crumb([{ label: "Home", href: "#/" }, { label: "Code Lab" }]) +

        '<header class="section-title-row" style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">' +
          '<span class="chip chip--gold">Python 3.12</span>' +
          '<h1 class="sec-title" style="margin:0">Code Lab</h1>' +
          '<span class="exp-head__spacer"></span>' +
          '<span class="chip chip--accent" data-lab-runtime>Runtimenot loaded</span>' +
        "</header>" +

        (carry && carry.code
          ? '<div class="lab-banner">' + ICON.link +
            "<span><b>Loaded from " + esc(carry.label) + "</b> &middot; " + esc(carry.title || "") + "</span>" +
            '<button class="lab-banner__x" type="button" data-lab-clear aria-label="Discard the loaded code">' + ICON.close + "</button>" +
          "</div>"
          : "") +

        '<p class="sec-sub">A real Python 3.12 interpreter running inside your browser via Pyodide. ' +
          "It supports the whole data-science stack used in these experiments &mdash; " +
          "<code>pandas</code>, <code>numpy</code>, <code>matplotlib</code>, <code>seaborn</code>, " +
          "<code>re</code>, <code>sqlite3</code> and the standard library. " +
          "Nothing you write is uploaded anywhere.</p>" +

        '<div class="lab-grid">' +

          '<section class="card lab-editor">' +
            '<div class="code__bar">' +
              "<span>main.py</span>" +
              '<span class="code__bar-spacer"></span>' +
              '<button class="btn btn--run" type="button" data-lab-run>' + ICON.play + " Run</button>" +
              '<button class="btn btn--stop" type="button" data-lab-stop disabled>' + ICON.stop + " Stop</button>" +
              '<button class="btn btn--ghost btn--sm" type="button" data-lab-reset>Reset</button>' +
            "</div>" +
            '<textarea class="lab-code" id="labEditor" spellcheck="false" autocomplete="off" ' +
              'autocapitalize="off" autocorrect="off" aria-label="Python source editor">' + esc(seed) + "</textarea>" +
            '<div class="lab-samples">' +
              "<span>Examples:</span>" +
              '<button class="btn btn--ghost btn--sm" type="button" data-lab-sample="starter">Starter</button>' +
              '<button class="btn btn--ghost btn--sm" type="button" data-lab-sample="plot">Plot</button>' +
              '<button class="btn btn--ghost btn--sm" type="button" data-lab-sample="data">Data cleaning</button>' +
            "</div>" +
          "</section>" +

          '<section class="card lab-out">' +
            '<div class="code__bar">' +
              "<span>Console</span>" +
              '<span class="code__bar-spacer"></span>' +
              '<button class="btn btn--ghost btn--sm" type="button" data-lab-clearout>Clear</button>' +
            "</div>" +
            '<div class="lab-console" id="labConsole">' +
              '<p class="lab-console__idle">Output will appear here. Press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to run.</p>' +
            "</div>" +
            '<div class="lab-status" id="labStatus" hidden></div>' +
            '<div class="lab-figs" id="labFigs"></div>' +
          "</section>" +

        "</div>" +

        '<p class="lab-foot">' +
          ICON.info +
          " First run downloads the Python runtime (about 10 MB) from a public CDN and needs an internet connection. " +
          "After that your browser caches it and later runs start instantly, even offline. " +
          "Press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to run, <kbd>Ctrl</kbd>+<kbd>.</kbd> to stop." +
        "</p>" +
      "</div>"
    );
  }

  /* Every DOM reference below is resolved at call time on purpose. The worker
     outlives individual renders, so its message handler must write to whatever
     Code Lab view is on screen *now* - holding on to the nodes from the first
     render would silently post output into a detached element. */
  function labRefs() {
    return {
      editor: $("#labEditor"),
      out: $("#labConsole"),
      figs: $("#labFigs"),
      status: $("#labStatus"),
      chip: $("[data-lab-runtime]"),
      run: $("[data-lab-run]"),
      stop: $("[data-lab-stop]")
    };
  }

  function labSetStatus(msg, kind) {
    const el = labRefs().status;
    if (!el) return;
    if (!msg) { el.hidden = true; return; }
    el.hidden = false;
    el.className = "lab-status lab-status--" + (kind || "info");
    el.textContent = msg;
  }

  function labSetRunning(on) {
    labBusy = on;
    const r = labRefs();
    if (r.run) r.run.disabled = on;
    if (r.stop) r.stop.disabled = !on;
    if (!r.chip) return;
    r.chip.textContent = on ? "Running..." : (labReady ? "Python 3.12 ready" : "Runtime not loaded");
    r.chip.classList.toggle("chip--accent", !labReady);
    r.chip.classList.toggle("chip--gold", labReady);
  }

  function labAppendOut(text, cls) {
    const box = labRefs().out;
    if (!box) return;
    const idle = box.querySelector(".lab-console__idle");
    if (idle) idle.remove();
    const line = document.createElement("div");
    line.className = "lab-console__line" + (cls ? " " + cls : "");
    line.textContent = text;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  }

  function labAddFigures(figsData) {
    const box = labRefs().figs;
    if (!box) return;
    figsData.forEach(function (src, i) {
      box.insertAdjacentHTML("beforeend",
        '<figure class="lab-fig"><img alt="Figure ' + (i + 1) + '" src="data:image/png;base64,' + esc(src) + '">' +
        "<figcaption>Figure " + (i + 1) + "</figcaption></figure>");
    });
  }

  function ensureLabWorker() {
    if (labWorker) return;

    /* The Python side: run the snippet, capture both streams, and export any
       matplotlib figures as base64 PNGs so they can be shown as images. */
    const wrapper = [
      "import sys, io, base64, json",
      "_o, _e = sys.stdout, sys.stderr",
      "_b = io.StringIO()",
      "sys.stdout = _b; sys.stderr = _b",
      "_err = None",
      "try:",
      '    exec(compile(_CODE, "<lab>", "exec"), {"__name__": "__main__"})',
      "except SystemExit:",
      "    pass",
      "except BaseException:",
      "    import traceback",
      "    _err = traceback.format_exc()",
      "_figs = []",
      "try:",
      "    import matplotlib",
      '    matplotlib.use("Agg")',
      "    import matplotlib.pyplot as _plt",
      "    for _n in list(_plt.get_fignums()):",
      "        _f = _plt.figure(_n)",
      "        _buf = io.BytesIO()",
      '        _f.savefig(_buf, format="png", dpi=110, bbox_inches="tight")',
      "        _figs.append(base64.b64encode(_buf.getvalue()).decode())",
      "        _plt.close(_f)",
      '    _plt.close("all")',
      "except Exception:",
      "    pass",
      "sys.stdout = _o; sys.stderr = _e",
      '_RESULT = json.dumps({"out": _b.getvalue(), "err": _err, "figs": _figs})'
    ].join("\n");

    const src = [
      "let py = null;",
      "const post = (m) => self.postMessage(m);",
      "const WRAP = " + JSON.stringify(wrapper) + ";",
      "self.onmessage = async (e) => {",
      "  const { code } = e.data;",
      "  try {",
      "    if (!py) {",
      '      post({ type: "status", msg: "Downloading the Python runtime (~10 MB, first run only)..." });',
      '      importScripts("' + PYODIDE_CDN + 'pyodide.js");',
      "      py = await loadPyodide({ indexURL: \"" + PYODIDE_CDN + "\" });",
      '      post({ type: "ready" });',
      "    }",
      '    post({ type: "status", msg: "Loading packages..." });',
      "    await py.loadPackagesFromImports(code);",
      '    post({ type: "status", msg: "Running..." });',
      "    py.globals.set(\"_CODE\", code);",
      "    py.runPython(WRAP);",
      '    post({ type: "done", data: JSON.parse(py.globals.get("_RESULT")) });',
      "  } catch (err) {",
      '    post({ type: "error", msg: (err && err.message) ? err.message : String(err) });',
      "  }",
      "};"
    ].join("\n");

    labWorker = new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })));

    labWorker.onmessage = function (ev) {
      const msg = ev.data || {};
      if (msg.type === "status") { labSetStatus(msg.msg, "info"); return; }
      if (msg.type === "ready") { labReady = true; labSetStatus("", "info"); labSetRunning(false); return; }
      if (msg.type === "error") {
        labSetRunning(false);
        labSetStatus("Run failed", "error");
        labAppendOut(msg.msg, "lab-console__line--error");
        return;
      }
      if (msg.type === "done") {
        labSetRunning(false);
        labSetStatus("", "info");
        const d = msg.data || {};
        if (d.out && d.out.trim()) labAppendOut(d.out.replace(/\n$/, ""));
        if (d.err) labAppendOut(d.err.replace(/\n$/, ""), "lab-console__line--error");
        if (!((d.out || "").trim() || (d.err || "").trim())) labAppendOut("(no output)");
        labAddFigures(d.figs || []);
      }
    };

    labWorker.onerror = function (ev) {
      labSetRunning(false);
      labSetStatus("The Python runtime could not start", "error");
      labAppendOut(ev.message || "Worker error. Check your internet connection on the first run.",
        "lab-console__line--error");
    };
  }

  function labRun() {
    if (labBusy) return;
    const r = labRefs();
    if (r.figs) r.figs.innerHTML = "";
    if (r.out) r.out.innerHTML = "";
    labSetRunning(true);
    labSetStatus("Starting...", "info");
    ensureLabWorker();
    if (r.editor) labWorker.postMessage({ code: r.editor.value });
  }

  function labStop() {
    if (!labWorker) return;
    /* Terminating is the only way to interrupt synchronous CPython code. */
    labWorker.terminate();
    labWorker = null;
    labReady = false;
    labSetRunning(false);
    labSetStatus("Stopped", "warn");
    labAppendOut("(stopped by user)", "lab-console__line--warn");
  }

  function wireCodeLab() {
    const editor = $("#labEditor");
    if (!editor) return;

    /* Editor niceties: Tab inserts spaces, Ctrl+Enter runs, Ctrl+. stops. */
    editor.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = editor.selectionStart, t = editor.selectionEnd;
        editor.value = editor.value.slice(0, s) + "    " + editor.value.slice(t);
        editor.selectionStart = editor.selectionEnd = s + 4;
      } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        labRun();
      } else if (e.key === "." && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        labStop();
      }
    });

    $("[data-lab-run]").addEventListener("click", labRun);
    $("[data-lab-stop]").addEventListener("click", labStop);

    $("[data-lab-reset]").addEventListener("click", function () {
      const box = labRefs().editor;
      if (box) box.value = pendingLabCode && pendingLabCode.code ? pendingLabCode.code : LAB_SAMPLES.starter;
      toast("Editor reset");
    });

    const clearBtn = $("[data-lab-clear]");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        pendingLabCode = null;
        go("#/codelab");
      });
    }

    $$("[data-lab-sample]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const box = labRefs().editor;
        if (box) box.value = LAB_SAMPLES[btn.getAttribute("data-lab-sample")] || "";
        toast("Example loaded");
      });
    });

    $("[data-lab-clearout]").addEventListener("click", function () {
      const r = labRefs();
      if (r.out) r.out.innerHTML = "";
      if (r.figs) r.figs.innerHTML = "";
    });

    labSetRunning(false);
  }

  /* ---------------------------------------------------------------------
     5. ROUTER
     --------------------------------------------------------------------- */
  const view = $("#view");

  function go(hash) {
    if (window.location.hash === hash) render();
    else window.location.hash = hash;
  }

  function parseRoute() {
    const raw = (window.location.hash || "#/").replace(/^#/, "");
    const parts = raw.split("/").filter(Boolean);
    return { name: parts[0] || "home", id: parts[1] || "", sid: parts[2] || "" };
  }

  function findExperiment(id) {
    return experiments.filter(function (e) { return String(e.id) === String(id); })[0] || null;
  }

  function findSection(experiment, sid) {
    return experiment.sections.filter(function (s) {
      return String(s.id) === String(sid) || String(s.letter) === String(sid);
    })[0] || null;
  }

  function getExperimentTools(experiment) {
    const toolsMap = {
      1: ["Python", "Pandas", "NumPy"],
      2: ["Python", "Requests", "SQLite", "Pandas"],
      3: ["Python", "Pandas", "NumPy", "Regex"],
      4: ["Python", "Pandas", "NumPy"],
      5: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      6: ["Python", "Pandas", "Datetime (pandas)"],
      7: ["Python", "Pandas", "GroupBy"]
    };
    const id = parseInt(experiment.id, 10);
    return toolsMap[id] || ["Python", "Pandas"];
  }

  function crumb(items) {
    return '<nav class="breadcrumb">' + items.map(function (item, i) {
      const last = i === items.length - 1;
      const node = last || !item.href
        ? "<span>" + esc(item.label) + "</span>"
        : '<a href="' + esc(item.href) + '" data-link>' + (item.icon || ICON.arrowLeft) + " " + esc(item.label) + "</a>";
      return last ? node : node + '<span aria-hidden="true">/</span>';
    }).join("") + "</nav>";
  }

  function notFound() {
    return (
      '<div class="page stack">' +
        crumb([{ label: "Home", href: "#/" }, { label: "Not found" }]) +
        '<div class="card card--pad center stack">' +
          '<h1 class="sec-title">That page does not exist</h1>' +
          '<p class="sec-sub" style="margin-inline:auto">The link may be out of date, or the experiment was renamed.</p>' +
          '<div class="center"><a class="btn btn--primary" href="#/" data-link>' + ICON.arrowLeft + " Back to the laboratory</a></div>" +
        "</div>" +
      "</div>"
    );
  }

  /* ---------------------------------------------------------------------
     PAGE 1 - MAIN LABORATORY PAGE
     --------------------------------------------------------------------- */
  let addCursor = 0;   // which experiment the "+ ADD" button will open next

  /* ---- Module buttons -------------------------------------------------
     Five shortcuts sitting directly above the "Digital Laboratory"
     heading. Each one opens a dialog listing that module's PDFs with
     View (new tab) and Download actions. Content comes from the
     `modules` array in data.js. */
  function moduleBarHtml() {
    const list = window.modules || [];
    if (!list.length) return "";

    return (
      '<div class="module-bar" role="group" aria-label="Module PDFs">' +
        '<span class="module-bar__label">Modules</span>' +
        '<div class="module-bar__row">' +
          list.map(function (m, i) {
            return (
              '<button class="module-btn" type="button" data-module="' + esc(m.id) + '" ' +
                'style="animation-delay:' + Math.min(i * 45, 360) + 'ms" ' +
                'aria-label="Open PDFs for Module ' + esc(m.id) + ", " + esc(m.title) + '">' +
                '<span class="module-btn__n">M' + esc(m.id) + "</span>" +
                '<span class="module-btn__t">' + esc(m.title) + "</span>" +
              "</button>"
            );
          }).join("") +
        "</div>" +
      "</div>"
    );
  }

  /* ---- PDF dialog for one module -------------------------------------- */
  let pdfDialogTrigger = null;
  let pdfDialogKeyHandler = null;

  function closeModulePdfs() {
    const dlg = document.getElementById("pdfDialog");
    if (dlg) dlg.parentNode.removeChild(dlg);
    document.body.classList.remove("cm-open");
    if (pdfDialogKeyHandler) {
      document.removeEventListener("keydown", pdfDialogKeyHandler);
      pdfDialogKeyHandler = null;
    }
    if (pdfDialogTrigger && document.contains(pdfDialogTrigger)) pdfDialogTrigger.focus();
    pdfDialogTrigger = null;
  }

  function openModulePdfs(mod, trigger) {
    closeModulePdfs();
    pdfDialogTrigger = trigger || null;

    const pdfs = mod.pdfs || [];
    const rows = pdfs.length
      ? pdfs.map(function (p) {
          return (
            '<li class="pdf-row">' +
              '<span class="pdf-row__icon">' + ICON.doc + "</span>" +
              '<span class="pdf-row__text">' +
                "<b>" + esc(p.title) + "</b>" +
                "<i>" + esc(p.file) + "</i>" +
              "</span>" +
              '<a class="btn btn--sm pdf-row__btn" href="' + esc(p.file) + '" target="_blank" rel="noopener noreferrer" ' +
                'title="Open the PDF in a new tab">' + ICON.external + "<span>View</span></a>" +
              '<a class="btn btn--sm btn--primary pdf-row__btn" href="' + esc(p.file) + '" download="" data-pdf="' + esc(p.title) + '">' +
                ICON.download + "<span>Download</span></a>" +
            "</li>"
          );
        }).join("")
      : '<li class="pdf-row pdf-row--empty">No PDFs have been added to this module yet.</li>';

    const dlg = document.createElement("div");
    dlg.className = "pdf-dlg";
    dlg.id = "pdfDialog";
    dlg.setAttribute("role", "dialog");
    dlg.setAttribute("aria-modal", "true");
    dlg.setAttribute("aria-label", "Module " + mod.id + " PDFs");
    dlg.innerHTML =
      '<div class="pdf-dlg__box">' +
        '<div class="pdf-dlg__head">' +
          "<div class=\"pdf-dlg__intro\">" +
            '<p class="eyebrow">Module ' + esc(mod.id) + "</p>" +
            '<h3 class="pdf-dlg__title">' + esc(mod.title) + "</h3>" +
            (mod.subtitle ? '<p class="pdf-dlg__sub">' + esc(mod.subtitle) + "</p>" : "") +
          "</div>" +
          '<button class="icon-btn pdf-dlg__close" type="button" aria-label="Close module PDFs">' + ICON.close + "</button>" +
        "</div>" +
        '<ul class="pdf-list">' + rows + "</ul>" +
        '<p class="pdf-dlg__hint"><b>View</b> opens the PDF in a new tab &middot; <b>Download</b> saves it to your device.</p>' +
      "</div>";

    document.body.appendChild(dlg);
    document.body.classList.add("cm-open");

    $$("a[download]", dlg).forEach(function (link) {
      link.addEventListener("click", function () { toast("Downloading " + link.getAttribute("data-pdf")); });
    });

    $(".pdf-dlg__close", dlg).focus();

    dlg.addEventListener("click", function (event) {
      if (event.target === dlg || event.target.closest(".pdf-dlg__close")) closeModulePdfs();
    });
    pdfDialogKeyHandler = function (event) {
      if (event.key === "Escape") closeModulePdfs();
    };
    document.addEventListener("keydown", pdfDialogKeyHandler);
  }

  function wireModules() {
    $$("[data-module]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-module");
        const mod = (window.modules || []).filter(function (m) { return String(m.id) === id; })[0];
        if (mod) openModulePdfs(mod, btn);
      });
    });
  }

  function renderHome() {
    const cards = experiments
      .map(function (e, i) {
        return experimentCardHtml(e, "", i);
      })
      .join("");

    return (
      '<div class="page stack">' +

        '<section class="lab-hero" id="dashboardTop">' +
          '<div class="card univ-card">' +
            moduleBarHtml() +
            '<h2 class="univ-card__lab">' + esc(laboratory.name) + "</h2>" +
            '<p class="univ-card__code">Subject Code: <b>' + esc(labMeta.subjectCode) + "</b></p>" +
            '<p class="univ-card__addr">' + esc(laboratory.address) + "</p>" +

            '<div class="search" id="search">' +
              '<div class="search__box">' +
                '<span class="search__icon">' + ICON.search + "</span>" +
                '<input class="search__input" id="searchInput" type="search" autocomplete="off" ' +
                  'spellcheck="false" placeholder="Search Experiments..." aria-label="Search experiments" ' +
                  'role="combobox" aria-expanded="false" aria-controls="searchResults" aria-autocomplete="list">' +
                '<button class="search__clear" id="searchClear" type="button" aria-label="Clear search">' + ICON.close + "</button>" +
              "</div>" +
              '<div class="ac" id="searchResults" role="listbox" aria-label="Search suggestions"></div>' +
              '<p class="search__hint">Press <kbd>/</kbd> to search &middot; <kbd>&uarr;</kbd><kbd>&darr;</kbd> to move &middot; <kbd>Enter</kbd> to open</p>' +
            "</div>" +
          "</div>" +
          studentCardHtml({compact: true}) +
        "</section>" +

        '<section>' +
          '<div class="exp-head section-title-row">' +
            '<h2 class="exp-head__title">Modules</h2>' +
          '</div>' +
          '<div class="exp-grid">' +
            (window.modules || []).map(function(m) {
              return (
                '<article class="exp-card" data-module="' + esc(m.id) + '" tabindex="0" role="button">' +
                  '<div class="exp-card__top">' +
                    '<span class="exp-card__num">M' + esc(m.id) + '</span>' +
                    '<h3 class="exp-card__name">' + esc(m.title) + '</h3>' +
                  '</div>' +
                  '<p class="exp-card__tag">' + esc(m.subtitle || '') + '</p>' +
                  '<div class="exp-card__foot">' +
                    '<span class="chip">' + plural((m.pdfs||[]).length, 'resource') + '</span>' +
                  '</div>' +
                '</article>'
              );
            }).join('') +
          '</div>' +
        '</section>' +

        '<section id="catalogue">' +
          '<div class="exp-head section-title-row">' +
            '<h2 class="exp-head__title">Experiments: <span class="exp-head__count" id="expCount">' +
              plural(experiments.length, "experiment") + "</span></h2>" +
            '<span class="exp-head__spacer"></span>' +
            '<span class="exp-head__hint" id="addHint"></span>' +
            '<button class="btn btn--add" id="addBtn" type="button">+ ADD</button>' +
            addButtonHtml("experiments", "Add Experiment") +
          "</div>" +
          '<div class="exp-grid" id="expGrid">' + (cards || emptyStateHtml()) + "</div>" +
        '</section>' +

      "</div>"
    );
  }

  function emptyStateHtml() {
    return (
      '<div class="empty-state">' +
        ICON.search +
        "<h3>No experiments match your search</h3>" +
        '<p class="muted">Try a different keyword, or clear the search box to see all ' + plural(experiments.length, "experiment") + ".</p>" +
      "</div>"
    );
  }

  function wireHome() {
    const grid = $("#expGrid");
    const input = $("#searchInput");
    const results = $("#searchResults");
    const wrapper = $("#search");
    const addBtn = $("#addBtn");
    const addHint = $("#addHint");
    let activeIndex = -1;
    let visible = experiments.slice();

    /* ---- "+ ADD" : walks forward through the experiment list ---- */
    function addTarget() {
      return experiments[addCursor % Math.max(experiments.length, 1)];
    }

    function paintAddHint() {
      const target = addTarget();
      if (!addHint) return;
      addHint.innerHTML = target
        ? "opens <b>Experiment " + target.id + " &middot; " + esc(target.name) + "</b>"
        : "";
    }

    if (addBtn) {
      addBtn.addEventListener("click", function () {
        const target = addTarget();
        if (!target) return;
        addCursor = (addCursor + 1) % Math.max(experiments.length, 1);
        paintAddHint();
        go("#/experiment/" + target.id);
      });
      paintAddHint();
    }
    wireModules();
    $$("[data-module]").forEach(function(btn){
      btn.addEventListener("keydown", function(e){
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); }
      });
    });

    /* ---- opening a specific experiment ---- */
    function openExperiment(id) {
      addCursor = experiments.findIndex(function (e) { return String(e.id) === String(id); });
      if (addCursor < 0) addCursor = 0;
      paintAddHint();
      closeList();
      go("#/experiment/" + id);
    }

    $$("[data-exp-card]", grid).forEach(function (card) {
      card.addEventListener("click", function () { openExperiment(card.getAttribute("data-exp-card")); });
      card.addEventListener("keydown", function (event) {
        if (event.target !== card) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openExperiment(card.getAttribute("data-exp-card"));
        }
      });
    });

    /* ---- search + autocomplete ----
       Matches the experiment name first, but also the tagline, the summary
       and the part titles, so searching for a library such as "pandas" or a
       technique such as "multiindex" finds the right experiment even when
       those words never appear in its title. */
    function haystack(e) {
      if (e.__hay) return e.__hay;
      const parts = [e.name, e.tagline, e.summary, e.category, e.status, e.code];
      if (Array.isArray(e.technologies)) parts.push(e.technologies.join(" "));
      if (Array.isArray(e.tags)) parts.push(e.tags.join(" "));
      (e.sections || []).forEach(function (s) {
        parts.push(s.title);
        /* The full source is indexed too so a student can find the part that
           actually calls a library, e.g. searching "scipy" or "numpy".
           The whole corpus is only a few tens of kB, so this stays cheap. */
        if (s.code) parts.push(s.code);
        if (s.notes) parts.push(s.notes);
      });
      e.__hay = parts.join(" \u0001 ").toLowerCase();
      return e.__hay;
    }

    function matches(query) {
      const q = query.trim().toLowerCase();
      if (!q) return experiments.slice();
      return experiments.filter(function (e) {
        return haystack(e).indexOf(q) !== -1;
      });
    }

    function paintCards(query) {
      visible = matches(query);
      const q = query.trim();

      if (!visible.length) {
        grid.innerHTML = emptyStateHtml();
        $("#expCount").textContent = "0 results";
        return;
      }

      grid.innerHTML = visible
        .map(function (e) {
          return experimentCardHtml(e, q);
        })
        .join("");

      $$("[data-exp-card]", grid).forEach(function (card) {
        card.addEventListener("click", function () { openExperiment(card.getAttribute("data-exp-card")); });
        card.addEventListener("keydown", function (event) {
          if (event.target !== card) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openExperiment(card.getAttribute("data-exp-card"));
          }
        });
      });

      $("#expCount").textContent = q
        ? visible.length + " of " + experiments.length
        : plural(experiments.length, "experiment");
    }

    function closeList() {
      results.classList.remove("is-open");
      input.setAttribute("aria-expanded", "false");
      activeIndex = -1;
    }

    function paintList() {
      const q = input.value.trim();
      if (!q) return closeList();
      const found = matches(q).slice(0, 8);

      if (!found.length) {
        results.innerHTML = '<div class="ac__empty">No experiment matches &ldquo;' + esc(q) + "&rdquo;</div>";
      } else {
        results.innerHTML = found
          .map(function (e, i) {
            return (
              '<button class="ac__item" type="button" data-ac="' + e.id + '" role="option" ' +
                'aria-selected="' + (i === activeIndex) + '">' +
                '<span class="ac__num">' + e.id + "</span>" +
                '<span class="ac__name">' + highlightMatch(e.name, q) + "</span>" +
                '<span class="ac__meta">' + plural(e.sections.length, "part") + "</span>" +
              "</button>"
            );
          })
          .join("");
        $$("[data-ac]", results).forEach(function (btn) {
          btn.addEventListener("click", function () { openExperiment(btn.getAttribute("data-ac")); });
        });
      }

      results.classList.add("is-open");
      input.setAttribute("aria-expanded", "true");
      $$("[data-ac]", results).forEach(function (btn, i) {
        btn.classList.toggle("is-active", i === activeIndex);
      });
    }

    function move(delta) {
      const items = $$("[data-ac]", results);
      if (!items.length) return;
      activeIndex = (activeIndex + delta + items.length) % items.length;
      items.forEach(function (btn, i) {
        btn.classList.toggle("is-active", i === activeIndex);
        btn.setAttribute("aria-selected", i === activeIndex);
      });
      items[activeIndex].scrollIntoView({ block: "nearest" });
    }

    input.addEventListener("input", function () {
      wrapper.classList.toggle("is-filled", input.value.length > 0);
      activeIndex = -1;
      paintCards(input.value);
      paintList();
    });

    input.addEventListener("focus", function () {
      if (input.value.trim()) paintList();
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") { event.preventDefault(); move(1); }
      else if (event.key === "ArrowUp") { event.preventDefault(); move(-1); }
      else if (event.key === "Enter") {
        const items = $$("[data-ac]", results);
        if (items.length) {
          event.preventDefault();
          openExperiment(items[Math.max(activeIndex, 0)].getAttribute("data-ac"));
        }
      } else if (event.key === "Escape") {
        closeList();
        input.blur();
      }
    });

    $("#searchClear").addEventListener("click", function () {
      input.value = "";
      wrapper.classList.remove("is-filled");
      activeIndex = -1;
      paintCards("");
      closeList();
      input.focus();
    });

    document.addEventListener("click", function (event) {
      if (!wrapper.contains(event.target)) closeList();
    });

    document.addEventListener("keydown", function (event) {
      const tag = (event.target.tagName || "").toLowerCase();
      if (event.key === "/" && tag !== "input" && tag !== "textarea") {
        event.preventDefault();
        input.focus();
        input.select();
      }
      if (event.key === "Escape" && document.activeElement === input) closeList();
    });

    paintCards("");
  }

  /* ---------------------------------------------------------------------
     PAGE 2 - EXPERIMENT PREVIEW CARD
     --------------------------------------------------------------------- */
  function renderPreview(experiment) {
    return (
      '<div class="page stack">' +
        crumb([
          { label: "Home", href: "#/" },
          { label: "Experiment " + experiment.id }
        ]) +

        '<section class="split" style="display:grid;grid-template-columns:1fr;gap:clamp(18px,2.6vw,30px);align-items:start">' +
          '<div class="preview-aside">' +
            '<p class="eyebrow">Experiment ' + experiment.id + "</p>" +
            '<h1 class="preview-title"><span class="hl">' + esc(experiment.name) + "</span></h1>" +
            '<p class="sec-sub">' + esc(experiment.tagline || "") + "</p>" +
            (experiment.custom === true && experiment.summary
              ? '<p class="sec-sub" style="margin-top:10px">' + esc(experiment.summary) + "</p>"
              : "") +
            (experiment.custom === true
              ? '<div style="margin-top:16px">' + entityActionsHtml("experiments", experiment.uid, true) + "</div>"
              : "") +
            authoredNoticeHtml(experiment) +
            '<div class="meta-row">' +
              '<span class="chip chip--accent">' + plural(experiment.sections.length, "part") + "</span>" +
              '<span class="chip">' + esc(labMeta.subjectCode) + "</span>" +
              '<span class="chip">' + esc(labMeta.academicYear) + "</span>" +
            "</div>" +
            '<div>' +
              "<h3 class=\"field-label\"><span class=\"dot\"></span>Parts in this experiment</h3>" +
              '<ul class="mini-list">' + experiment.sections.map(function (s) {
                return "<li><b>" + esc(s.letter) + "</b><span>" + esc(s.title) + "</span></li>";
              }).join("") + "</ul>" +
            "</div>" +
          "</div>" +
        "</section>" +

        '<button class="overview-cta" type="button" id="overviewBtn">' +
          '<span class="overview-cta__label">' + ICON.doc +
            "<span><h2>Overview</h2>" +
            "<p>Read the full description and open any part A / B / C &hellip;</p></span>" +
          "</span>" +
          '<span class="overview-cta__arrow">' + ICON.arrowRight + "</span>" +
        "</button>" +

      "</div>"
    );
  }

  function wirePreviewPage(experiment) {
    const btn = $("#overviewBtn");
    if (btn) btn.addEventListener("click", function () { go("#/overview/" + experiment.id); });
  }

  /* ---------------------------------------------------------------------
     PAGE 3 - EXPERIMENT OVERVIEW / DETAILS
     --------------------------------------------------------------------- */
  /* Extra detail block shown only for experiments created through the form,
     so the layout of the experiments that ship with the site is untouched. */
  function customExperimentDetailsHtml(experiment) {
    if (!experiment || experiment.custom !== true) return "";

    const rows = [];
    function addRow(label, value, isLink) {
      if (!value) return;
      const dd = isLink
        ? '<a href="' + esc(value) + '" target="_blank" rel="noopener noreferrer">' + esc(value) + "</a>"
        : esc(value);
      rows.push('<div class="idcard__field"><dt>' + esc(label) + "</dt><dd>" + dd + "</dd></div>");
    }
    addRow("Experiment ID", experiment.code);
    addRow("Category", experiment.category);
    addRow("Status", experiment.status);
    addRow("Language", experiment.language);
    addRow("Created", experiment.created);
    addRow("Dataset", experiment.dataset);
    addRow("Dataset Source", experiment.datasetSource, true);
    addRow("Notebook", experiment.notebook);
    addRow("GitHub", experiment.githubLink, true);

    const blocks = [];
    if (experiment.summary) blocks.push(detailBlockHtml("Detailed Description", experiment.summary));
    if (experiment.objective) blocks.push(detailBlockHtml("Objective", experiment.objective));
    if (experiment.procedure) blocks.push(detailBlockHtml("Procedure / Implementation Steps", experiment.procedure));
    if (experiment.input) blocks.push(detailBlockHtml("Input Details", experiment.input));
    if (experiment.expected) blocks.push(detailBlockHtml("Expected Output", experiment.expected));
    if (experiment.actual) blocks.push(detailBlockHtml("Actual Output", experiment.actual));
    if (experiment.results) blocks.push(detailBlockHtml("Results / Observations", experiment.results));
    if (Array.isArray(experiment.references) && experiment.references.length) {
      blocks.push(
        '<div class="entity-block"><p class="entity-block__title">Reference Links</p>' +
          experiment.references.map(function (u) {
            return '<p><a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + esc(u) + "</a></p>";
          }).join("") +
        "</div>"
      );
    }

    const tech = Array.isArray(experiment.technologies) ? experiment.technologies : [];
    const tags = Array.isArray(experiment.tags) ? experiment.tags : [];
    const chips = tech.concat(tags).map(function (t) {
      return '<span class="chip">' + esc(t) + "</span>";
    }).join("");

    return (
      '<section class="split" style="display:grid;grid-template-columns:1fr;gap:clamp(18px,2.6vw,30px);align-items:start">' +
        '<div class="card card--pad">' +
          '<h2 class="field-label"><span class="dot"></span>Experiment details</h2>' +
          (rows.length ? '<dl class="idcard__fields" style="margin-bottom:18px">' + rows.join("") + "</dl>" : "") +
          (chips ? '<div class="tag-row" style="margin-bottom:18px">' + chips + "</div>" : "") +
          (blocks.length ? blocks.join("") : '<p class="muted">No additional details were recorded.</p>') +
        "</div>" +
      "</section>"
    );
  }

  function renderOverview(experiment) {
    const parts = experiment.sections
      .map(function (s) {
        return (
          '<button class="part" type="button" data-part="' + esc(s.id) + '" aria-label="Open section ' + esc(s.letter) + '">' +
            '<span class="part__letter">' + esc(s.letter) + "</span>" +
            '<span class="part__label">' + esc(s.title.split(" ").slice(0, 3).join(" ")) + "</span>" +
          "</button>"
        );
      })
      .join("");

    return (
      '<div class="page stack">' +
        crumb([
          { label: "Home", href: "#/" },
          { label: "Experiment " + experiment.id, href: "#/experiment/" + experiment.id },
          { label: "Overview" }
        ]) +

        '<section class="split" style="display:grid;grid-template-columns:1fr;gap:clamp(18px,2.6vw,30px);align-items:start">' +
          '<div class="card card--pad">' +
            '<h2 class="field-label"><span class="dot"></span>Tools Used</h2>' +
            '<div>' +
              (experiment.custom === true && Array.isArray(experiment.technologies) && experiment.technologies.length
                ? experiment.technologies
                : getExperimentTools(experiment)
              ).map(function(t){
                return '<span class="chip chip--accent" style="margin:4px 4px 0 0">' + esc(t) + '</span>';
              }).join('') +
            "</div>" +
          "</div>" +
        "</section>" +

        customExperimentDetailsHtml(experiment) +

        '<section class="split" style="display:grid;grid-template-columns:1fr;gap:clamp(18px,2.6vw,30px);align-items:start">' +
          '<div class="card card--pad">' +
            '<h2 class="field-label"><span class="dot"></span>At a glance</h2>' +
            '<dl class="idcard__fields" style="margin-bottom:18px">' +
              "<div class=\"idcard__field\"><dt>Subject Code</dt><dd>" + esc(labMeta.subjectCode) + "</dd></div>" +
              "<div class=\"idcard__field\"><dt>Laboratory</dt><dd>" + esc(laboratory.name) + "</dd></div>" +
              "<div class=\"idcard__field\"><dt>Experiment</dt><dd>" + experiment.id + "</dd></div>" +
              "<div class=\"idcard__field\"><dt>Sections</dt><dd>" + plural(experiment.sections.length, "part") + "</dd></div>" +
              "<div class=\"idcard__field\"><dt>Academic Year</dt><dd>" + esc(labMeta.academicYear) + "</dd></div>" +
            "</dl>" +
            "<h3 class=\"field-label\"><span class=\"dot\"></span>All sections</h3>" +
            '<ul class="mini-list">' + experiment.sections.map(function (s) {
              return "<li><b>" + esc(s.letter) + "</b><span>" + esc(s.title) + "</span></li>";
            }).join("") + "</ul>" +
            "<div style=\"margin-top:22px\">" +
              '<h3 class="field-label"><span class="dot"></span>Experiment sections &middot; ' +
                plural(experiment.sections.length, "part") + "</h3>" +
              '<div class="parts">' + parts + "</div>" +
            "</div>" +
          "</div>" +
        "</section>" +

        '<div class="pager">' +
          '<a class="btn btn--ghost" href="#/experiment/' + experiment.id + '" data-link>' + ICON.arrowLeft + " Back to preview</a>" +
          '<a class="btn btn--primary" href="#/section/' + experiment.id + "/" + experiment.sections[0].id + '" data-link>' +
            "Open part " + esc(experiment.sections[0].letter) + ICON.arrowRight +
          "</a>" +
        "</div>" +

      "</div>"
    );
  }

  function wireOverview(experiment) {
    wireAllPreviews(document);
    $$("[data-part]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        go("#/section/" + experiment.id + "/" + btn.getAttribute("data-part"));
      });
    });
  }

  /* ---------------------------------------------------------------------
     PAGE 4 - INDIVIDUAL EXPERIMENT SECTION
     --------------------------------------------------------------------- */
  function renderSection(experiment, section) {
    const siblings = experiment.sections;
    const at = siblings.indexOf(section);
    const prev = at > 0 ? siblings[at - 1] : null;
    const next = at < siblings.length - 1 ? siblings[at + 1] : null;
    const code = String(section.code || "");
    const fileName = "experiment-" + experiment.id + "-" + section.id.toLowerCase() + ".py";
    const hasVideo = !!(section.video || section.youtubeVideo);
    const hasCode = !!code;
    const notesText = String(section.notes || "").trim();

    const output = section.outputImage
      ? '<figure class="output-figure">' +
          '<h2 class="field-label"><span class="dot"></span>Output</h2>' +
          '<img src="' + esc(section.outputImage) + '" alt="Output produced by section ' + esc(section.letter) + '" loading="lazy">' +
          "<figcaption>" + esc(section.title) + "</figcaption>" +
        "</figure>"
      : "";

    return (
      '<div class="page stack section-page">' +
        crumb([
          { label: "Home", href: "#/" },
          { label: "Experiment " + experiment.id, href: "#/experiment/" + experiment.id },
          { label: "Overview", href: "#/overview/" + experiment.id },
          { label: section.letter }
        ]) +

        '<header class="section-title-row" style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">' +
          '<span class="chip chip--gold">Experiment ' + experiment.id + "</span>" +
          '<h1 class="sec-title" style="margin:0">' + esc(experiment.name) + "</h1>" +
          '<span class="exp-head__spacer"></span>' +
          '<span class="chip chip--accent" style="font-size:15px;padding:9px 16px">Part ' + esc(section.letter) + "</span>" +
        "</header>" +

        authoredNoticeHtml(experiment) +

        '<section class="split" style="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:clamp(18px,2.6vw,30px);align-items:start">' +

          /* LEFT : small part video beside the part details, then the code */
          "<div>" +
            '<div class="sec-top' + (hasVideo ? "" : " sec-top--solo") + '">' +
              (hasVideo ? sectionVideoSmallHtml(section) : "") +
              '<div class="card card--pad">' +
                '<p class="eyebrow">Experiment ' + experiment.id + " &middot; Part " + esc(section.letter) + "</p>" +
                '<h2 class="sec-title" style="font-size:clamp(19px,2.3vw,24px)">' + esc(section.title) + "</h2>" +
                '<dl class="idcard__fields" style="margin-top:14px">' +
                  '<div class="idcard__field"><dt>Experiment</dt><dd>' + experiment.id + "</dd></div>" +
                  '<div class="idcard__field"><dt>Part</dt><dd>' + esc(section.letter) + "</dd></div>" +
                  '<div class="idcard__field"><dt>Language</dt><dd>' +
                    esc(experiment.language || (experiment.custom === true ? "Not specified" : "Python")) + "</dd></div>" +
                  '<div class="idcard__field"><dt>Lines</dt><dd>' + (code ? plural(code.split("\n").length, "line") : "0") + "</dd></div>" +
                  '<div class="idcard__field"><dt>Subject</dt><dd>' + esc(labMeta.subjectCode) + "</dd></div>" +
                "</dl>" +
              "</div>" +
            "</div>" +
            (hasCode
              ? '<div>' +
                  '<h2 class="field-label"><span class="dot"></span>Code</h2>' +
                  codeViewerHtml(code, fileName) +
                  '<div class="code-runbar">' +
                    '<button class="btn btn--run" type="button" data-run-code>' + ICON.play + " Run this code</button>" +
                    '<span class="code-runbar__hint">Opens the Code Lab with this part pre-loaded</span>' +
                  "</div>" +
                "</div>"
              : (notesText
                  ? '<div class="entity-block"><p class="entity-block__title">Procedure / Notes</p><p>' + esc(notesText) + "</p></div>"
                  : "")) +
          "</div>" +

          /* RIGHT */
          '<aside class="card card--pad stack">' +
            output +
            (hasCode ? downloadsHtml(experiment, section) : "") +
            '<div>' +
              '<h3 class="field-label"><span class="dot"></span>Jump to part</h3>' +
              '<div class="parts">' + siblings.map(function (s) {
                const active = s.id === section.id;
                return '<button class="part" type="button" data-goto="' + esc(s.id) + '" ' +
                  (active ? 'style="border-color:var(--accent);box-shadow:var(--glow)"' : "") + '>' +
                  '<span class="part__letter">' + esc(s.letter) + "</span>" +
                  '<span class="part__label">' + (active ? "current" : "part " + esc(s.letter)) + "</span>" +
                "</button>";
              }).join("") + "</div>" +
            "</div>" +
          "</aside>" +

        "</section>" +

        '<div class="pager">' +
          (prev
            ? '<a class="btn btn--ghost" href="#/section/' + experiment.id + "/" + prev.id + '" data-link>' +
                ICON.arrowLeft + " Part " + esc(prev.letter) + "</a>"
            : '<a class="btn btn--ghost" href="#/overview/' + experiment.id + '" data-link>' + ICON.arrowLeft + " Overview</a>") +
          (next
            ? '<a class="btn btn--primary" href="#/section/' + experiment.id + "/" + next.id + '" data-link>' +
                "Part " + esc(next.letter) + ICON.arrowRight + "</a>"
            : '<a class="btn btn--primary" href="#/overview/' + experiment.id + '" data-link>Back to overview ' + ICON.arrowRight + "</a>") +
        "</div>" +

      "</div>"
    );
  }

  function wireSection(experiment, section) {
    try { wireVideoErrors(document); } catch (e) {}
    wireCodeViewer(document, String(section.code || ""), "experiment-" + experiment.id + "-" + section.id.toLowerCase() + ".py");

    /* "Run this code" -> Code Lab, carrying this part's source across. */
    $$("[data-run-code]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        pendingLabCode = {
          code: String(section.code || ""),
          label: "Experiment " + experiment.id + " · Part " + section.letter,
          title: section.title
        };
        go("#/codelab");
      });
    });

    $$("[data-goto]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        go("#/section/" + experiment.id + "/" + btn.getAttribute("data-goto"));
      });
    });

    /* Save the .py. Built from the same string the Code Lab runs, so the
       file on disk is byte-identical to the code shown on the page. */
    $$("[data-dl-src]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const name = "experiment-" + experiment.id + "-" + section.id.toLowerCase() + ".py";
        const header =
          "# Experiment " + experiment.id + " - Part " + section.letter + "\n" +
          "# " + section.title + "\n" +
          "# " + labMeta.subjectCode + "  " + labMeta.academicYear + "\n" +
          "#\n" +
          "# Source as shown on the Digital Laboratory site.\n\n";
        const blob = new Blob([header + String(section.code || "")], { type: "text/x-python;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        /* release the object URL once the browser has taken the file */
        setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
        toast("Downloaded " + name);
      });
    });

    if (section.outputImage) {
      const img = $(".output-figure img");
      if (img) {
        img.addEventListener("error", function () {
          img.closest(".output-figure").style.display = "none";
        });
      }
    }
  }

  /* ---------------------------------------------------------------------
     6. RENDER CONTROLLER
     --------------------------------------------------------------------- */
  function render() {
    const route = parseRoute();
    const scrollY = window.scrollY;
    let pageTitle = laboratory.name;

    closeModulePdfs();

    switch (route.name) {
      case "home":
      case "":
        view.innerHTML = renderHome();
        wireHome();
        pageTitle = laboratory.name + " - Home";
        break;

      case "modules":
        view.innerHTML = renderModulesPage();
        wireModulesPage();
        pageTitle = "Modules - " + laboratory.name;
        break;

      case "experiments":
        view.innerHTML = renderExperimentsPage();
        wireExperimentsPage();
        pageTitle = "Experiments - " + laboratory.name;
        break;

      case "tools":
        view.innerHTML = renderToolsPage();
        wireToolsPage();
        pageTitle = "Tools - " + laboratory.name;
        break;

      case "projects":
        view.innerHTML = renderProjectsPage();
        wireProjectsPage();
        pageTitle = "Projects - " + laboratory.name;
        break;

      case "profile":
      case "student":
        view.innerHTML = renderProfilePage();
        wireProfilePage();
        pageTitle = "Profile - " + laboratory.name;
        break;

      /* Legacy routes */
      case "catalogue":
        view.innerHTML = renderExperimentsPage();
        wireExperimentsPage();
        pageTitle = "Experiment Catalogue - " + laboratory.name;
        break;

      case "dashboard":
        view.innerHTML = renderHome();
        wireHome();
        pageTitle = "Dashboard - " + laboratory.name;
        break;

      case "codelab": {
        const carry = pendingLabCode;
        pageTitle = "Code Lab - " + laboratory.name;
        if (window.DSCodeLab && typeof window.DSCodeLab.mount === "function") {
          view.innerHTML = '<div id="lab2Host"></div>';
          window.DSCodeLab.mount(document.getElementById("lab2Host"), {
            code: carry ? carry.code : "",
            name: carry ? carry.label : ""
          });
          pendingLabCode = null;
        } else {
          view.innerHTML = renderCodeLab();
          wireCodeLab();
        }
        break;
      }

      case "experiment": {
        const exp = findExperiment(route.id);
        if (!exp) { view.innerHTML = notFound(); break; }
        view.innerHTML = renderPreview(exp);
        wirePreviewPage(exp);
        pageTitle = "Experiment " + exp.id + " - " + exp.name;
        break;
      }

      case "overview": {
        const exp = findExperiment(route.id);
        if (!exp) { view.innerHTML = notFound(); break; }
        view.innerHTML = renderOverview(exp);
        wireOverview(exp);
        pageTitle = "Overview - Experiment " + exp.id + " - " + exp.name;
        break;
      }

      case "section": {
        const exp = findExperiment(route.id);
        const sec = exp ? findSection(exp, route.sid) : null;
        if (!exp || !sec) { view.innerHTML = notFound(); break; }
        view.innerHTML = renderSection(exp, sec);
        wireSection(exp, sec);
        pageTitle = "Experiment " + exp.id + " (" + sec.letter + ") - " + exp.name;
        break;
      }

      default:
        view.innerHTML = notFound();
        pageTitle = "Page not found - " + laboratory.name;
    }

    document.title = pageTitle;
    paintNav();
    if (scrollY > 0) window.scrollTo({ top: 0, behavior: "auto" });
  }

  /* Scrolls a block into view once the router has swapped the DOM. */
  function scrollToBlock(selector) {
    const target = $(selector);
    if (!target) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* Highlights whichever navigation link matches the current route. */
  function paintNav() {
    const route = parseRoute();
    let active = "home";
    if (route.name === "" || route.name === "home" || route.name === "dashboard") active = "home";
    else if (route.name === "catalogue" || route.name === "experiments" || route.name === "experiment" || route.name === "overview" || route.name === "section") active = "experiments";
    else if (route.name === "modules") active = "modules";
    else if (route.name === "tools") active = "tools";
    else if (route.name === "projects") active = "projects";
    else if (route.name === "profile" || route.name === "student") active = "profile";
    else if (route.name === "codelab") active = "experiments";
    $$(".sidebar__link, .topnav__link").forEach(function (link) {
      const nav = link.getAttribute("data-nav");
      const on = nav === active;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  /* ---------------------------------------------------------------------
     7. BRANDING
     --------------------------------------------------------------------- */
  function paintBranding() {
    $$("[data-bind]").forEach(function (node) {
      const path = node.getAttribute("data-bind").split(".");
      let value = window;
      for (let i = 0; i < path.length; i++) {
        if (value == null) break;
        value = value[path[i]];
      }
      if (value != null) node.textContent = value;
    });
    if (!document.title) {
      document.title = laboratory.name;
    }
    paintSocial();
  }

  /* Renders the GitHub / LinkedIn buttons defined by `social` in data.js.
     A blank URL in data.js hides that button automatically. The same markup is
     reused by the Student Card, so links appear in both places. */
  function socialLinksHtml() {
    const cfg = window.social || {};
    const links = [];

    if (cfg.githubUrl) {
      links.push(
        '<a class="social-btn" href="' + esc(cfg.githubUrl) + '" target="_blank" rel="noopener noreferrer">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>' +
          "<span>GitHub" + (cfg.githubLabel ? "<em>" + esc(cfg.githubLabel) + "</em>" : "") + "</span>" +
        "</a>"
      );
    }

    if (cfg.linkedinUrl) {
      links.push(
        '<a class="social-btn" href="' + esc(cfg.linkedinUrl) + '" target="_blank" rel="noopener noreferrer">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05c.53-1 1.83-2.06 3.76-2.06C21.4 8.65 22 11 22 14.02V21h-4v-6.2c0-1.48-.03-3.39-2.06-3.39-2.07 0-2.39 1.61-2.39 3.28V21h-4V9Z"/></svg>' +
          "<span>LinkedIn" + (cfg.linkedinLabel ? "<em>" + esc(cfg.linkedinLabel) + "</em>" : "") + "</span>" +
        "</a>"
      );
    }

    if (cfg.email) {
      links.push(
        '<a class="social-btn" href="mailto:' + esc(cfg.email) + '">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M3 5h18v14H3V5Zm2 2v.4l7 4.6 7-4.6V7H5Zm14 2.7-6.4 4.2a1 1 0 0 1-1.2 0L5 9.7V17h14V9.7Z"/></svg>' +
          "<span>Email<em>" + esc(cfg.email) + "</em></span>" +
        "</a>"
      );
    }

    return links.join("");
  }

  function paintSocial() {
    const host = $("#footerSocial");
    if (!host) return;
    host.innerHTML = socialLinksHtml();
    host.hidden = !host.innerHTML;
  }

  /* ---------------------------------------------------------------------
     8. BOOT
     --------------------------------------------------------------------- */
  /* Add / edit / delete controls live inside cards whose own click handler
     opens the item, so they are handled in the capture phase to stop the
     card's handler from also firing. */
  document.addEventListener("click", function (event) {
    const action = event.target.closest("[data-entity-action]");
    if (action) {
      event.preventDefault();
      event.stopPropagation();
      const kind = action.getAttribute("data-entity-action");
      const uid = action.getAttribute("data-entity-uid");
      const op = action.getAttribute("data-entity-op");
      if (op === "edit") editCustomItem(kind, uid, action);
      else if (op === "delete") deleteCustomItem(kind, uid);
      return;
    }
    const add = event.target.closest("[data-add-entity]");
    if (add) {
      event.preventDefault();
      openEntityForm(add.getAttribute("data-add-entity"), null, add);
    }
  }, true);

  document.addEventListener("click", function (event) {
    const editBtn = event.target.closest("#editCardBtn");
    if (editBtn) {
      event.preventDefault();
      openCardEditor(editBtn);
      return;
    }
    const profilePhoto = event.target.closest("#profilePhotoBtn");
    if (profilePhoto) {
      event.preventDefault();
      const cfg = window.social || {};
      if (cfg.linkedinUrl) {
        window.open(cfg.linkedinUrl, "_blank", "noopener,noreferrer");
      } else {
        toast("LinkedIn URL not configured in assets/js/data.js");
      }
      return;
    }
    const link = event.target.closest("a[data-link]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return;
    event.preventDefault();
    go(href);
  });

  window.addEventListener("hashchange", render);

  /* Keeps --topbar-h equal to the real rendered height of the sticky top bar,
     so scroll-padding-top can never drift out of sync with the layout (it
     changes as the nav wraps onto more lines on narrow screens). */
  function syncTopbarHeight() {
    const bar = $(".topbar");
    if (!bar) return;
    const h = Math.round(bar.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty("--topbar-h", h + "px");
  }
  window.addEventListener("resize", syncTopbarHeight);
  window.addEventListener("load", syncTopbarHeight);

  /* ---------------------------------------------------------------------
     ADJUSTABLE SIDEBAR
     The 3-bar button opens/closes the navigation. On desktop the sidebar
     collapses in place; on small screens it slides in as an off-canvas
     drawer with a scrim. The drawer always starts closed on small screens
     and open on large ones, and follows window resizes across the
     940px breakpoint.
     --------------------------------------------------------------------- */
  function setupSidebarToggle() {
    const aside = $(".sidebar");
    const btn = $("[data-sidebar-toggle]");
    const scrim = $(".sidebar-scrim");
    if (!aside) return;
    const mq = window.matchMedia("(max-width: 940px)");
    let open = !mq.matches;

    function applyState() {
      document.body.classList.toggle("sidebar-menu-open", open);
      document.body.classList.toggle("sidebar-collapsed", !open);
      aside.classList.toggle("is-open", open);
      aside.setAttribute("aria-hidden", open ? "false" : "true");
      if (btn) {
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      }
    }

    function openMenu() {
      if (open) return;
      open = true;
      applyState();
      const first = aside.querySelector("a[data-link]");
      if (mq.matches && first) first.focus();
    }

    function closeMenu() {
      if (!open) return;
      open = false;
      applyState();
      if (mq.matches && btn && document.contains(btn)) btn.focus();
    }

    if (btn) btn.addEventListener("click", function () { open ? closeMenu() : openMenu(); });
    if (scrim) scrim.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    aside.addEventListener("click", function (e) {
      if (mq.matches && e.target.closest("a[data-link]")) closeMenu();
    });

    const onBreakpoint = function (ev) { open = !ev.matches; applyState(); };
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onBreakpoint);
    else if (typeof mq.addListener === "function") mq.addListener(onBreakpoint);

    applyState();
  }

  function renderModulesPage() {
    return (
      '<div class="page stack">' +
        crumb([{ label: "Home", href: "#/" }, { label: "Modules" }]) +
        '<section>' +
          '<div class="exp-head section-title-row">' +
            '<h2 class="exp-head__title">Modules</h2>' +
          '</div>' +
          '<div class="exp-grid">' +
            (window.modules || []).map(function(m) {
              return (
                '<article class="exp-card card--hover" data-module="' + esc(m.id) + '" tabindex="0" role="button">' +
                  '<div class="exp-card__top">' +
                    '<span class="exp-card__num">M' + esc(m.id) + '</span>' +
                    '<h3 class="exp-card__name">' + esc(m.title) + '</h3>' +
                  '</div>' +
                  '<p class="exp-card__tag">' + esc(m.subtitle || '') + '</p>' +
                  '<div class="exp-card__foot">' +
                    '<span class="chip">' + plural((m.pdfs||[]).length, 'resource') + '</span>' +
                  '</div>' +
                '</article>'
              );
            }).join('') +
          '</div>' +
        '</section>' +
      '</div>'
    );
  }

  function wireModulesPage() {
    wireModules();
    $$("[data-module]").forEach(function(btn) {
      btn.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  function renderExperimentsPage() {
    const cards = experiments.map(function(e, i) {
      return experimentCardHtml(e, "", i);
    }).join('');
    return (
      '<div class="page stack">' +
        crumb([{ label: "Home", href: "#/" }, { label: "Experiments" }]) +
        '<section>' +
          '<div class="exp-head section-title-row">' +
            '<h2 class="exp-head__title">Experiments <span class="exp-head__count">' +
              plural(experiments.length, 'experiment') + '</span></h2>' +
            '<span class="exp-head__spacer"></span>' +
            addButtonHtml("experiments", "Add Experiment") +
          '</div>' +
          '<div class="exp-grid" id="expGridPage">' + (cards || emptyExperimentsHtml()) + '</div>' +
        '</section>' +
      '</div>'
    );
  }

  function wireExperimentsPage() {
    $$("#expGridPage [data-exp-card]").forEach(function(card) {
      card.addEventListener("click", function(){ openExperiment(card.getAttribute("data-exp-card")); });
      card.addEventListener("keydown", function(e){
        if (e.target !== card) return;
        if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openExperiment(card.getAttribute("data-exp-card")); }
      });
    });
  }

  function renderToolsPage() {
    const list = contentList("tools");
    const cards = list.map(function(t){ return toolCardHtml(t); }).join('');
    return (
      '<div class="page stack">' +
        crumb([{ label: "Home", href: "#/" }, { label: "Tools" }]) +
        '<section>' +
          '<div class="exp-head section-title-row">' +
            '<h2 class="exp-head__title">Tools &amp; Technologies <span class="exp-head__count">' +
              plural(list.length, "tool") + '</span></h2>' +
            '<span class="exp-head__spacer"></span>' +
            addButtonHtml("tools", "Add Tool") +
          '</div>' +
          '<div class="exp-grid" id="toolsGrid">' + (cards || emptyToolsHtml()) + '</div>' +
        '</section>' +
      '</div>'
    );
  }

  function wireToolsPage() {
    $$("#toolsGrid .entity-details").forEach(function(node){
      node.addEventListener("toggle", function(){ /* native disclosure, nothing to wire */ });
    });
  }

  function renderProjectsPage() {
    /* Content comes from the `projects` array in assets/js/data.js, plus
       any projects created through the Add Project form (localStorage). */
    const list = contentList("projects");
    const cards = list.map(function(p){ return projectCardHtml(p); }).join('');
    return (
      '<div class="page stack">' +
        crumb([{ label: "Home", href: "#/" }, { label: "Projects" }]) +
        '<section>' +
          '<div class="exp-head section-title-row">' +
            '<h2 class="exp-head__title">Projects Showcase <span class="exp-head__count">' +
              plural(list.length, "project") + '</span></h2>' +
            '<span class="exp-head__spacer"></span>' +
            addButtonHtml("projects", "Add Project") +
          '</div>' +
          (list.length
            ? '<div class="exp-grid" id="projectsGrid">' + cards + '</div>'
            : emptyProjectsHtml()) +
        '</section>' +
      '</div>'
    );
  }

  function wireProjectsPage() {
    /* Hide a broken thumbnail rather than leaving a broken-image icon. */
    $$("#projectsGrid .project-thumb").forEach(function(img){
      img.addEventListener("error", function(){ img.style.display = "none"; });
    });
  }

  function renderProfilePage() {
    return (
      '<div class="page stack">' +
        crumb([{ label: "Home", href: "#/" }, { label: "Profile" }]) +
        '<section class="center" style="display:flex;justify-content:center">' +
          studentCardHtml({compact: false}) +
        '</section>' +
      '</div>'
    );
  }

  function wireProfilePage() {
    const photo = document.getElementById("profilePhotoBtn");
    if (photo) {
      photo.style.cursor = "pointer";
    }
  }

  /* Router-level opener used by the dedicated Experiments page. `paintAddHint`
     and `closeList` live inside wireHome() (they touch home-only DOM), so they
     are only reachable while Home is mounted. Guard them: referencing a missing
     identifier through typeof never throws. */
  function openExperiment(id) {
    const at = experiments.findIndex(function (e) { return String(e.id) === String(id); });
    addCursor = at < 0 ? 0 : at;
    if (typeof paintAddHint === "function") paintAddHint();
    if (typeof closeList === "function") closeList();
    go("#/experiment/" + id);
  }

  restoreStudentCard();
  loadContent();
  paintBranding();
  setupSidebarToggle();
  render();
  syncTopbarHeight();
})();