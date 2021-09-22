


(function (w){
    /*
    * package code under
    * */
    const SOME_PACKAGE_CONSTANTS = 'Test NG package constant.';


    if( w ) {
        /*
        * For web.
        * add to window - w.<some_unique_name> = <some_value>;
        * */
        w.NGTest = SOME_PACKAGE_CONSTANTS;
    }else {
        /*
        * For node.
        * add to exports - exports.<some_name> = <some_value>;
        * */
        exports.ng_test = SOME_PACKAGE_CONSTANTS;
    }

})( typeof window !== 'undefined' ? window : null );


exports.default = 'Default package export';