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
