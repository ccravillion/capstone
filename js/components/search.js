app.component('search', {
    template: `
      <div class="search-container">
        <div class="search">
        <form @submit.prevent>
          <input v-model="searchTerm" type="text" placeholder="Search inventions..." class="search-input"/>
        </form>
        </div>
        <div class="grid">
          <div v-for="(inv, idx) in filteredInventions" :key="idx" class="card resultsCard">
            <h3 class="title">{{ inv.name }}</h3>
            <p>{{ inv.description }}</p>
          </div>
          <div v-if="filteredInventions.length === 0" class="no-results">
            No inventions found.
          </div>
        </div>
      </div>
    `,
    data() {
        return {
            searchTerm: '',
            // Example inventions array; replace with actual data or props as needed
            inventions: [
                { name: "Light Bulb", description: "An electric light source invented by Thomas Edison." },
                { name: "Telephone", description: "A device for voice communication over distances." },
                { name: "Printing Press", description: "A machine for printing text or pictures." },
                { name: "Airplane", description: "A powered flying vehicle with fixed wings." },
                { name: "Internet", description: "A global network connecting millions of computers." },
                { name: "Penicillin", description: "The first true antibiotic discovered by Alexander Fleming." },
                { name: "Steam Engine", description: "A heat engine that performs mechanical work using steam." },
                { name: "Television", description: "A device for transmitting moving images and sound." },
                { name: "Computer", description: "An electronic device for storing and processing data." },
                { name: "Microwave Oven", description: "An appliance that cooks food using microwave radiation." },
                { name: "Camera", description: "A device for capturing photographs or video." },
                { name: "GPS", description: "A satellite-based navigation system." }
            ]
        }
    },
    computed: {
        filteredInventions() {
            const term = this.searchTerm.toLowerCase();
            return this.inventions.filter(inv =>
                inv.name.toLowerCase().includes(term) ||
                inv.description.toLowerCase().includes(term)
            );
        }
    }
});