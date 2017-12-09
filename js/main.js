/* Main Javascript File */

var APP = APP || {};

APP.money = APP.money || (function () {
	'use strict';

    const getInfoContainer = document.querySelector('.get-info');
    const formInputs = document.querySelector('.get-info');
    const loaded = document.querySelector('.loaded');
    const broke = document.querySelector('.broke');

	function init() {
        //declare consts and lets
        const button = document.querySelector('#info-btn');
        let dayRate,
            hours,
            actualHours,
            perHourRate;

        //create error message
        let error = document.createElement('p');
        let textnode = document.createTextNode('Oi! you didn\'t fill in all the fields on the form');
        error.appendChild(textnode);

        button.addEventListener('click', (e) => {
            e.preventDefault();
            dayRate = document.querySelector('.day-rate').value;
            hours = document.querySelector('.hours').value;
            actualHours = document.querySelector('.actual-hours').value;

            //work out hourly rate
            perHourRate = (dayRate / actualHours).toFixed(2);

            //check to see in inputs are empty, if so append an error
            if(dayRate === '' || hours === '' || actualHours === '') {
                formInputs.parentNode.insertBefore(error, formInputs.nextSibling).className="error";
            } else {
                if (perHourRate >= 50 ) {
                    loaded.style.display="block";
                    button.style.display="none";
                    getInfoContainer.style.display="none";
                    formInputs.reset();
                    document.querySelector('.good-dosh').innerHTML = '£' + perHourRate;
                    error.parentNode.removeChild(error);

                } else {
                    broke.style.display="block";
                    button.style.display="none";
                    getInfoContainer.style.display="none";
                    formInputs.reset();
                    document.querySelector('.bad-dosh').innerHTML = '£' + perHourRate;
                    error.parentNode.removeChild(error);
                }
            }

        });
    };

    function onceMore() {
        const checkAgainButton = document.querySelector('.check-again');

        checkAgainButton.addEventListener('click', () => {
            loaded.style.display="none";
            broke.style.display="none";
            getInfoContainer.style.display="block";
        });
    };

	return {
        init: init,
        onceMore: onceMore
    };
}());

$(document).ready(function () {
	'use strict';

    APP.money.init();
    APP.money.onceMore();

});
