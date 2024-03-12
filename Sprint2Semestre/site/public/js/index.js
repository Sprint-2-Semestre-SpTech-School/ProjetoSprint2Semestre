function changeNav() {

    const navbar = document.querySelector('nav');
    const anchors = document.querySelectorAll('.nav-items .item a');

    addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#001736';
            navbar.style.fontSize = '1em';

            anchors.forEach(anchors => {
                anchors.style.fontSize = '1em';
                anchors.style.color = 'white'
            });

        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.fontSize = '1.2em';

            anchors.forEach(anchors => {
                anchors.style.fontSize = '1.5em';
                anchors.style.color = '#FDAD00'
            });
        }
        console.log(window.scrollY);
    });
}

ScrollReveal().reveal('.home', { delay: 300 });
ScrollReveal().reveal('img', {
    delay: 200,
    reset: true
});

ScrollReveal().reveal('p, h1', {
    delay: 400,
    direction: screenLeft,
    reset: true
});