const end_date = document.querySelector('input');
const clock = document.querySelector('.clock');
const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

end_date.addEventListener('change', getTimeDiff);

let time_interval;
let time_stop = true;

const saved_date = localStorage.getItem('countdown');

if(saved_date) {
    startClock(saved_date);
    let input_value = new Date(saved_date);
    console.log(input_value);
    end_date.valueAsDate = input_value;
}

function getTimeDiff(event) {
    event.preventDefault();
    clearInterval(time_interval);
    const new_end_date = new Date(this.value);
    
    localStorage.setItem('countdown', new_end_date);
    
    startClock(new_end_date);
    time_stop = false;
}

function startClock(date) {
    function updateCounter() {
        let time_left = timeLeft(date);

        if (time_left.total <= 0) {
            time_stop = false;
        }

        for (let prop in time_left) {
            let el = clock.querySelector(`.${prop}`);

            if (el) {
                el.innerHTML = time_left[prop];
            }
        }
    }
    updateCounter();
    if (time_stop) {
        time_interval = setInterval(updateCounter, 1000);
    } else {
        clearInterval(time_interval);
    }
}

function timeLeft(date) {
    let curr_date = new Date();
    let time_diff = Date.parse(date) - Date.parse(curr_date);

    let sec = Math.floor((time_diff / 1000) % 60);
    let min = Math.floor((time_diff / 1000 / 60) % 60);
    let h = Math.floor((time_diff / (1000 * 60 * 60) % 24));
    let d = Math.floor(time_diff / (1000 * 60 * 60 * 24));

    return {
        'total': time_diff,
        'days': d,
        'hours': h,
        'minutes': min,
        'seconds': sec
    }
}
