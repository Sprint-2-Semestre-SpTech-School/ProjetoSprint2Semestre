var idUsuario = sessionStorage.ID_USUARIO;

function showMachineInfo() {
    console.log(idUsuario);
    const machines = document.querySelectorAll(".machine");
    console.log(machines);

    machines.forEach((machine, index) => {
        let divState = false;
        const hardware = machine.querySelector(".infoHardware");
        machine.addEventListener("click", () => {
            console.log("Máquina: " + index);
            if (divState == false) {
                hardware.style.opacity = "1";
                hardware.style.visibility = "visible";
                divState = true;
                machine.style.borderRadius = "2rem 2rem 0 0";
            } else {
                hardware.style.opacity = "0";
                hardware.style.visibility = "hidden";
                divState = false;
                machine.style.borderRadius = "50%";
            }
        });
    });
}

function newMachine() {
    const machines = document.querySelectorAll(".machine");
    const modal = document.querySelector(".modalMachine")
    const close = document.querySelector(".fa-solid fa-circle-xmark fa-3xl");
    const closeButton = document.querySelector("#closeButton");
    const overlay = document.querySelector(".overlay");

    let divState = false;
    if (machines.length > 0) {
        const lastMachine = machines[machines.length - 1];
        lastMachine.addEventListener("click", () => {
            console.log("Clicou na última máquina");
            if (divState == false) {
                modal.style.visibility = "visible";
                modal.style.opacity = "1";
                overlay.style.zIndex = "1";
                divState = true;

                close.addEventListener("click", () => {
                    if (divState == true) {
                        modal.style.visibility = "hidden";
                        modal.style.opacity = "0";
                        overlay.style.zIndex = "-1";
                        divState = false;
                    }
                });
                closeButton.addEventListener("click", () => {
                    if (divState == true) {
                        modal.style.visibility = "hidden";
                        modal.style.opacity = "0";
                        overlay.style.zIndex = "-1";
                        divState = false;
                    }
                });
            }
        });
    }
}

function showData(){
    const calendar = document.querySelector("#data");
    const actualDate = new Date();

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = actualDate.toLocaleDateString('PT-BR', options);

    calendar.textContent = formattedDate;

    dataInterval = setInterval(showData, 24 * 60 * 60 * 1000);
    clearInterval(dataInterval);

    setTimeout(() => {
        timeInterval = setInterval(showData, 24 * 60 * 60 * 1000);
    }, 20 * 60 * 60 * 1000);
}

function showTime(){
    const time = document.querySelector("#time");

    const moment = new Date();
    const hours = moment.getHours().toString().padStart(2, '0');
    const minutes = moment.getMinutes().toString().padStart(2, '0');
    const seconds = moment.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    time.textContent = formattedTime;

    timeInterval = setInterval(showTime, 60000);
    clearInterval(timeInterval);

    setTimeout(() => {
        timeInterval = setInterval(showTime, 60000);
    }, 60000);
}

