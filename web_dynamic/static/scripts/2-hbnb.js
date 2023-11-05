$(document).ready(function () {
  var amenities = {};
  $('input[type="checkbox"]').change(function () {
    var amenityId = $(this).data('id');
    var amenityName = $(this).data('name');

    if (this.checked) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }
    var amenitiesList = Object.values(amenities).join(' ');
    var $h_four = $('.amenities h4');
    $h_four.text(amenitiesList);
  });

  const url = 'http://0.0.0.0:5001/api/v1/status/';

  $.get(url, (data, textStatus) => {
    if (textStatus === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});

