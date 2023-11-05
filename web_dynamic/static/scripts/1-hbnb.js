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
});
