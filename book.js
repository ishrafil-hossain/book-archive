const searchBook = () => {
    const inputField = document.getElementById('search-field');
    const searchText = inputField.value;
    // error message 
    if (searchText === '') {
        const message = document.getElementById('total-result');
        message.innerText = `Please write your favorite book`;
    }
    else {
        // Spinners on
        document.getElementById('spinner').innerText = `Loading...`;

        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data))
            .catch(error => console.log(error));

    }
    // clear input field
    inputField.value = '';
};

const displayBook = data => {
    const bookCard = document.getElementById('book-card');
    // clear card 
    bookCard.innerText = '';

    // total result found and error massage 
    const totalResult = document.getElementById('total-result');
    if (data.numFound === 0) {
        totalResult.innerText = `Not Found.Please try again later ):`;
    }
    else {
        totalResult.innerText = `Total Books Found : ${data.numFound}`;
    }

    data.docs.forEach(data => {
        if (data.hasOwnProperty('author_name') && data.hasOwnProperty('publisher') && data.hasOwnProperty('first_publish_year')) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4>Book Name : ${data.title}</h4>
                    <h5>Author Name : ${data.author_name}</h5>
                    <h6>First Publication : ${data.first_publish_year}</h6>
                    <p>Publisher : ${data.publisher[0]}</p>
                </div>
            </div>
            `;
            bookCard.appendChild(div);
        }
    });
    // Spinners off
    document.getElementById('spinner').innerText = '';
}
