const systemInfo = navigator.userAgent;

localStorage.setItem('userSystemInfo', systemInfo);
const variantNumber = 18; 
const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;

fetch(apiUrl)
    .then(response => response.json())
    .then(comments => {
        const container = document.getElementById('comments-container');
        container.innerHTML = '';
        comments.forEach(comment => {
            const commentBlock = document.createElement('div');
            commentBlock.style.backgroundColor = '#1a1e29'; 
            commentBlock.style.padding = '15px';
            commentBlock.style.marginBottom = '15px';
            commentBlock.style.borderRadius = '8px';
            commentBlock.style.borderLeft = '3px solid #82aaff';
            commentBlock.innerHTML = `
                <h4 style="margin: 0 0 5px 0; color: #c3e88d;">Від: ${comment.email}</h4>
                <strong style="color: #ff5370;">${comment.name}</strong>
                <p style="margin: 10px 0 0 0; color: #a6accd;">${comment.body}</p>
            `;
            container.appendChild(commentBlock);
        });
    })
    .catch(error => {
        console.error('Помилка завантаження:', error);
        document.getElementById('comments-container').innerHTML = '<p>Не вдалося завантажити відгуки.</p>';
    });

const footerElement = document.querySelector('footer');

if (footerElement) {
    const savedInfo = localStorage.getItem('userSystemInfo');
    const infoParagraph = document.createElement('p');
    infoParagraph.style.fontSize = '0.8rem';
    infoParagraph.style.color = '#888';
    infoParagraph.textContent = `Ваша система: ${savedInfo}`;
    footerElement.appendChild(infoParagraph);
}

const modal = document.getElementById('feedback-modal');
const closeBtn = document.querySelector('.close-btn');
function showModal() {
    modal.style.display = 'flex';
}

setTimeout(showModal, 60000);

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

function setAutoTheme() {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour < 21) {
        bodyElement.classList.add('light-theme');
        themeToggleBtn.textContent = ' Увімкнути нічну тему';
    } else {
        bodyElement.classList.remove('light-theme');
        themeToggleBtn.textContent = ' Увімкнути денну тему';
    }
}

setAutoTheme();

themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('light-theme');
    if (bodyElement.classList.contains('light-theme')) {
        themeToggleBtn.textContent = ' Увімкнути нічну тему';
    } else {
        themeToggleBtn.textContent = ' Увімкнути денну тему';
    }
});