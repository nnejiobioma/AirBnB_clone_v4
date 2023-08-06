$(document).ready(function () {
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
});
