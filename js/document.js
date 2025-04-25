// Document page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Generate random documents
    const documents = generateRandomDocuments();
    
    // Display documents with pagination
    const itemsPerPage = 10;
    let currentPage = 1;
    
    displayDocuments(documents, currentPage, itemsPerPage);
    setupPagination(documents, itemsPerPage);
    
    // Logout functionality
    const logoutLink = document.getElementById('logout-link');
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
    
    // Helper function to generate random documents
    function generateRandomDocuments() {
        const documents = [];
        const count = Math.floor(Math.random() * 26); // 0-25 documents
        
        for (let i = 1; i <= count; i++) {
            const today = new Date();
            const randomDaysAgo = Math.floor(Math.random() * 7); // 0-6 days ago
            const randomDate = new Date(today);
            randomDate.setDate(today.getDate() - randomDaysAgo);
            
            documents.push({
                id: i,
                title: `Training Manual ${i}`,
                description: `Detailed guide for ${getRandomTrainingTopic()} with comprehensive examples and best practices.`,
                date: randomDate.toISOString().split('T')[0],
                downloadUrl: `#download-${i}`
            });
        }
        
        // Sort by date, newest first
        return documents.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Helper function to display documents
    function displayDocuments(documents, page, itemsPerPage) {
        const tableBody = document.getElementById('document-table-body');
        const noFilesMessage = document.getElementById('no-files-message');
        
        // Clear existing content
        tableBody.innerHTML = '';
        
        if (documents.length === 0) {
            noFilesMessage.style.display = 'block';
            return;
        }
        
        noFilesMessage.style.display = 'none';
        
        // Calculate start and end indices
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, documents.length);
        
        // Display documents for the current page
        for (let i = startIndex; i < endIndex; i++) {
            const doc = documents[i];
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${doc.title}</td>
                <td>${doc.description}</td>
                <td>${formatDate(doc.date)}</td>
                <td>
                    <button class="download-btn" onclick="downloadFile('${doc.id}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
        }
    }
    
    // Helper function to setup pagination
    function setupPagination(documents, itemsPerPage) {
        const paginationContainer = document.getElementById('pagination');
        
        // Calculate total pages
        const totalPages = Math.ceil(documents.length / itemsPerPage);
        
        // If there's only one page or no documents, don't show pagination
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'flex';
        
        // Create pagination buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', function() {
                currentPage = i;
                displayDocuments(documents, currentPage, itemsPerPage);
                
                // Update active state
                document.querySelectorAll('.pagination button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
            
            // Add active class to first page button
            if (i === 1) {
                pageButton.classList.add('active');
            }
            
            paginationContainer.appendChild(pageButton);
        }
    }
    
    // Helper function to format dates
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Helper function to get random training topics
    function getRandomTrainingTopic() {
        const topics = [
            'web automation testing',
            'API integration',
            'UI testing strategies',
            'cross-browser testing',
            'mobile testing',
            'performance testing',
            'security testing',
            'end-to-end testing',
            'test automation frameworks',
            'continuous integration'
        ];
        return topics[Math.floor(Math.random() * topics.length)];
    }
    
    // Make downloadFile function globally available
    window.downloadFile = function(docId) {
        // Generate random binary data (1-2 KiB)
        const data = new Uint8Array(Math.floor(Math.random() * 1024) + 1024);
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.floor(Math.random() * 256);
        }
        
        // Create a blob from the data
        const blob = new Blob([data], { type: 'application/octet-stream' });
        
        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `document-${docId}.bin`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
});