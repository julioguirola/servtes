document.addEventListener('DOMContentLoaded', () => {

    //insertar footer

    document.getElementById('footer-servtes').innerHTML = `
            <section class="log">
            <button onclick="log_in()">
                <svg class="svg-icon" fill="none" height="20" viewBox="0 0 20 20" width="15" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m9.99998 4.16667c1.38072 0 2.50002 1.11929 2.50002 2.5 0 .85577-.4293 1.6115-1.088 2.06341l-.4536.31125.1079.53934 1.2505 6.25263h-4.63366l1.25051-6.25263.10791-.53934-.45358-.31125c-.65876-.45191-1.088-1.20764-1.088-2.06341 0-1.38071 1.11925-2.5 2.5-2.5zm-2.31684 11.66663-.19934.9968-.81715-.1634v-.8334zm5.65016.8334v-.8334h-1.0165l.1993.9968zm.8172-.1634.1993.9967h-1.0165-6.66665-1.0165l.19935-.9967 1.35023-6.75127c.14013.12727.28892.24506.44536.35237l.47144-.68715-.81716-.16342-.09964.4982c-.83832-.76139-1.36642-1.86163-1.36642-3.08536 0-2.30119 1.86549-4.16667 4.16667-4.16667 2.30112 0 4.16662 1.86548 4.16662 4.16667 0 1.22374-.5281 2.32399-1.3664 3.08538l-.0996-.49822-.8172.16342-.4714-.68717.4714.68717-.8171.16342.8171-.16342.4715.68715c.1564-.1073.3052-.22509.4453-.35235z" fill="#fff" fill-rule="evenodd"></path></svg>
                <p id="button-login-text">Iniciar Sesión</p>
            </button>
            <button onclick="alert('en desarrollo...')">
                <svg class="" xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 512 512" y="0" x="0" height="10" width="20" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><path class="" data-original="#000000" fill="#595959" d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"></path></g></svg>
                Registrarme
            </button>
        </section>
        <section class="contacto">
            <h2>Email</h2>
            <a href="mailto:servtes@gmail.com">servtes@gmail.com</a>
        </section>
        <section class="contacto">
            <h2>WhatsApp</h2>
            <a href="https://wa.me/15551234567">+15551234567</a>
        </section>
        <section class="redes">
            <div>
                <button onclick="facebook()" class="facebook">
                    <svg viewBox="0 0 16 16" class="bi bi-facebook" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                    </svg>
                    Facebook
                </button>
            </div>
            <div>
                <button onclick="youtube()" class="youtube">
                    <svg viewBox="0 0 576 512" fill="white" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"></path>
                    </svg>
                    YouTube
                </button>
            </div>
        </section>
    `

    //check user

    const user = localStorage.getItem('user')
    const pass = localStorage.getItem('pass')
    const button = document.getElementById('button-admin')

    if (user) {
        document.getElementById('button-login-text').innerText = "Cerrar Sesión"
    }

    if (user != null && pass != null) {
        fetch('/login_api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user, pass})
        })
        .then(response => response.json())
        .then(data => {
            if (!data.succes) {
                console.log('server problem')
                return
            }
            document.getElementById('button-login-text').innerText = "Cerrar Sesión"
            if (data.rol === 'admin') {
                button.hidden = false
            } else {
                button.hidden = true
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        button.hidden = true
    }
});

const cargarElements = (tipo, destacado) => {
    fetch('/get_content', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipo, destacado })
    })
    .then(response => response.json())
    .then(data => {
        data.result.forEach(element => {
            document.getElementById('elementos').insertAdjacentHTML('beforeend', `
            <article style='background-image: url(${element.image});'>
                <div>
                    <p><strong>${element.title}:</strong>${element.description}</p>
                </div>
            </article>
            `
        )});
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function log_in(){
    const texto = document.getElementById('button-login-text').innerText

    if (texto === "Iniciar Sesión") {
        location.href = '/login'
    } else {
        localStorage.removeItem('user')
        localStorage.removeItem('pass')
        document.getElementById('button-login-text').innerText = "Iniciar Sesión"
        document.getElementById('button-admin').hidden = true
    }
}
function go_admin(){
    location.href = '/admin';
}
function facebook(){
    location.href = "https://www.facebook.com/SERVTES.Oficial/";
}
function youtube(){
    location.href = 'https://www.youtube.com/@SERVTES';
}