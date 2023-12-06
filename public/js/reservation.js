const getDatePicker = (checkDates) => {
    // let start = moment().add(7, 'days');
    // console.log(checkDates)
    // let end = moment().add(36, 'days');
    function cb(start, end) {
        $("#checkin").html(start.format('MMMM D, YYYY'));
        $("#checkout").html(end.format('MMMM D, YYYY'));
        
        noDays = end.diff(start, 'days')+1;
        
        const rate  = parseFloat($("#rate").val());
        const cost = rate * noDays;
        const total = cost + parseFloat($("#fee").val());
        $("#periodCost").html(`$${rate.toFixed(2)} X ${noDays} nights`);
        $("#cost").html(`$${cost.toFixed(2)}`);
        $("#total").html(`$${total.toFixed(2)}`);
        $(".priceInfo").removeClass("d-none");
        $("#reserveBtn").html("Reserve");
    }

    $('#reportrange').daterangepicker({
        // startDate: start,
        // endDate: end,
        "alwaysShowCalendars": true,
        "applyButtonClasses": "btn-outline-primary",
        "cancelClass": "btn-outline-danger",
        "minDate": moment().add(7, 'days'),
        "isInvalidDate": function (date) {
            let check = false;
            for (let datepair of checkDates) {
                if (date.isBetween(datepair[0], datepair[1], 'day', '[]')) {
                    check = true
                    break;
                }
            }
            return check;
            // return true
        },
        // "isCustomDate":function(date){
        // 	return "text-decoration-line-through"
        // },
        // ranges: {
        //     'Next Month': [moment().add(1, 'month').startOf('month'), moment().add(1, 'months').endOf('month')],
        //     'Next Week': [moment().add(1, 'week').startOf('week'), moment().add(1, 'week').endOf('week')],
        // }
    }, cb);

    // cb(start, end);

    // document.getElementById("reportrange").dispatchEvent( new Event('click') );

}


(function ($) {

    "use strict";

    $(document).ready(async function () {
        const listingID = $("#listingID").val();
        // await request('bookings', 'GET', {
        //     listing: listingID,
        //     startCheckDate: new Date()
        // }).then(reservations => {
        //     let checkDates = reservations.map(reservation => {
        //         return [reservation.checkInDate, reservation.checkOutDate]
        //     })
        //     getDatePicker(checkDates);
        // })
        getDatePicker([]);

        $("#reserveBtn").click(function (e) {
            e.preventDefault();
            const id = $("#listingID").val();
            const checkin = $("#checkin").html();
            const checkout = $("#checkout").html();
            const guests = $("#nGuests").val();
            if (isNaN(Date.parse(checkin)) || isNaN(Date.parse(checkout))) {
                document.getElementById("reportrange").dispatchEvent(new Event('click'));
                return
            }
            if(isNaN(guests) || guests<1){
                $("#nGuests").focus();
            }

            // noDays = end.diff(start, 'days')+1;
            // payWithPaystack();
            // window.location.href=`/book/${id}?checkin=${checkin}&checkout=${checkout}&nGuests=${guests}`
            window.location.href=`book.html?id=${id}&checkin=${Date.parse(checkin)}&checkout=${Date.parse(checkout)}&nGuests=${guests}`
        });

    });


})(window.jQuery);