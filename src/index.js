(function (w){

    class SwipeDetector {
        static DIRECTIONS = Object.freeze({
            UP: 'up',
            DOWN: 'down',
            LEFT: 'left',
            RIGHT: 'right'
        });

        element = null;
        minimal_swipe_delta = 10;
        swipe_handler = ( direction ) => { console.log(direction); };

        is_lock = false;

        is_debug_on = false;
        debug_container = null;

        // this.updateTmpObject - inciting an object structure
        _tmp = null;

        constructor( options ) {
            let {element, swipe_handler, minimal_swipe_delta} = {...options}

            minimal_swipe_delta = parseInt(minimal_swipe_delta);

            this.element = element;
            if( swipe_handler ) this.swipe_handler = swipe_handler;
            if( minimal_swipe_delta ) this.minimal_swipe_delta = minimal_swipe_delta;

            this.debug_container = document.getElementById('js-ng-swipe_detector-debug_container');

            this.setListeners();
        }

        setListeners() {
            if( this.element ) {
                // Chrome requires { passive: false } when adding event {
                let supportsPassive = false;
                try {
                    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
                        get: function () { supportsPassive = true; }
                    }));
                } catch(e) {}
                let opt = supportsPassive ? { passive: false } : false;
                // }

                this.element.addEventListener('touchstart', this.detectStartListener, opt);
                this.element.addEventListener('touchmove', this.detectMoveListener, opt);
                this.element.addEventListener('touchend', this.detectEndListener, opt);
            }
        }
        unsetListeners() {
            if( this.element ) {
                this.element.removeListener('touchstart', this.detectStartListener);
                this.element.removeListener('touchmove', this.detectMoveListener);
                this.element.removeListener('touchend', this.detectEndListener);
            }
        }

        updateTmpObject() {
            this._tmp = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                },
                delta: {
                    x: 0,
                    y: 0
                },
                direction: null
            };
        }

        detectStartListener = ( event ) => {
            this.updateTmpObject();

            this._tmp.start.x = event.touches[0].screenX;
            this._tmp.start.y = event.touches[0].screenY;

            this.debugMSG( 'detectStartListener', event );
        }
        detectMoveListener = ( event ) => {
            if( !this.is_lock ) event.preventDefault(); // lock user scroll

            this._tmp.end.x = event.touches[0].screenX;
            this._tmp.end.y = event.touches[0].screenY;

            this.debugMSG( 'detectMoveListener', event );
        }
        detectEndListener = ( event ) => {
            this._tmp.delta.x = this._tmp.end.x - this._tmp.start.x;
            this._tmp.delta.y = this._tmp.end.y - this._tmp.start.y;

            if(
                (this._tmp.end.x > 0 || this._tmp.end.y > 0)
                && ((this._tmp.delta.x ** 2 + this._tmp.delta.y ** 2) > this.minimal_swipe_delta ** 2)
            ) {
                this.detectDirection();
                this.doSwipe();
            }

            this.debugMSG( 'detectEndListener', event );
        }

        detectDirection() {
            this._tmp.direction = null;

            if ( this._tmp.delta.y === 0 || Math.abs(this._tmp.delta.x / this._tmp.delta.y) > 1 )
                this._tmp.direction = this._tmp.delta.x > 0 ? SwipeDetector.DIRECTIONS.RIGHT : SwipeDetector.DIRECTIONS.LEFT
            else
                this._tmp.direction = this._tmp.delta.y > 0 ? SwipeDetector.DIRECTIONS.DOWN : SwipeDetector.DIRECTIONS.UP

            this.debugMSG( 'detectDirection', this._tmp.direction );
        }

        doSwipe( ) {
            if( !this.is_lock && typeof this.swipe_handler === 'function' )
                this.swipe_handler( this._tmp.direction );
        }

        debugMSG( ) {
            if( this.is_debug_on ) console.log(arguments);
            if( this.debug_container ) this.debug_container.innerHTML = JSON.stringify( this._tmp, false, 4 );
        }

        destroy() {
            this.unsetListeners();
        }

        lock() { this.is_lock = true; }
        unlock() { this.is_lock = false; }
    }

    if( w ) {
        w.NGSwipeDetector = SwipeDetector;
    }
})( typeof window !== 'undefined' ? window : null );


exports.default = 'NO_EXPORT';