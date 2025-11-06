// Main application logic for Conflict Cost Analysis

class ConflictCostCalculator {
    constructor() {
        this.inputFields = [
            'teamMembers',
            'avgHourlyRate',
            'conflictDuration',
            'efficiencyLoss',
            'resolutionHours',
            'consultantHours',
            'consultantRate',
            'legalHours',
            'legalRate',
            'employeesLeft',
            'replacementCost',
            'reputationDamage'
        ];
    }

    init() {
        this.attachEventListeners();
        this.calculateCosts();
    }

    attachEventListeners() {
        // Input change listeners
        this.inputFields.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => this.calculateCosts());
            }
        });

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetForm());
        }

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }
    }

    calculateCosts() {
        // Get input values
        const teamMembers = parseFloat(document.getElementById('teamMembers')?.value || 0);
        const avgHourlyRate = parseFloat(document.getElementById('avgHourlyRate')?.value || 0);
        const conflictDuration = parseFloat(document.getElementById('conflictDuration')?.value || 0);
        const efficiencyLoss = parseFloat(document.getElementById('efficiencyLoss')?.value || 0);
        const resolutionHours = parseFloat(document.getElementById('resolutionHours')?.value || 0);
        const consultantHours = parseFloat(document.getElementById('consultantHours')?.value || 0);
        const consultantRate = parseFloat(document.getElementById('consultantRate')?.value || 0);
        const legalHours = parseFloat(document.getElementById('legalHours')?.value || 0);
        const legalRate = parseFloat(document.getElementById('legalRate')?.value || 0);
        const employeesLeft = parseFloat(document.getElementById('employeesLeft')?.value || 0);
        const replacementCost = parseFloat(document.getElementById('replacementCost')?.value || 0);
        const reputationDamage = parseFloat(document.getElementById('reputationDamage')?.value || 0);

        // Calculate productivity loss costs
        // Formula: team members × hourly rate × conflict duration (days) × 8 hours/day × (efficiency loss % / 100)
        const productivityCosts = teamMembers * avgHourlyRate * conflictDuration * 8 * (efficiencyLoss / 100);

        // Calculate resolution time costs
        // Formula: resolution hours × average hourly rate × team members involved
        const resolutionCosts = resolutionHours * avgHourlyRate * teamMembers;

        // Calculate consultant costs
        const calculatedConsultantCosts = consultantHours * consultantRate;

        // Calculate legal costs
        const calculatedLegalCosts = legalHours * legalRate;

        // Calculate turnover costs
        const turnoverCosts = employeesLeft * replacementCost;

        // Calculate total costs
        const totalCosts = productivityCosts + resolutionCosts + calculatedConsultantCosts +
                          calculatedLegalCosts + turnoverCosts + reputationDamage;

        // Update display
        this.updateCostDisplay('productivityCosts', productivityCosts);
        this.updateCostDisplay('resolutionCosts', resolutionCosts);
        this.updateCostDisplay('consultantCosts', calculatedConsultantCosts);
        this.updateCostDisplay('legalCosts', calculatedLegalCosts);
        this.updateCostDisplay('turnoverCosts', turnoverCosts);
        this.updateCostDisplay('reputationCosts', reputationDamage);
        this.updateCostDisplay('totalCosts', totalCosts);
    }

    updateCostDisplay(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value.toFixed(2);
        }
    }

    resetForm() {
        if (confirm(i18n.t('messages.confirmReset') || 'Are you sure you want to reset the form? All data will be lost.')) {
            document.getElementById('conflictForm')?.reset();
            this.calculateCosts();
        }
    }

    exportData() {
        // Get all input values
        const data = {
            exportDate: new Date().toISOString(),
            inputs: {
                teamMembers: parseFloat(document.getElementById('teamMembers')?.value || 0),
                avgHourlyRate: parseFloat(document.getElementById('avgHourlyRate')?.value || 0),
                conflictDuration: parseFloat(document.getElementById('conflictDuration')?.value || 0),
                efficiencyLoss: parseFloat(document.getElementById('efficiencyLoss')?.value || 0),
                resolutionHours: parseFloat(document.getElementById('resolutionHours')?.value || 0),
                consultantHours: parseFloat(document.getElementById('consultantHours')?.value || 0),
                consultantRate: parseFloat(document.getElementById('consultantRate')?.value || 0),
                legalHours: parseFloat(document.getElementById('legalHours')?.value || 0),
                legalRate: parseFloat(document.getElementById('legalRate')?.value || 0),
                employeesLeft: parseFloat(document.getElementById('employeesLeft')?.value || 0),
                replacementCost: parseFloat(document.getElementById('replacementCost')?.value || 0),
                reputationDamage: parseFloat(document.getElementById('reputationDamage')?.value || 0)
            },
            calculatedCosts: {
                productivityCosts: parseFloat(document.getElementById('productivityCosts')?.textContent || 0),
                resolutionCosts: parseFloat(document.getElementById('resolutionCosts')?.textContent || 0),
                consultantCosts: parseFloat(document.getElementById('consultantCosts')?.textContent || 0),
                legalCosts: parseFloat(document.getElementById('legalCosts')?.textContent || 0),
                turnoverCosts: parseFloat(document.getElementById('turnoverCosts')?.textContent || 0),
                reputationCosts: parseFloat(document.getElementById('reputationCosts')?.textContent || 0),
                totalCosts: parseFloat(document.getElementById('totalCosts')?.textContent || 0)
            }
        };

        // Create download link
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `conflict-cost-analysis-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize i18n first
    await i18n.init();

    // Then initialize calculator
    const calculator = new ConflictCostCalculator();
    calculator.init();
});
