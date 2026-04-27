// Initialize Lucide Icons
lucide.createIcons();

// Campaign Data (mocked from the Marketing & Sales folder)
const campaigns = [
  {
    id: 'MC-001',
    name: 'iMBA Spring Recruitment',
    status: 'Live',
    spend: 7840,
    plan: 7300,
    kpi: '$76.86 CPA',
    risk: 'Green'
  },
  {
    id: 'MC-002',
    name: 'Executive Education Awareness',
    status: 'Live',
    spend: 5250,
    plan: 5000,
    kpi: '$16.40 CPM',
    risk: 'Green'
  },
  {
    id: 'MC-003',
    name: 'Alumni Event Registration',
    status: 'Live',
    spend: 2100,
    plan: 2000,
    kpi: '$61.77 CPA',
    risk: 'Yellow'
  },
  {
    id: 'MC-004',
    name: 'MSF Program Leads',
    status: 'Live',
    spend: 6320,
    plan: 6000,
    kpi: '$71.82 CPA',
    risk: 'Green'
  },
  {
    id: 'MC-005',
    name: 'Corporate Partnership Pipeline',
    status: 'Live',
    spend: 4860,
    plan: 4800,
    kpi: '$405/mtg',
    risk: 'Green'
  },
  {
    id: 'MC-008',
    name: 'Application Deadline Push',
    status: 'In Review',
    spend: 0,
    plan: 0,
    kpi: '-',
    risk: 'Yellow'
  },
  {
    id: 'MC-006',
    name: 'Undergrad Open House',
    status: 'At Risk',
    spend: 0,
    plan: 0,
    kpi: '-',
    risk: 'Red'
  }
];

function renderTable() {
  const tbody1 = document.getElementById('campaigns-tbody');
  const tbody2 = document.getElementById('all-campaigns-tbody');
  
  if (!tbody1) return;
  
  let html = '';
  campaigns.forEach(c => {
    let statusClass = '';
    if (c.status === 'Live') statusClass = 'status-live';
    else if (c.status === 'In Review') statusClass = 'status-review';
    else statusClass = 'status-risk';

    let riskColor = '';
    if (c.risk === 'Green') riskColor = 'var(--success)';
    else if (c.risk === 'Yellow') riskColor = 'var(--warning)';
    else riskColor = 'var(--danger)';

    html += `
      <tr>
        <td>
          <span class="campaign-name">${c.name}</span>
          <span class="campaign-id">${c.id}</span>
        </td>
        <td>
          <span class="status-badge ${statusClass}">${c.status}</span>
        </td>
        <td>
          $${c.spend.toLocaleString()} <span style="color: var(--text-secondary); font-size: 12px;">/ $${c.plan.toLocaleString()}</span>
        </td>
        <td>${c.kpi}</td>
        <td style="color: ${riskColor}; font-weight: 500;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${riskColor}"></div>
            ${c.risk}
          </div>
        </td>
      </tr>
    `;
  });
  
  tbody1.innerHTML = html;
  if (tbody2) {
    tbody2.innerHTML = html;
  }
}

function updateKPIs() {
  const liveCount = campaigns.filter(c => c.status === 'Live').length;
  const totalCount = campaigns.length;
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  
  // Update Live Campaigns KPI
  const kpiCards = document.querySelectorAll('.kpi-value');
  if (kpiCards.length >= 2) {
    kpiCards[0].innerHTML = `${liveCount} <span>/ ${totalCount}</span>`;
    kpiCards[1].innerHTML = `$${totalSpend.toLocaleString()}`;
  }
}

// Sidebar Navigation Handling
function switchTab(element, tabName) {
  // Remove active class from all links
  document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
  // Add active class to clicked link
  element.parentElement.classList.add('active');
  
  // Hide all views
  document.querySelectorAll('.tab-view').forEach(view => view.style.display = 'none');
  
  // Show Loading State
  const loadingState = document.getElementById('ai-loading');
  loadingState.style.display = 'flex';
  
  // Simulate AI crunching data in the background (1.5 seconds)
  setTimeout(() => {
    loadingState.style.display = 'none';
    
    // Show the target view
    const targetView = document.getElementById(`view-${tabName}`);
    if (targetView) {
      if (tabName === 'Dashboard' || tabName === 'Performance' || tabName === 'Finance' || tabName === 'Geo' || tabName === 'Campaigns' || tabName === 'DailyBrief') {
        targetView.style.display = 'grid';
      } else {
        targetView.style.display = 'block';
      }
    }
    
    // Initialize chart if Performance tab
    if (tabName === 'Performance' && !window.performanceChartInstance) {
      initChart();
    }

    // Refresh icons
    lucide.createIcons();
  }, 1200);
}

