// Sample quotes and categories data
let quotes = {
    success: [
        { id: 1, text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", likes: 0, dislikes: 0 },
        { id: 2, text: "The only limit to our realization of tomorrow will be our doubts of today.", likes: 0, dislikes: 0 }
    ],
    inspiration: [
        { id: 3, text: "The best way to predict the future is to create it.", likes: 0, dislikes: 0 },
        { id: 4, text: "In the middle of difficulty lies opportunity.", likes: 0, dislikes: 0 }
    ],
    life: [
        { id: 5, text: "Life is what happens when you're busy making other plans.", likes: 0, dislikes: 0 },
        { id: 6, text: "The purpose of our lives is to be happy.", likes: 0, dislikes: 0 }
    ],
    all: []
};

let categories = ['success', 'inspiration', 'life'];
let tags = [];

// Function to show a specific section and fetch data
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    if (sectionId === 'latest-quotes') {
    // Display latest quotes
    displayLatestQuotes();
} else if (sectionId === 'top-quotes') {
    // Display top rated quotes
    displayTopRatedQuotes();
} else if (sectionId === 'admin-panel') {
    // Display admin panel and manage quotes, categories, and tags
    displayQuotesManagement();
    displayCategories();
    displayTags();
}

// Function to display latest quotes
function displayLatestQuotes() {
    const latestQuotesList = document.getElementById('latest-quotes-list');
    latestQuotesList.innerHTML = ''; // Clear previous list

    // Display latest quotes from all categories
    quotes.all.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = quote.text;
        latestQuotesList.appendChild(listItem);
    });
}

// Function to display top rated quotes
function displayTopRatedQuotes() {
    const topQuotesList = document.getElementById('top-quotes-list');
    topQuotesList.innerHTML = ''; // Clear previous list

    // Display top rated quotes based on likes
    const topQuotes = quotes.all.sort((a, b) => b.likes - a.likes).slice(0, 5); // Get top 5 quotes
    topQuotes.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = `${quote.text} - Likes: ${quote.likes}, Dislikes: ${quote.dislikes}`;
        topQuotesList.appendChild(listItem);
    });
}

// Function to display quotes management section
function displayQuotesManagement() {
    const quotesList = document.getElementById('quotes-list');
    quotesList.innerHTML = ''; // Clear previous list

    // Display quotes from each category with management options
    Object.keys(quotes).forEach(category => {
        quotes[category].forEach(quote => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="block">${quote.text}</span>
                <div>
                    <button onclick="likeQuote(${quote.id})" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2">Like (${quote.likes})</button>
                    <button onclick="dislikeQuote(${quote.id})" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Dislike (${quote.dislikes})</button>
                    <button onclick="deleteQuote(${quote.id})" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded ml-2">Delete</button>
                </div>
            `;
            quotesList.appendChild(listItem);
        });
    });
}

// Function to add a new quote
function addQuote() {
    const category = document.getElementById('new-quote-category').value;
    const newQuoteText = document.getElementById('new-quote').value.trim();
    if (newQuoteText) {
        const newQuote = { id: quotes.all.length + 1, text: newQuoteText, likes: 0, dislikes: 0 };
        quotes[category].push(newQuote);
        quotes.all.push(newQuote);
        document.getElementById('new-quote').value = '';
        document.getElementById('admin-message').innerText = 'Quote added successfully!';
        document.getElementById('admin-message').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('admin-message').classList.add('hidden');
        }, 2000);
        displayQuotesManagement();
        displayLatestQuotes(); // Update latest quotes display
    } else {
        alert('Please enter a quote.');
    }
}

// Function to like a quote
function likeQuote(id) {
    const quote = quotes.all.find(q => q.id === id);
    if (quote) {
        quote.likes++;
        displayQuotesManagement();
        displayTopRatedQuotes(); // Update top rated quotes display
    }
}

// Function to dislike a quote
function dislikeQuote(id) {
    const quote = quotes.all.find(q => q.id === id);
    if (quote) {
        quote.dislikes++;
        displayQuotesManagement();
        displayTopRatedQuotes(); // Update top rated quotes display
    }
}

// Function to delete a quote
function deleteQuote(id) {
    const index = quotes.all.findIndex(q => q.id === id);
    if (index !== -1) {
        quotes.all.splice(index, 1);
        Object.keys(quotes).forEach(category => {
            const categoryIndex = quotes[category].findIndex(q => q.id === id);
            if (categoryIndex !== -1) {
                quotes[category].splice(categoryIndex, 1);
            }
        });
        displayQuotesManagement();
        displayLatestQuotes(); // Update latest quotes display
        displayTopRatedQuotes(); // Update top rated quotes display
    }
}

// Function to display categories in the admin panel
function displayCategories() {
    const categoriesList = document.getElementById('categories-list');
    categoriesList.innerHTML = ''; // Clear previous list

    categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.textContent = category;
        categoriesList.appendChild(listItem);
    });
}

// Function to add a new category
function addCategory() {
    const newCategory = document.getElementById('new-category').value.trim();
    if (newCategory) {
        categories.push(newCategory);
        document.getElementById('new-category').value = '';
        displayCategories();
    } else {
        alert('Please enter a category name.');
    }
}

// Function to display tags in the admin panel
function displayTags() {
    const tagsList = document.getElementById('tags-list');
    tagsList.innerHTML = ''; // Clear previous list

    tags.forEach(tag => {
        const listItem = document.createElement('li');
        listItem.textContent = tag;
        tagsList.appendChild(listItem);
    });
}

// Function to add a new tag
function addTag() {
    const newTag = document.getElementById('new-tag').value.trim();
    if (newTag) {
        tags.push(newTag);
        document.getElementById('new-tag').value = '';
        displayTags();
    } else {
        alert('Please enter a tag name.');
    }
}

// Function to apply styling settings
function applyStylingSettings() {
    const websiteColor = document.getElementById('website-color').value;
    const fontSize = document.getElementById('font-size').value + 'px';

    document.body.style.backgroundColor = websiteColor;
    document.body.style.fontSize = fontSize;
}

// Function to update website settings (dummy function for demonstration)
function updateWebsiteSettings() {
    const websiteTitle = document.getElementById('website-title').value;
    const adminPassword = document.getElementById('admin-password').value;

    // Dummy implementation - replace with actual logic for updating settings
    console.log(`Updated website title to: ${websiteTitle}`);
    console.log(`Updated admin password to: ${adminPassword}`);
    document.getElementById('admin-message').innerText = 'Settings updated successfully!';
    document.getElementById('admin-message').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('admin-message').classList.add('hidden');
    }, 2000);
}
