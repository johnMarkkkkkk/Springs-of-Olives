document.getElementById('timeFilter').addEventListener('change', function() {
    const timePeriod = this.value;
    updateDashboardMetrics(timePeriod);
});

function updateDashboardMetrics(timePeriod) {
    let totalCustomers, newRegistrations, sales, points, redeemed, referralEffectiveness;

    // Update metrics based on the time period selected
    if (timePeriod === 'daily') {
        totalCustomers = 1250;
        newRegistrations = 12;
        sales = 2568;
        points = 6840;
        redeemed = 2300;
        referralEffectiveness = '8%';
    } else if (timePeriod === 'weekly') {
        totalCustomers = 1350;
        newRegistrations = 85;
        sales = 18000;
        points = 94000;
        redeemed = 36700;
        referralEffectiveness = '10%';
    } else if (timePeriod === 'monthly') {
        totalCustomers = 1600;
        newRegistrations = 320;
        sales = 56000;
        points = 128400;
        redeemed = 56700;
        referralEffectiveness = '12%';
    }

    // Update the UI with the new values
    document.getElementById('totalCustomers').textContent = totalCustomers;
    document.getElementById('newRegistrations').textContent = newRegistrations;
    document.getElementById('totalSales').textContent = `$${sales}`;
    document.getElementById('totalPoints').textContent = points;
    document.getElementById('pointsRedeemed').textContent = redeemed;
    document.getElementById('referralEffectiveness').textContent = referralEffectiveness;
}
