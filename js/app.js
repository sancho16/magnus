// ===== Magnus App Dashboard =====

// ===== Simulated live data =====
let cpuHistory = [];
let memoryHistory = [];
let networkHistory = [];
let requestsHistory = [];
let performanceData = [];
let trafficData = [];

// Initialize data
for (let i = 0; i < 20; i++) {
    cpuHistory.push(Math.random() * 40 + 30);
    memoryHistory.push(Math.random() * 8 + 4);
    networkHistory.push(Math.random() * 80 + 20);
    requestsHistory.push(Math.random() * 500 + 100);
    performanceData.push(Math.random() * 30 + 70);
    trafficData.push([
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
    ]);
}

// ===== Update stats =====
function updateStats() {
    // CPU
    const cpu = Math.random() * 30 + 40;
    cpuHistory.push(cpu);
    cpuHistory.shift();
    document.getElementById('cpuUsage').textContent = cpu.toFixed(1) + '%';
    document.getElementById('cpuBar').style.width = cpu + '%';

    // Memory
    const memory = Math.random() * 6 + 6;
    memoryHistory.push(memory);
    memoryHistory.shift();
    document.getElementById('memoryUsage').textContent = memory.toFixed(1) + ' GB';
    document.getElementById('memoryBar').style.width = (memory / 16 * 100) + '%';

    // Network
    const network = Math.random() * 80 + 20;
    networkHistory.push(network);
    networkHistory.shift();
    document.getElementById('networkSpeed').textContent = network.toFixed(1) + ' Mbps';
    document.getElementById('networkBar').style.width = (network / 100 * 100) + '%';

    // Requests
    const requests = Math.floor(Math.random() * 400 + 200);
    requestsHistory.push(requests);
    requestsHistory.shift();
    document.getElementById('requestsCount').textContent = requests;
    document.getElementById('requestsBar').style.width = (requests / 600 * 100) + '%';

    drawPerformanceChart();
    drawTrafficChart();
}

// ===== Draw performance chart =====
function drawPerformanceChart() {
    const canvas = document.getElementById('performanceChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Line
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#7c3aed');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.beginPath();
    performanceData.forEach((val, i) => {
        const x = (width / (performanceData.length - 1)) * i;
        const y = height - (val / 100) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Area
    const areaGradient = ctx.createLinearGradient(0, 0, 0, height);
    areaGradient.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
    areaGradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

    ctx.fillStyle = areaGradient;
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Points
    performanceData.forEach((val, i) => {
        const x = (width / (performanceData.length - 1)) * i;
        const y = height - (val / 100) * height;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#2563eb';
        ctx.fill();
    });
}

// ===== Draw traffic chart =====
function drawTrafficChart() {
    const canvas = document.getElementById('trafficChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    ctx.clearRect(0, 0, width, height);

    const data = trafficData[trafficData.length - 1];
    const colors = ['#2563eb', '#7c3aed', '#06b6d4'];
    const labels = ['Direct', 'Referral', 'Organic'];
    let startAngle = -Math.PI / 2;

    data.forEach((value, i) => {
        const sliceAngle = (value / 300) * Math.PI * 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();

        // Label
        const midAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(midAngle) * (radius + 20);
        const labelY = centerY + Math.sin(midAngle) * (radius + 20);
        ctx.fillStyle = '#64748b';
        ctx.font = '12px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], labelX, labelY);

        startAngle += sliceAngle;
    });

    // Center circle (donut)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Center text
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('300', centerX, centerY - 8);
    ctx.font = '12px -apple-system, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Total', centerX, centerY + 12);
}

// ===== Refresh data =====
function refreshData() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => updateStats(), i * 100);
    }
}

// ===== Toggle theme =====
let isDark = false;
function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
}

// ===== Simulate action =====
function simulateAction(action) {
    const messages = {
        deploy: '🚀 Deploying to production...',
        backup: '💾 Creating backup...',
        analyze: '📊 Running analysis...',
        optimize: '⚡ Optimizing performance...'
    };

    const activityList = document.getElementById('activityList');
    const newItem = document.createElement('div');
    newItem.className = 'activity-item';
    newItem.innerHTML = `
        <div class="activity-icon">⏳</div>
        <div class="activity-content">
            <span class="activity-text">${messages[action]}</span>
            <span class="activity-time">Just now</span>
        </div>
    `;
    activityList.insertBefore(newItem, activityList.firstChild);

    setTimeout(() => {
        newItem.querySelector('.activity-icon').textContent = '✅';
        newItem.querySelector('.activity-text').textContent = `${messages[action].replace('...', '')} completed!`;
    }, 2000);

    // Keep only last 5 items
    while (activityList.children.length > 5) {
        activityList.removeChild(activityList.lastChild);
    }
}

// ===== Animate stats on load =====
function animateStats() {
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    animateStats();
    
    // Update every 3 seconds
    setInterval(updateStats, 3000);
    
    console.log('Magnus App Dashboard loaded! 🚀');
});
