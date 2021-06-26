/* Contact */

const contact = document.querySelector(".contact");

if (contact) {
    const message = document.querySelector(".contact .message");
    contact.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const data = new FormData(event.target);
        
        await fetch('https://formspree.io/f/xeqvzejj', {
            'method': 'post',
            'headers': {
                'Accept': 'application/json'
            },
            'body': data,
        }).then(async (event) => {
            const text = await event.text();
            message.innerText = text;
        });

        event.target.reset();
    });
};