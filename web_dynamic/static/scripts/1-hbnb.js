$(document).ready(function () {
  const amenities = {};
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }
    const amenitiesList = Object.values(amenities).join(', ');
    const $h_four = $('.amenities h4');
    $h_four.text(amenitiesList);
  });
});
