/* =============================================
   Marketing Calendar — App Logic
   ============================================= */

(function () {
    'use strict';

    // =============================================
    // Constants & Config
    // =============================================

    const STORAGE_KEY = 'marketcal_campaigns';
    const MONTHS_TH = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const CHANNEL_LABELS = {
        social: 'Social Media',
        email: 'Email',
        ads: 'Ads',
        content: 'Content',
        event: 'Event',
        seo: 'SEO'
    };

    const CHANNEL_COLORS = {
        social: '#6366f1',
        email: '#f97316',
        ads: '#f43f5e',
        content: '#22c55e',
        event: '#8b5cf6',
        seo: '#06b6d4'
    };

    const STATUS_LABELS = {
        'planned': 'วางแผน',
        'in-progress': 'กำลังดำเนินการ',
        'completed': 'เสร็จสิ้น',
        'cancelled': 'ยกเลิก'
    };

    // =============================================
    // State
    // =============================================

    let campaigns = [];
    let currentDate = new Date();
    let currentView = 'calendar';
    let calView = 'month';
    let editingId = null;
    let activeFilters = {
        channels: ['social', 'email', 'ads', 'content', 'event', 'seo'],
        statuses: ['planned', 'in-progress', 'completed', 'cancelled']
    };

    // Online Sync State
    const SYNC_BUCKET = '6Y7y31uR82m9zTdx2cQ9x6';
    let syncSpaceId = null;
    let syncTimer = null;

    // =============================================
    // DOM References
    // =============================================

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const calendarGrid = $('#calendarGrid');
    const currentMonthYear = $('#currentMonthYear');
    const campaignModal = $('#campaignModal');
    const campaignForm = $('#campaignForm');
    const toastContainer = $('#toastContainer');
    const searchInput = $('#searchInput');
    const detailPopup = $('#detailPopup');

    // =============================================
    // Storage
    // =============================================

    function loadCampaigns() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            campaigns = data ? JSON.parse(data) : [];
            if (!data) saveCampaigns();
        } catch (e) {
            campaigns = [];
            saveCampaigns();
        }
    }

    function saveCampaigns() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
        if (syncSpaceId) {
            syncToCloud();
        }
    }

    async function syncToCloud() {
        if (!syncSpaceId) return;
        try {
            const res = await fetch(`https://kvdb.io/${SYNC_BUCKET}/cal_${syncSpaceId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaigns)
            });
            if (!res.ok) throw new Error('Cloud sync failed');
        } catch (e) {
            console.error('Error syncing to cloud:', e);
            showToast('เชื่อมต่อคลาวด์ล้มเหลว', 'error');
        }
    }

    async function syncFromCloud(silent = false) {
        if (!syncSpaceId) return;
        try {
            const res = await fetch(`https://kvdb.io/${SYNC_BUCKET}/cal_${syncSpaceId}`);
            if (res.status === 404) {
                // If remote doesn't exist, write current state
                await syncToCloud();
                return;
            }
            if (!res.ok) throw new Error('Could not pull from cloud');
            const data = await res.json();
            if (Array.isArray(data)) {
                const localStr = JSON.stringify(campaigns);
                const remoteStr = JSON.stringify(data);
                if (localStr !== remoteStr) {
                    campaigns = data;
                    localStorage.setItem(STORAGE_KEY, remoteStr);
                    refreshCurrentView();
                    if (!silent) showToast('ซิงค์ข้อมูลจากคลาวด์แล้ว ✓');
                }
            }
        } catch (e) {
            console.error('Error fetching from cloud:', e);
            if (!silent) showToast('ไม่สามารถดึงข้อมูลจากออนไลน์ได้', 'error');
        }
    }

    function getSampleCampaigns() {
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth();

        return [
            {
                id: generateId(),
                name: 'Summer Sale 2026',
                startDate: formatDate(new Date(y, m, 5)),
                endDate: formatDate(new Date(y, m, 12)),
                channel: 'ads',
                status: 'in-progress',
                budget: 150000,
                description: 'โปรโมชั่นลดราคาสินค้าช่วงซัมเมอร์ ทุกช่องทางออนไลน์',
                color: '#f43f5e'
            },
            {
                id: generateId(),
                name: 'Monthly Newsletter',
                startDate: formatDate(new Date(y, m, 1)),
                endDate: formatDate(new Date(y, m, 1)),
                channel: 'email',
                status: 'completed',
                budget: 5000,
                description: 'จดหมายข่าวรายเดือนส่งถึงสมาชิกทุกคน',
                color: '#f97316'
            },
            {
                id: generateId(),
                name: 'Instagram Reels Campaign',
                startDate: formatDate(new Date(y, m, 10)),
                endDate: formatDate(new Date(y, m, 25)),
                channel: 'social',
                status: 'in-progress',
                budget: 80000,
                description: 'สร้าง Reels สั้น ๆ เพื่อเพิ่ม engagement และ reach ใน Instagram',
                color: '#6366f1'
            },
            {
                id: generateId(),
                name: 'SEO Blog Series',
                startDate: formatDate(new Date(y, m, 8)),
                endDate: formatDate(new Date(y, m, 30)),
                channel: 'content',
                status: 'planned',
                budget: 25000,
                description: 'เขียนบทความ SEO เป็นซีรีส์ 8 ตอน เพื่อเพิ่ม organic traffic',
                color: '#22c55e'
            },
            {
                id: generateId(),
                name: 'Product Launch Webinar',
                startDate: formatDate(new Date(y, m, 20)),
                endDate: formatDate(new Date(y, m, 20)),
                channel: 'event',
                status: 'planned',
                budget: 30000,
                description: 'จัดอีเวนต์ออนไลน์เปิดตัวสินค้าใหม่',
                color: '#8b5cf6'
            },
            {
                id: generateId(),
                name: 'Google Ads Optimization',
                startDate: formatDate(new Date(y, m, 15)),
                endDate: formatDate(new Date(y, m + 1, 15)),
                channel: 'seo',
                status: 'planned',
                budget: 200000,
                description: 'ปรับปรุงและ optimize Google Ads campaigns',
                color: '#06b6d4'
            },
            {
                id: generateId(),
                name: 'Customer Survey Email',
                startDate: formatDate(new Date(y, m + 1, 1)),
                endDate: formatDate(new Date(y, m + 1, 7)),
                channel: 'email',
                status: 'planned',
                budget: 3000,
                description: 'ส่งแบบสำรวจความพึงพอใจลูกค้า',
                color: '#f97316'
            }
        ];
    }

    // =============================================
    // Utilities
    // =============================================

    function generateId() {
        return 'camp_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }

    function formatDate(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    function parseDate(str) {
        const [y, m, d] = str.split('-').map(Number);
        return new Date(y, m - 1, d);
    }

    function formatDisplayDate(str) {
        const d = parseDate(str);
        return `${d.getDate()} ${MONTHS_TH[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
    }

    function formatBudget(num) {
        if (!num) return '-';
        return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(num);
    }

    function isSameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    }

    function getFilteredCampaigns() {
        return campaigns.filter(c =>
            activeFilters.channels.includes(c.channel) &&
            activeFilters.statuses.includes(c.status)
        );
    }

    // =============================================
    // Toast Notifications
    // =============================================

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-message">${message}</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // =============================================
    // Navigation
    // =============================================

    function switchView(view) {
        currentView = view;

        $$('.nav-item').forEach(btn => btn.classList.remove('active'));
        $(`[data-view="${view}"]`).classList.add('active');

        $$('.view-section').forEach(section => section.classList.remove('active'));
        $(`#${view}View`).classList.add('active');

        if (view === 'dashboard') renderDashboard();
        if (view === 'campaigns') renderCampaignsList();
        if (view === 'calendar') renderCalendar();
    }

    // =============================================
    // Calendar Rendering
    // =============================================

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        currentMonthYear.textContent = `${MONTHS_TH[month]} ${year}`;

        if (calView === 'month') {
            renderMonthView(year, month);
        } else {
            renderWeekView();
        }
    }

    function renderMonthView(year, month) {
        calendarGrid.innerHTML = '';
        calendarGrid.className = 'calendar-grid';

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrev = new Date(year, month, 0).getDate();
        const today = new Date();

        const filtered = getFilteredCampaigns();
        const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-day';

            let cellDate;
            let dayNum;

            if (i < firstDay) {
                dayNum = daysInPrev - firstDay + i + 1;
                cellDate = new Date(year, month - 1, dayNum);
                cell.classList.add('outside');
            } else if (i >= firstDay + daysInMonth) {
                dayNum = i - firstDay - daysInMonth + 1;
                cellDate = new Date(year, month + 1, dayNum);
                cell.classList.add('outside');
            } else {
                dayNum = i - firstDay + 1;
                cellDate = new Date(year, month, dayNum);

                if (isSameDay(cellDate, today)) {
                    cell.classList.add('today');
                }
            }

            const numEl = document.createElement('div');
            numEl.className = 'day-number';
            numEl.textContent = dayNum;
            cell.appendChild(numEl);

            // Add events for this day
            const dayEvents = document.createElement('div');
            dayEvents.className = 'day-events';

            const eventsOnDay = filtered.filter(c => {
                const start = parseDate(c.startDate);
                const end = parseDate(c.endDate);
                return cellDate >= start && cellDate <= end;
            });

            const MAX_VISIBLE = 3;
            const visibleEvents = eventsOnDay.slice(0, MAX_VISIBLE);

            visibleEvents.forEach(c => {
                const eventEl = document.createElement('div');
                eventEl.className = 'day-event';
                eventEl.style.background = c.color || CHANNEL_COLORS[c.channel];
                eventEl.textContent = c.name;

                const start = parseDate(c.startDate);
                const end = parseDate(c.endDate);
                const isStart = isSameDay(cellDate, start);
                const isEnd = isSameDay(cellDate, end);

                if (isStart && isEnd) {
                    eventEl.classList.add('single');
                } else if (isStart) {
                    eventEl.classList.add('start');
                } else if (isEnd) {
                    eventEl.classList.add('end');
                } else {
                    eventEl.classList.add('middle');
                    eventEl.textContent = '';
                }

                eventEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showCampaignDetail(c.id);
                });

                dayEvents.appendChild(eventEl);
            });

            if (eventsOnDay.length > MAX_VISIBLE) {
                const moreEl = document.createElement('div');
                moreEl.className = 'day-more';
                moreEl.textContent = `+${eventsOnDay.length - MAX_VISIBLE} เพิ่มเติม`;
                dayEvents.appendChild(moreEl);
            }

            cell.appendChild(dayEvents);

            // Click on empty space to add new campaign
            cell.addEventListener('click', () => {
                openModal(null, formatDate(cellDate));
            });

            calendarGrid.appendChild(cell);
        }
    }

    function renderWeekView() {
        calendarGrid.innerHTML = '';
        calendarGrid.className = 'calendar-grid week-view';

        const today = new Date();
        const startOfWeek = new Date(currentDate);
        const dayOfWeek = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

        const filtered = getFilteredCampaigns();

        for (let i = 0; i < 7; i++) {
            const cellDate = new Date(startOfWeek);
            cellDate.setDate(startOfWeek.getDate() + i);

            const cell = document.createElement('div');
            cell.className = 'calendar-day';
            cell.style.minHeight = '200px';

            if (isSameDay(cellDate, today)) {
                cell.classList.add('today');
            }

            const numEl = document.createElement('div');
            numEl.className = 'day-number';
            numEl.textContent = cellDate.getDate();
            cell.appendChild(numEl);

            const dayEvents = document.createElement('div');
            dayEvents.className = 'day-events';

            const eventsOnDay = filtered.filter(c => {
                const start = parseDate(c.startDate);
                const end = parseDate(c.endDate);
                return cellDate >= start && cellDate <= end;
            });

            eventsOnDay.forEach(c => {
                const eventEl = document.createElement('div');
                eventEl.className = 'day-event single';
                eventEl.style.background = c.color || CHANNEL_COLORS[c.channel];
                eventEl.textContent = c.name;
                eventEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showCampaignDetail(c.id);
                });
                dayEvents.appendChild(eventEl);
            });

            cell.appendChild(dayEvents);

            cell.addEventListener('click', () => {
                openModal(null, formatDate(cellDate));
            });

            calendarGrid.appendChild(cell);
        }

        // Update header to show week range
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        currentMonthYear.textContent = `${startOfWeek.getDate()} ${MONTHS_TH[startOfWeek.getMonth()].slice(0, 3)} - ${endOfWeek.getDate()} ${MONTHS_TH[endOfWeek.getMonth()].slice(0, 3)} ${endOfWeek.getFullYear()}`;
    }

    // =============================================
    // Dashboard
    // =============================================

    function renderDashboard() {
        const all = campaigns;

        // Stats
        const total = all.length;
        const planned = all.filter(c => c.status === 'planned').length;
        const inProgress = all.filter(c => c.status === 'in-progress').length;
        const completed = all.filter(c => c.status === 'completed').length;

        animateCounter($('#statTotal .stat-number'), total);
        animateCounter($('#statPlanned .stat-number'), planned);
        animateCounter($('#statInProgress .stat-number'), inProgress);
        animateCounter($('#statCompleted .stat-number'), completed);

        // Channel Breakdown
        renderChannelChart(all);

        // Upcoming
        renderUpcomingList(all);

        // Timeline
        renderTimeline(all);
    }

    function animateCounter(el, target) {
        const start = parseInt(el.textContent) || 0;
        const duration = 600;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(start + (target - start) * eased);
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    function renderChannelChart(all) {
        const container = $('#channelChart');
        container.innerHTML = '';

        const counts = {};
        Object.keys(CHANNEL_LABELS).forEach(ch => counts[ch] = 0);
        all.forEach(c => counts[c.channel] = (counts[c.channel] || 0) + 1);

        const max = Math.max(...Object.values(counts), 1);

        Object.entries(counts).forEach(([ch, count]) => {
            const row = document.createElement('div');
            row.className = 'chart-bar-row';

            const pct = (count / max) * 100;

            row.innerHTML = `
                <span class="chart-label">${CHANNEL_LABELS[ch]}</span>
                <div class="chart-bar-track">
                    <div class="chart-bar-fill" style="width: ${pct}%; background: ${CHANNEL_COLORS[ch]}">
                        ${count > 0 ? '' : ''}
                    </div>
                </div>
                <span class="chart-count">${count}</span>
            `;

            container.appendChild(row);

            // Animate bar
            requestAnimationFrame(() => {
                const bar = row.querySelector('.chart-bar-fill');
                bar.style.width = '0%';
                requestAnimationFrame(() => {
                    bar.style.width = `${pct}%`;
                });
            });
        });
    }

    function renderUpcomingList(all) {
        const container = $('#upcomingList');
        container.innerHTML = '';

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = all
            .filter(c => parseDate(c.endDate) >= today && c.status !== 'cancelled')
            .sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate))
            .slice(0, 8);

        if (upcoming.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <p>ไม่มีแคมเปญที่จะมาถึง</p>
                </div>
            `;
            return;
        }

        upcoming.forEach(c => {
            const item = document.createElement('div');
            item.className = 'upcoming-item';
            item.innerHTML = `
                <div class="upcoming-color" style="background: ${c.color || CHANNEL_COLORS[c.channel]}"></div>
                <div class="upcoming-info">
                    <div class="upcoming-name">${c.name}</div>
                    <div class="upcoming-date">${formatDisplayDate(c.startDate)} — ${formatDisplayDate(c.endDate)}</div>
                </div>
                <span class="upcoming-channel-tag" style="background: ${CHANNEL_COLORS[c.channel]}20; color: ${CHANNEL_COLORS[c.channel]}">${CHANNEL_LABELS[c.channel]}</span>
            `;
            item.addEventListener('click', () => showCampaignDetail(c.id));
            container.appendChild(item);
        });
    }

    function renderTimeline(all) {
        const container = $('#monthlyTimeline');
        container.innerHTML = '';

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dayCounts = new Array(daysInMonth).fill(0);

        all.forEach(c => {
            const start = parseDate(c.startDate);
            const end = parseDate(c.endDate);

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                if (d.getFullYear() === year && d.getMonth() === month) {
                    dayCounts[d.getDate() - 1]++;
                }
            }
        });

        const maxCount = Math.max(...dayCounts, 1);

        for (let i = 0; i < daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'timeline-day';

            const height = (dayCounts[i] / maxCount) * 80;
            const hue = 240 + (dayCounts[i] / maxCount) * 60;

            day.innerHTML = `
                <div class="timeline-bar" style="height: ${Math.max(height, 4)}px; background: hsl(${hue}, 80%, 65%); opacity: ${dayCounts[i] > 0 ? 1 : 0.2}"></div>
                ${(i + 1) % 5 === 0 || i === 0 ? `<span class="timeline-label">${i + 1}</span>` : ''}
            `;

            container.appendChild(day);
        }
    }

    // =============================================
    // Campaigns List
    // =============================================

    function renderCampaignsList(query = '') {
        const container = $('#campaignsList');
        container.innerHTML = '';

        let filtered = getFilteredCampaigns();

        if (query) {
            const q = query.toLowerCase();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.description.toLowerCase().includes(q) ||
                CHANNEL_LABELS[c.channel].toLowerCase().includes(q)
            );
        }

        filtered.sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    <p>${query ? 'ไม่พบแคมเปญที่ตรงกัน' : 'ยังไม่มีแคมเปญ — เพิ่มแคมเปญใหม่เลย!'}</p>
                </div>
            `;
            return;
        }

        filtered.forEach(c => {
            const row = document.createElement('div');
            row.className = 'campaign-row';
            row.innerHTML = `
                <div class="campaign-color-bar" style="background: ${c.color || CHANNEL_COLORS[c.channel]}"></div>
                <div class="campaign-name-cell">
                    <h4>${c.name}</h4>
                    <p>${c.description || ''}</p>
                </div>
                <div class="campaign-channel-cell">
                    <span class="campaign-channel-dot" style="background: ${CHANNEL_COLORS[c.channel]}"></span>
                    ${CHANNEL_LABELS[c.channel]}
                </div>
                <div class="campaign-date-cell">${formatDisplayDate(c.startDate)}</div>
                <div class="campaign-budget-cell">${formatBudget(c.budget)}</div>
                <div class="campaign-status-cell">
                    <span class="status-badge ${c.status}">${STATUS_LABELS[c.status]}</span>
                </div>
            `;
            row.addEventListener('click', () => showCampaignDetail(c.id));
            container.appendChild(row);
        });
    }

    // =============================================
    // Campaign Detail Popup
    // =============================================

    function showCampaignDetail(id) {
        const c = campaigns.find(x => x.id === id);
        if (!c) return;

        $('#detailChannel').textContent = CHANNEL_LABELS[c.channel];
        $('#detailChannel').style.background = `${CHANNEL_COLORS[c.channel]}20`;
        $('#detailChannel').style.color = CHANNEL_COLORS[c.channel];

        $('#detailName').textContent = c.name;
        $('#detailDates').textContent = `${formatDisplayDate(c.startDate)} — ${formatDisplayDate(c.endDate)}`;
        $('#detailStatus').innerHTML = `<span class="status-badge ${c.status}">${STATUS_LABELS[c.status]}</span>`;

        $('#detailBudget').textContent = c.budget ? `งบประมาณ: ${formatBudget(c.budget)}` : '';
        $('#detailDescription').textContent = c.description || 'ไม่มีรายละเอียด';

        // Render content posting details
        const infoEl = $('#detailContentInfo');
        infoEl.innerHTML = '';
        if ((c.platforms && c.platforms.length) || c.contentType || c.contentStatus || c.caption || c.hashtags) {
            let html = `<div class="detail-content-section-title">ข้อมูลการโพสต์คอนเทนต์</div>`;
            
            if (c.platforms && c.platforms.length) {
                html += `<div class="detail-platforms">`;
                c.platforms.forEach(p => {
                    const platformLabels = {
                        facebook: '📘 Facebook',
                        instagram: '📸 Instagram',
                        tiktok: '🎵 TikTok',
                        'x-twitter': '𝕏 X / Twitter',
                        line: '💬 LINE OA',
                        youtube: '▶️ YouTube',
                        website: '🌐 Website',
                        threads: '🔗 Threads'
                    };
                    html += `<span class="detail-platform-tag">${platformLabels[p] || p}</span>`;
                });
                html += `</div>`;
            }

            if (c.contentType || c.contentStatus) {
                html += `<div class="detail-content-meta">`;
                if (c.contentType) {
                    const typeLabels = {
                        image: '🖼️ Image Post',
                        video: '🎬 Video',
                        'story-reel': '📱 Story / Reel',
                        carousel: '🎠 Carousel',
                        article: '📝 Article / Blog',
                        infographic: '📊 Infographic',
                        live: '🔴 Live'
                    };
                    html += `<span class="detail-content-type-tag">${typeLabels[c.contentType] || c.contentType}</span>`;
                }
                if (c.contentStatus) {
                    const statLabels = {
                        draft: '📄 แบบร่าง',
                        ready: '✅ พร้อมโพสต์',
                        published: '🚀 โพสต์แล้ว',
                        scheduled: '⏰ ตั้งเวลาไว้'
                    };
                    html += `<span class="detail-content-status-tag ${c.contentStatus}">${statLabels[c.contentStatus] || c.contentStatus}</span>`;
                }
                html += `</div>`;
            }

            if (c.caption) {
                html += `<div class="detail-caption">${c.caption}</div>`;
            }

            if (c.hashtags) {
                html += `<div class="detail-hashtags">${c.hashtags}</div>`;
            }

            infoEl.innerHTML = html;
        }

        $('#detailEditBtn').onclick = () => {
            closeDetailPopup();
            openModal(id);
        };

        detailPopup.classList.add('active');
    }

    function closeDetailPopup() {
        detailPopup.classList.remove('active');
    }

    // =============================================
    // Modal (Add/Edit)
    // =============================================

    function openModal(id = null, defaultDate = null) {
        editingId = id;
        const deleteBtn = $('#deleteBtn');

        if (id) {
            const c = campaigns.find(x => x.id === id);
            if (!c) return;

            $('#modalTitle').textContent = 'แก้ไขแคมเปญ';
            $('#campName').value = c.name;
            $('#campStartDate').value = c.startDate;
            $('#campEndDate').value = c.endDate;
            $('#campChannel').value = c.channel;
            $('#campStatus').value = c.status;
            $('#campBudget').value = c.budget || '';
            $('#campDescription').value = c.description || '';
            $('#campId').value = c.id;

            // Platforms checkboxes
            const platforms = c.platforms || [];
            $$('#platformCheckboxes input').forEach(cb => {
                cb.checked = platforms.includes(cb.value);
            });
            $('#campContentType').value = c.contentType || '';
            $('#campContentStatus').value = c.contentStatus || '';
            $('#campCaption').value = c.caption || '';
            $('#campHashtags').value = c.hashtags || '';

            $$('.color-option').forEach(opt => {
                opt.classList.toggle('active', opt.dataset.color === c.color);
            });

            deleteBtn.style.display = 'block';
        } else {
            $('#modalTitle').textContent = 'เพิ่มแคมเปญใหม่';
            campaignForm.reset();
            $('#campId').value = '';

            if (defaultDate) {
                $('#campStartDate').value = defaultDate;
                $('#campEndDate').value = defaultDate;
            }

            $$('#platformCheckboxes input').forEach(cb => {
                cb.checked = false;
            });
            $('#campContentType').value = '';
            $('#campContentStatus').value = '';
            $('#campCaption').value = '';
            $('#campHashtags').value = '';

            $$('.color-option').forEach((opt, i) => {
                opt.classList.toggle('active', i === 0);
            });

            deleteBtn.style.display = 'none';
        }

        campaignModal.classList.add('active');
        setTimeout(() => $('#campName').focus(), 200);
    }

    function closeModal() {
        campaignModal.classList.remove('active');
        editingId = null;
    }

    function saveCampaign() {
        const name = $('#campName').value.trim();
        const startDate = $('#campStartDate').value;
        const endDate = $('#campEndDate').value;
        const channel = $('#campChannel').value;
        const status = $('#campStatus').value;
        const budget = parseInt($('#campBudget').value) || 0;
        const description = $('#campDescription').value.trim();
        const color = $('.color-option.active')?.dataset.color || '#6366f1';

        // Platforms (checkboxes)
        const platforms = Array.from($$('#platformCheckboxes input:checked')).map(cb => cb.value);
        const contentType = $('#campContentType').value;
        const contentStatus = $('#campContentStatus').value;
        const caption = $('#campCaption').value.trim();
        const hashtags = $('#campHashtags').value.trim();

        if (!name || !startDate || !endDate || !channel) {
            showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
            return;
        }

        if (parseDate(endDate) < parseDate(startDate)) {
            showToast('วันสิ้นสุดต้องมาหลังวันเริ่มต้น', 'error');
            return;
        }

        const campaignData = {
            name,
            startDate,
            endDate,
            channel,
            status,
            budget,
            description,
            color,
            platforms,
            contentType,
            contentStatus,
            caption,
            hashtags
        };

        if (editingId) {
            const index = campaigns.findIndex(c => c.id === editingId);
            if (index !== -1) {
                campaigns[index] = { ...campaigns[index], ...campaignData };
                showToast('อัปเดตแคมเปญเรียบร้อยแล้ว ✓');
            }
        } else {
            campaignData.id = generateId();
            campaigns.push(campaignData);
            showToast('เพิ่มแคมเปญใหม่เรียบร้อยแล้ว ✓');
        }

        saveCampaigns();
        closeModal();
        refreshCurrentView();
    }

    function deleteCampaign() {
        if (!editingId) return;

        if (confirm('คุณต้องการลบแคมเปญนี้ใช่หรือไม่?')) {
            campaigns = campaigns.filter(c => c.id !== editingId);
            saveCampaigns();
            closeModal();
            showToast('ลบแคมเปญเรียบร้อยแล้ว', 'info');
            refreshCurrentView();
        }
    }

    function refreshCurrentView() {
        if (currentView === 'calendar') renderCalendar();
        else if (currentView === 'dashboard') renderDashboard();
        else if (currentView === 'campaigns') renderCampaignsList(searchInput.value);
    }

    // =============================================
    // Sync Space Controls
    // =============================================

    function joinSpace(spaceId) {
        if (!spaceId) return;
        syncSpaceId = spaceId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
        if (!syncSpaceId) return;

        // Set interval for periodic check (every 10 seconds)
        if (syncTimer) clearInterval(syncTimer);
        syncTimer = setInterval(() => {
            syncFromCloud(true);
        }, 10000);

        // Save status in localStorage so they don't loose their room connection on reload
        localStorage.setItem('marketcal_sync_space_id', syncSpaceId);
        
        // Update URL hash
        window.location.hash = syncSpaceId;

        // Fetch initial remote campaigns
        syncFromCloud(false);

        // Update the Sync UI
        renderSyncPanel();
    }

    function disconnectSpace() {
        if (syncTimer) clearInterval(syncTimer);
        syncSpaceId = null;
        localStorage.removeItem('marketcal_sync_space_id');
        
        // Clear hash but keep the path clean
        history.pushState("", document.title, window.location.pathname + window.location.search);
        
        // Load original local data
        loadCampaigns();
        refreshCurrentView();

        renderSyncPanel();
        showToast('ยกเลิกเชื่อมต่อห้องแล้ว', 'info');
    }

    function renderSyncPanel() {
        const panel = $('#syncPanel');
        if (!panel) return;

        if (syncSpaceId) {
            panel.innerHTML = `
                <div class="sync-status online">
                    <span class="status-indicator in-progress"></span>
                    <span>เชื่อมต่อออนไลน์แล้ว</span>
                </div>
                <div class="sync-info text-secondary">
                    โค้ดแชร์: <strong style="color:var(--accent-hover); font-size: 0.85rem;">${syncSpaceId}</strong>
                </div>
                <div class="sync-btn-group">
                    <button class="sync-action-btn primary" id="copyShareBtn">
                        📋 คัดลอกลิงก์แชร์
                    </button>
                    <button class="sync-action-btn" id="syncNowBtn">
                        🔄 ซิงค์ด่วน
                    </button>
                    <button class="sync-action-btn secondary-danger" id="disconnectBtn">
                        🔌 ตัดการเชื่อมต่อ
                    </button>
                </div>
            `;

            $('#copyShareBtn').onclick = () => {
                const shareUrl = `${window.location.origin}${window.location.pathname}#${syncSpaceId}`;
                navigator.clipboard.writeText(shareUrl).then(() => {
                    showToast('คัดลอกลิงก์แชร์แล้ว! ส่งต่อให้ทีมได้เลย ✓');
                }).catch(() => {
                    showToast('คัดลอกรหัสห้อง: ' + syncSpaceId, 'info');
                });
            };

            $('#syncNowBtn').onclick = () => {
                syncFromCloud(false);
            };

            $('#disconnectBtn').onclick = () => {
                disconnectSpace();
            };
        } else {
            panel.innerHTML = `
                <div class="sync-status offline">
                    <span class="status-indicator cancelled"></span>
                    <span>โหมดออฟไลน์ (ในเครื่อง)</span>
                </div>
                <div class="sync-info">
                    สร้างห้องแชร์หรือเข้าร่วมห้องกับคนอื่นเพื่อซิงค์ข้อมูลร่วมกันออนไลน์
                </div>
                <div class="sync-btn-group">
                    <button class="sync-action-btn primary" id="createSpaceBtn">
                        ✨ สร้างห้องแชร์ใหม่
                    </button>
                    <button class="sync-action-btn" id="joinSpaceBtn">
                        🔑 เข้าร่วมห้องด้วยโค้ด
                    </button>
                </div>
            `;

            $('#createSpaceBtn').onclick = () => {
                const randomId = 'mkt-' + Math.random().toString(36).substr(2, 6);
                joinSpace(randomId);
                showToast('สร้างห้องแชร์เรียบร้อย! คัดลอกลิงก์แชร์ส่งให้ทีมงานได้เลย');
            };

            $('#joinSpaceBtn').onclick = () => {
                const code = prompt('กรุณากรอกรหัสห้องแชร์ (เช่น mkt-abc123):');
                if (code) {
                    joinSpace(code);
                }
            };
        }
    }

    // =============================================
    // Event Listeners
    // =============================================

    function initEventListeners() {
        // Navigation
        $$('.nav-item').forEach(btn => {
            btn.addEventListener('click', () => switchView(btn.dataset.view));
        });

        // Calendar navigation
        $('#prevBtn').addEventListener('click', () => {
            if (calView === 'month') {
                currentDate.setMonth(currentDate.getMonth() - 1);
            } else {
                currentDate.setDate(currentDate.getDate() - 7);
            }
            renderCalendar();
        });

        $('#nextBtn').addEventListener('click', () => {
            if (calView === 'month') {
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else {
                currentDate.setDate(currentDate.getDate() + 7);
            }
            renderCalendar();
        });

        $('#todayBtn').addEventListener('click', () => {
            currentDate = new Date();
            renderCalendar();
        });

        // Calendar view toggle
        $$('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                calView = btn.dataset.calView;
                renderCalendar();
            });
        });

        // Add campaign button
        $('#addCampaignBtn').addEventListener('click', () => openModal());

        // Clear all campaigns button
        $('#clearAllBtn').addEventListener('click', () => {
            if (campaigns.length === 0) {
                showToast('ไม่มีแคมเปญให้ลบ', 'info');
                return;
            }
            if (confirm('⚠️ คุณต้องการลบแคมเปญทั้งหมดใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
                campaigns = [];
                saveCampaigns();
                showToast('ลบแคมเปญทั้งหมดเรียบร้อยแล้ว', 'info');
                refreshCurrentView();
            }
        });

        // Modal
        $('#modalClose').addEventListener('click', closeModal);
        $('#cancelBtn').addEventListener('click', closeModal);
        $('#deleteBtn').addEventListener('click', deleteCampaign);

        campaignModal.addEventListener('click', (e) => {
            if (e.target === campaignModal) closeModal();
        });

        campaignForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveCampaign();
        });

        // Color picker
        $$('.color-option').forEach(opt => {
            opt.addEventListener('click', () => {
                $$('.color-option').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
            });
        });

        // Detail popup
        $('#detailClose').addEventListener('click', closeDetailPopup);

        document.addEventListener('click', (e) => {
            if (detailPopup.classList.contains('active') &&
                !detailPopup.contains(e.target) &&
                !e.target.closest('.day-event') &&
                !e.target.closest('.upcoming-item') &&
                !e.target.closest('.campaign-row')) {
                closeDetailPopup();
            }
        });

        // Search
        searchInput.addEventListener('input', () => {
            renderCampaignsList(searchInput.value);
        });

        // Channel filters
        $$('#channelFilters input').forEach(cb => {
            cb.addEventListener('change', () => {
                activeFilters.channels = Array.from($$('#channelFilters input:checked')).map(i => i.value);
                refreshCurrentView();
            });
        });

        // Status filters
        $$('#statusFilters input').forEach(cb => {
            cb.addEventListener('change', () => {
                activeFilters.statuses = Array.from($$('#statusFilters input:checked')).map(i => i.value);
                refreshCurrentView();
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                closeDetailPopup();
            }
            if (e.key === 'n' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'SELECT') {
                e.preventDefault();
                openModal();
            }
        });
    }

    // =============================================
    // Init
    // =============================================

    function init() {
        const hash = window.location.hash ? window.location.hash.substring(1) : null;
        const savedSpace = localStorage.getItem('marketcal_sync_space_id');

        if (hash) {
            joinSpace(hash);
        } else if (savedSpace) {
            joinSpace(savedSpace);
        } else {
            loadCampaigns();
            renderCalendar();
            renderSyncPanel();
        }
        
        initEventListeners();
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
