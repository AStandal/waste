interface Proposition {
    title: string;
    date: string;
    department: string;
    description?: string;
    url?: string;
}

export async function handleClick() {
    try {
        const response = await fetch('/scrape');
        const propositions: Proposition[] = await response.json();
        
        const container = document.querySelector('.container');
        if (!container) return;

        const propositionsList = document.createElement('div');
        propositionsList.className = 'propositions-list';

        propositions.forEach(prop => {
            const propElement = document.createElement('div');
            propElement.className = 'proposition';
            propElement.innerHTML = `
                <h3>${prop.title}</h3>
                <div class="prop-meta">
                    <span class="date">${prop.date}</span>
                    <span class="department">${prop.department}</span>
                </div>
                ${prop.description ? `<p>${prop.description}</p>` : ''}
                ${prop.url ? `<a href="${prop.url}" target="_blank">Les mer</a>` : ''}
            `;
            propositionsList.appendChild(propElement);
        });

        // Remove existing propositions list if any
        const existingList = document.querySelector('.propositions-list');
        if (existingList) {
            existingList.remove();
        }

        container.appendChild(propositionsList);
    } catch (error) {
        console.error('Error fetching propositions:', error);
        alert('Failed to fetch propositions');
    }
} 