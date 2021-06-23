/* Contact */

const contact = document.querySelector(".contact");

if (contact) {
    const message = document.querySelector(".contact .message");
    contact.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        
        await fetch('api/contact.php', {
            'method': 'post',
            'body': data,
        }).then(async (event) => {
            const text = await event.text();
            message.innerText = text;
        });

        event.target.reset();
    });
};