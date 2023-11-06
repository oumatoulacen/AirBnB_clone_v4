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
    const amenitiesList = Object.values(amenities).join(' ');
    const $h_four = $('.amenities h4');
    $h_four.text(amenitiesList);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', data => {
    if (data.status == 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    },
    success: (data) => {
      data.forEach((place) =>
        $('section.places').append(`<article>
        <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
        <div class="max_guest">${place.max_guest} Guest${
                    place.max_guest !== 1 ? 's' : ''
                }</div>
        <div class="number_rooms">${place.number_rooms} Bedroom${
                    place.number_rooms !== 1 ? 's' : ''
                }</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
                    place.number_bathrooms !== 1 ? 's' : ''
                }</div>
        </div> 
        <div class="description">
        ${place.description}
        </div>
        </article>`
        )
      );
    },
    dataType: 'json'
  });

  $('.btn').on('click', (event) => {
    $('section.places > article').remove();
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: Object.keys(amenities) }, {}),
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        data.forEach((place) =>
          $('section.places').append(`<article>
          <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
          <div class="max_guest">${place.max_guest} Guest${
                      place.max_guest !== 1 ? 's' : ''
                  }</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${
                      place.number_rooms !== 1 ? 's' : ''
                  }</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
                      place.number_bathrooms !== 1 ? 's' : ''
                  }</div>
          </div> 
          <div class="description">
          ${place.description}
          </div>
          </article>`
          )
        );
      },
      dataType: 'json'
    });
  });
});
