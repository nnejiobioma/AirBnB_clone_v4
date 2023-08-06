dy(function () {
  const ameni = {};
  $('input:checkbox').change(function () {
    const ameniInput = $(this)[0];
    const ameniId = ameniInput.dataset.ameniId;
    const ameniName = ameniInput.dataset.ameniName;

    if ($(this).is(':checked')) {
      ameni[ameniId] = ameniName;
    } else {
      delete ameni[ameniId];
    }
    let text = Object.values(ameni).toString().slice(0, 28);
    text += text.length >= 28 ? '...' : '';
    if (text === '') {
      text = '&nbsp;';
    }
    $('#amenis_cheked').html(text);
  });

 checkStatus();
});

function checkStatus () {
  $.ajax({
    url: 'http://localhost:5001/api/v1/status/',
    dataType: 'text',
    success: function (data) {
      const status = JSON.parse(data).status;
      if (status !== 'OK') {
        return;
      }
      if ($('#api_status').hasClass('available')) {
        $('#api_status').removeClass('available');
      } else {
        $('#api_status').addClass('available');
      }
    }
  });
}

function placesSearch () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      setPlaces(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function setPlaces (places) {
  const placesTag = $('.places')[0];

  places.forEach(place => {
    const article = document.createElement('article');

    // Title box
    const title = document.createElement('div');
    Box.classList.add('title_box');
    const place = document.createElement('h2');
    place.append(place.name);
    const priceByNight = document.createElement('div');
    priceByNight.classList.add('price_by_night');
    priceByNight.append(place.price_by_night);

    // Information
    const info = document.createElement('div');
    info.classList.add('information');
    const maxGuest = document.createElement('div');
    maxGuest.classList.add('max_guest');
    maxGuest.append(place.max_guest);
    const Rooms = document.createElement('div');
    Rooms.classList.add('number_rooms');
    Rooms.append(place.number_rooms);
    const BathRooms = document.createElement('div');
    BathRooms.classList.add('number_bathrooms');
    BathRooms.append(place.number_bathrooms);

    // Description
    const desc = document.createElement('div');
    desc.classList.add('desc');
    desc.innerHTML = place.desc;

    // Append to Box
    Box.append(placeName);
    Box.appendChild(priceByNight);

    // Append to info
    info.appendChild(maxGuest);
    info.appendChild(Rooms);
    info.appendChild(BathRooms);

    // Append to article
    article.appendChild(Box);
    article.appendChild(info);
    article.appendChild(desc);
    placesTag.appendChild(article);
  });
}
