window.addEventListener('load', () => {
    window.SD = new NGSwipeDetector({
        element: document.getElementsByTagName('body')[0],
    });


    for( let button of document.getElementsByClassName('btn') ) {
        let buttons_actions = {
            lock: () => { window.SD.lock(); },
            unlock: () => { window.SD.unlock(); }
        }

        button.addEventListener('click', (e) => {
            let active_button = document.querySelector('.btn.active');
            if(active_button.classList) active_button.classList.remove('active');

            if( !e.target.classList.contains('active') ) {
                e.target.classList.add('active');

                if( e.target.dataset.hasOwnProperty('action') )
                    buttons_actions[e.target.dataset.action]();
            }
        });
    }

    console.log( 'initiated SwipeDetector object', window.SD );

});



// SD.lock(); - лочим события и открываем скролл
// SD.unlock(); - унлочим событие и закрываем скролл

// SD.destroy();  - ураем слушателей