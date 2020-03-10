const Countdown = {
  timer: 0,
  init(launchDate) {
    clearInterval(this.timer);
    this.startCountdown(launchDate);
  },
  startCountdown(compareDate) {
    function timeBetweenDates(toDate) {
      const dateEntered = toDate;
      const now = new Date();
      const difference = dateEntered.getTime() - now.getTime();

      if (difference <= 0) {
        document.querySelector('.launch-days').innerText = '';
        document.querySelector('.launch-hours').innerText = '';
        document.querySelector('.launch-minutes').innerText = '';
        document.querySelector('.launch-seconds').innerText = '';

        clearInterval(Countdown.timer);
      } else {
        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        document.querySelector('.launch-days').innerText = `${days} days, `;
        document.querySelector('.launch-hours').innerText = `${hours} hours, `;
        document.querySelector('.launch-minutes').innerText = `${minutes} minutes, `;
        document.querySelector('.launch-seconds').innerText = `${seconds} seconds `;
      }
    }

    timeBetweenDates(compareDate);
    this.timer = setInterval(() => {
      timeBetweenDates(compareDate);
    }, 1000);
  },
};

export default Countdown;
