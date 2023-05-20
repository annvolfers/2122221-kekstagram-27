let messageElement;
const ALERT_SHOW_TIME = 5000;

const alertContainer = document.createElement('div');
alertContainer.style.zIndex = 100;
alertContainer.style.position = 'fixed';
alertContainer.style.display = 'grid';
alertContainer.style.gap = '20px';
alertContainer.style.right = 0;
alertContainer.style.bottom = 0;
alertContainer.style.margin = '20px';
document.body.append(alertContainer);

function showMessage(type) {
  messageElement = document.querySelector(`#${type}`)
    .content
    .querySelector(`.${type}`)
    .cloneNode(true);
  const messageButton = messageElement.querySelector(`.${type}__button`);
  document.body.append(messageElement);

  messageElement.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${type}__inner`)) {
      closeMessage();
    }
  });
  messageButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', messageEscKeydownHandler);
}

function closeMessage() {
  messageElement.remove();
  document.removeEventListener('keydown', messageEscKeydownHandler);
}

function messageEscKeydownHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage();
  }
}

function showAlert(text) {
  const alertElement = document.createElement('div');
  alertElement.style.position = 'relative';
  alertElement.style.padding = '20px 25px';
  alertElement.style.backgroundColor = '#ffaa99';
  alertElement.style.borderRadius = '8px';
  alertElement.style.color = 'black';
  alertElement.textContent = text;

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.style.position = 'absolute';
  closeButton.style.top = 0;
  closeButton.style.right = 0;
  closeButton.style.padding = '4px';
  closeButton.style.border = 'none';
  closeButton.style.font = '16px/14px Tahoma, Verdana, sans-serif';
  closeButton.style.color = 'black';
  closeButton.style.backgroundColor = 'transparent';
  closeButton.textContent = '×';
  alertElement.append(closeButton);
  alertContainer.append(alertElement);

  closeButton.addEventListener('click', () => alertElement.remove());

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
}

export { showAlert, showMessage };
