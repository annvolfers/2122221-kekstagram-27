function getData(onSuccess, onFail) {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onFail());
}

function sendData(onSuccess, onFail, body) {
  fetch('https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
}

export { getData, sendData };
