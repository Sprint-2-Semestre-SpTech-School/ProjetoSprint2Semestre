function showMachineInfo() {
    const machines = document.querySelectorAll(".machine")
    console.log(machines);

    machines.forEach((machine, index) => {
        let divState = false;
        const hardware = machine.querySelector(".infoHardware");
        machine.addEventListener("click", () => {
            console.log("Máquina: " + index)
            if (divState == false) {
                hardware.style.opacity = "1";
                hardware.style.visibility = "visible";
                divState = true;
                machine.style.borderRadius = "2rem 2rem 0 0"
            } else {
                hardware.style.opacity = "0";
                hardware.style.visibility = "hidden";
                divState = false;
                machine.style.borderRadius = "50%"
            }
        });
    });
}

function newMachine() {
    const machines = document.querySelectorAll(".machine")
    if (machines.length > 0) {
        const lastMachine = machines[machines.length - 1];
        lastMachine.addEventListener("click", () =>{
            
            console.log("Clicou na última máquina")
        })
    }
}