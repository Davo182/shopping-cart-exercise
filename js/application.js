let counter = 0;
$(document).ready(function () {
    $('#add-item').on('click', addItem);
    $('tbody').on('input', '.quantity', function () {
        $(this).on('input', changeQuantity);
    });
    $('tbody').on('click', '#btn-remove', function () {
        $(this).closest('tr').remove();
        counter--;
    });
    $('#final-price-btn').on('click', calculateFinalPrice);


});

let sumItemsPrices = function () {
    $('tbody tr').each(function () {
        let price = parseFloat($(this).children('.item-price').children('span').text());
        let quantity = parseFloat($(this).children('.item-quantity').children('.quantity').val());
        if (price > 0 & quantity > 0) {
            $(this).children('.final-price').children('span').html((price.toFixed(2) * quantity.toFixed(2)).toFixed(2));
        } else {
            price = 0;
            quantity = 0;
            $(this).children('.final-price').children('span').html((price.toFixed(2) * quantity.toFixed(2)).toFixed(2));
        }
    });
}

let changeQuantity = function () {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        sumItemsPrices();
    }, 500);
}

let addItem = function () {
    let item = $('#item-name').val();
    let price = $('#item-price').val();
    counter++;
    if (item && price) {
        $('tbody').append(`
    <tr>
          <td class="font-weight-bold text-center">#${counter}</td>
          <td class="text-center">${item}</td>
          <td class="item-price text-center">$<span>${price}</span></td>
          <td class="item-quantity text-center"><input class="quantity text-center rounded-pill" type="text" value="1">
          </td>
          <td class="final-price text-center">$<span>${price}</span></td>
          <td><button type="button" id="btn-remove" class="btn btn-outline-danger rounded-pill">remove</button></td>
        </tr>
    `)
    }
}

let calculateFinalPrice = function () {
    if (counter > 0) {
        let finalPrice = $('tbody tr').map(function () {
            return parseFloat($(this).children('.final-price').children('span').text());
        }).get().reduce((ac, act) => ac + act).toFixed(2);
        $('#final-price').html(`$${finalPrice}`);
    }

}

