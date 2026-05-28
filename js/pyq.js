/**
 * pyq.js - Logic for sorting and searching exam papers
 * Mirrors functionality from papers.codechefvit.com
 */

let PAPER_DATABASE = [
    { id: 1, code: "CSE1001", title: "Problem Solving & Programming", exam: "CAT 1", year: 2023, slot: "A1", link: "#", dept: "SCOPE" },
    { id: 2, code: "MAT2001", title: "Statistics for Engineers", exam: "FAT", year: 2022, slot: "B2", link: "#", dept: "SAS" },
    { id: 3, code: "CSE1002", title: "Data Structures & Algorithms", exam: "CAT 2", year: 2023, slot: "C1", link: "#", dept: "SCOPE" },
    { id: 4, code: "PHY1701", title: "Engineering Physics", exam: "FAT", year: 2021, slot: "D2", link: "#", dept: "SAS" },
    { id: 5, code: "CHY1701", title: "Engineering Chemistry", exam: "CAT 1", year: 2023, slot: "E1", link: "#", dept: "SAS" },
    { id: 6, code: "ECE2002", title: "Digital Logic Design", exam: "CAT 1", year: 2022, slot: "D1", link: "#", dept: "SENSE" }
];

let searchTimeout;

function renderPapers(immediate = false) {
    // Debounce logic for 3000+ items
    if (!immediate) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => renderPapers(true), 150);
        return;
    }

    const grid = document.getElementById('paperGrid');
    const searchEl = document.getElementById('paperSearch');
    if (!grid || !searchEl) return;

    const query = searchEl.value.toLowerCase();
    const examFilter = document.getElementById('examFilter')?.value || 'all';
    const deptFilter = document.getElementById('deptFilter')?.value || 'all';
    const sortOrder = document.getElementById('sortOrder')?.value || 'desc';

    // 1. Filter Logic
    let filtered = PAPER_DATABASE.filter(p => {
        // Using pre-calculated search string for performance
        const matchesSearch = !query || (p._searchStr && p._searchStr.includes(query));
        const matchesExam = examFilter === 'all' || p.exam === examFilter;
        const matchesDept = deptFilter === 'all' || p.dept === deptFilter;
        return matchesSearch && matchesExam && matchesDept;
    });

    // 2. Sorting Logic (Year-based)
    filtered.sort((a, b) => {
        return sortOrder === 'desc' ? b.year - a.year : a.year - b.year;
    });

    // 3. HTML Generation
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--dim);">No papers found matching your criteria.</div>';
        return;
    }

    // Optimized rendering: Only show first 50 results initially to keep UI fast
    const displaySet = filtered.slice(0, 50);

    grid.innerHTML = displaySet.map(p => `
        <div class="paper-card reveal visible">
            <span class="p-tag ${p.exam === 'FAT' ? 'tag-fat' : 'tag-cat'}">${p.exam}</span>
            <div style="font-weight: 800; font-family: 'Syne'; font-size: 1.1rem; margin-bottom: 0.5rem;">${p.code}</div>
            <div style="font-size: 0.9rem; color: var(--dim); margin-bottom: 1rem; min-height: 2.5rem;">${p.title}</div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--white); opacity: 0.6; border-top: 1px solid var(--gb); padding-top: 1rem;">
                <span>📅 ${p.year}</span>
                <span>⏱️ Slot: ${p.slot}</span>
            </div>
            <div style="display:flex; gap:10px; margin-top:1rem;">
                <button onclick="openPreview('${p.link}', '${p.code}')" class="btn-download" style="background:rgba(255,255,255,0.05); border:1px solid var(--gb); flex:1; margin-top:0;">Preview</button>
                <a href="${p.link}" class="btn-download" style="flex:1; margin-top:0;">Download</a>
            </div>
        </div>
    `).join('');
}

function openPreview(link, code) {
    const modal = document.getElementById('previewModal');
    const frame = document.getElementById('previewFrame');
    const title = document.getElementById('previewTitle');
    
    if(!modal || !frame) return;
    
    title.textContent = `Preview: ${code}`;
    frame.src = link;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    const frame = document.getElementById('previewFrame');
    
    if(!modal || !frame) return;
    
    modal.classList.remove('open');
    frame.src = '';
    document.body.style.overflow = '';
}

// Initialize Listeners
document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('paperSearch');
    const exam = document.getElementById('examFilter');
    const dept = document.getElementById('deptFilter');
    const sort = document.getElementById('sortOrder');

    [search, exam, dept, sort].forEach(el => {
        if (el) el.addEventListener('input', renderPapers);
    });

    // Initial render
    renderPapers();

    // Mock data fetch (In real scenario, fetch from your data/pyq-database.json)
    fetch('./data/pyq-database.json')
        .then(res => res.json())
        .then(data => {
            // Pre-calculate search strings to avoid toLowerCase() inside the filter loop
            PAPER_DATABASE = data.map(p => ({
                ...p,
                _searchStr: `${p.code} ${p.title}`.toLowerCase()
            }));
            renderPapers(true);
        })
        .catch(() => {
            console.warn("Using local mock data for PYQs.");
            renderPapers();
        });
});

window.openPreview = openPreview;
window.closePreview = closePreview;