function initChart() {
  const ctx = document.getElementById('performanceChart');
  if (!ctx) return;
  
  window.performanceChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Total Conversions',
          data: [250, 310, 400, 324],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: 'Blended CPA ($)',
          data: [110, 105, 95, 90],
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          labels: { color: '#94a3b8' }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8' }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8' }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#94a3b8' }
        }
      }
    }
  });
}

function triggerAgentAction(element, actionName, tabName) {
  switchTab(element, tabName);

  // Optional: still copy the prompt to clipboard if they want to talk to the agent about it
  navigator.clipboard.writeText(actionName).then(() => {
    showToast(`AI agent is generating the <strong>${tabName}</strong> view...<br><br><span style="font-size: 11px; opacity: 0.8">The prompt "${actionName}" was copied to your clipboard in case you want to ask follow-up questions in the chat!</span>`);
  });
}

// Simple Toast Notification System
function showToast(message) {
  let toast = document.getElementById('custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'custom-toast';
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '24px',
      right: '400px', // Just to the left of the bot
      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
      color: 'white',
      padding: '16px 20px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      lineHeight: '1.4',
      zIndex: '1000',
      opacity: '0',
      transform: 'translateY(20px)',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = message;
  
  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);
  
  // Remove after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// Handle File Upload
document.getElementById('campaign-upload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = function(event) {
    const text = event.target.result;
    
    // Parse Markdown/Text for key fields using Regex
    const nameMatch = text.match(/(?:\*\*|#)?\s*Campaign name:\s*(?:\*\*)?\s*(.+)/i) || text.match(/Campaign:\s*(.+)/i);
    const idMatch = text.match(/(?:\*\*|#)?\s*Campaign ID.*:\s*(?:\*\*)?\s*(MC-\d+)/i);
    const budgetMatch = text.match(/(?:\*\*|#)?\s*Total (?:planned )?budget:\s*(?:\*\*)?\s*\$([\d,]+)/i);
    const cpaMatch = text.match(/(?:\*\*|#)?\s*Target CPA:\s*(?:\*\*)?\s*\$([\d,]+)/i) || text.match(/Target CPA:\s*\$([\d,]+)/i);

    const name = nameMatch ? nameMatch[1].trim() : file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
    const id = idMatch ? idMatch[1].trim() : `MC-00${campaigns.length + 1}`;
    const budgetStr = budgetMatch ? budgetMatch[1].replace(/,/g, '') : "0";
    const plan = parseInt(budgetStr) || Math.floor(Math.random() * 10000) + 2000;
    
    let kpi = '-';
    if (cpaMatch) {
        kpi = `$${cpaMatch[1]} Target CPA`;
    }

    const newCampaign = {
      id: id,
      name: name,
      status: 'In Review',
      spend: 0, // brand new campaign
      plan: plan,
      kpi: kpi,
      risk: 'Yellow' // Default risk until reviewed
    };

    campaigns.unshift(newCampaign); // Add to top of list
    
    // Update UI
    renderTable();
    updateKPIs();
    
    // Reset input
    document.getElementById('campaign-upload').value = '';
    
    // Re-initialize any new lucide icons
    lucide.createIcons();
    
    showToast(`Successfully parsed and added campaign: <strong>${name}</strong><br><br><span style="font-size: 11px; opacity: 0.8">Budget: $${plan.toLocaleString()} | ID: ${id}</span>`);
    
    // Switch to Dashboard view to see the new campaign
    switchTab(document.querySelector('.nav-links li:first-child a'), 'Dashboard');
  };
  
  // If it's a docx, we'd need a library like mammoth.js, but for txt/md we can read directly:
  if (file.name.endsWith('.md') || file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
      reader.readAsText(file);
  } else {
      // Fallback for docx or other binaries
      const newCampaign = {
        id: `MC-00${campaigns.length + 1}`,
        name: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
        status: 'In Review',
        spend: 0,
        plan: Math.floor(Math.random() * 10000) + 2000,
        kpi: '-',
        risk: 'Yellow'
      };
      campaigns.unshift(newCampaign);
      renderTable();
      updateKPIs();
      lucide.createIcons();
      showToast(`Uploaded ${file.name} (Binary format). Added as new campaign.`);
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  updateKPIs();
});
