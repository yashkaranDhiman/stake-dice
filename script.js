let walletMoney = document.querySelector("#wallet-main p");
let localMoney = Number(localStorage.getItem("walletMoney"));
let betInput = document.querySelector("#amount input");
let slider = document.querySelector("#color-slider input");
let btn = document.getElementById("btn");
let multiplierinp = document.getElementById("mlt");
let rollinp = document.getElementById("roll-over-inp");
let winchanceInp = document.getElementById("win-chance-inp");
let model = document.getElementById("all-model");
let note = document.querySelector("#all-model p");
let close = document.getElementById("close");
let overlay = document.querySelector("#overlay");
let manualBtn = document.querySelector("#manual");
let autoBtn = document.querySelector("#auto");
let slide = document.getElementById("slide");
let allAutoComp = document.querySelectorAll(".autoElem");
let winaud = document.getElementById("winaud");
let sliderVal;

function Tggl() {
    manualBtn.addEventListener("click", () => {
        allAutoComp.forEach(e => {
            e.style.display = "none";
            document.getElementById("btn").style.display = "block";
        })
        slide.style.left = "2%";
    })
    autoBtn.addEventListener("click", () => {
        slide.style.left = "52%";
    })
}
Tggl()

function roundToNearestHalf(num) {
    return (Math.round(num * 2) / 2).toFixed(2);
}

function roundToNearestEven(num) {
    let numStr = num.toFixed(4);

    let [integerPart, decimalPart] = numStr.split('.');

    if (parseInt(decimalPart) % 2 !== 0) {
        num -= 0.0001;
    }

    return num.toFixed(4);
}

function handleBet() {
    if (!localMoney) {
        localStorage.setItem("walletMoney", "100");
        walletMoney.innerText = "100";
    } else {
        walletMoney.innerText = localMoney.toLocaleString();
    }
    slider.addEventListener("input", () => {
        sliderVal = slider.value / 100;
        if (sliderVal <= 2) {
            sliderVal = 2
            checkAbove(sliderVal)
        }
        else {
            checkAbove(sliderVal)
        }
    })
    let initalroll = Number(roundToNearestHalf((slider.value / 100)));
    let finalroll = initalroll.toFixed(2);
    rollinp.innerText = finalroll;
    let chances = 100 - rollinp.innerText;
    winchanceInp.innerText = chances.toFixed(2)
}
handleBet()

function checkAbove(val) {
    let initialgotMlt;
    let winchances;
    if (val < 50.50) {
        initialgotMlt = calcover(val)
    }
    else {
        initialgotMlt = calcover(val)
    }
    let finalgotMlt = roundToNearestEven(initialgotMlt)
    if (val == 2) {
        finalgotMlt = 1;
        multiplierinp.value = finalgotMlt;
    }
    else {
        multiplierinp.value = finalgotMlt;
    }
    rollinp.innerText = roundToNearestHalf(val)
    winchances = (100 - rollinp.innerText).toFixed(2);
    winchanceInp.innerText = winchances
}

function calcover(rollover) {
    const rollovers = [];
    const multipliers = [];
    for (let i = 2; i < 99; i++) {
        rollovers.push(i)
    }
    rollovers.forEach(e => {
        let winchance = 100 - e;
        let sholdmltp = Number((99 / winchance).toFixed(4));
        multipliers.push(sholdmltp)
    })

    if (rollover <= rollovers[0]) {
        return multipliers[0];
    }

    for (let i = 0; i < rollovers.length - 1; i++) {
        if (rollover >= rollovers[i] && rollover <= rollovers[i + 1]) {
            const ratio = (rollover - rollovers[i]) / (rollovers[i + 1] - rollovers[i]);
            const exponent = ratio * Math.log(multipliers[i + 1] / multipliers[i]) / Math.log(Math.pow(10, 1));
            return multipliers[i] * Math.pow(10, exponent);
        }
    }

    return multipliers[multipliers.length - 1];
}

function checkDice() {
    let profit;
    let rolloverVal = Number(document.getElementById("roll-over-inp").innerText);
    let multiplierVal = Number(document.getElementById("mlt").value)
    let inputedBet = Number(document.getElementById("money").value);
    let totalMoney = Number(walletMoney.innerText.replace(/,/g, '')); // Remove commas for calculation
    let rn = Math.floor(Math.random() * 10000) / 100;
    if (inputedBet > totalMoney) {
        let note = "Not enough money";
        getNotice(note, "yes")
    }
    else {
        totalMoney = totalMoney - inputedBet;
        if (rn >= rolloverVal) {
            profit = Number(inputedBet * multiplierVal);
            totalMoney += profit;
            walletMoney.innerText = totalMoney.toLocaleString(); // Format with commas
            animateDice(profit, rn)
            localStorage.setItem("walletMoney", totalMoney);
            winaud.volume = .5;
            winaud.play();

        }
        else {
            profit = 0;
            totalMoney = totalMoney + profit;
            walletMoney.innerText = totalMoney.toLocaleString(); // Format with commas
            animateDice(profit, rn)
            localStorage.setItem("walletMoney", totalMoney);
        }
    }
}

function animateDice(profit, rn, speed) {
    let Dice = document.getElementById("main-dice");
    let diceNum = document.querySelector("#main-dice p");
    Dice.style.transition = "all ease-in-out 0.2s";
    if (speed) {
        if (speed === 100 || speed === 10) {
            Dice.style.transition = "";
            winaud.volume = 0;
            winaud.pause();
        }
    }
    if (profit > 0 && speed === 500 || profit > 0 && !speed) {
        winaud.valume = 0.5;
        winaud.play();
    }

    diceNum.innerText = rn;
    Dice.style.left = rn + "%";
    if (profit > 0) {
        diceNum.style.color = "#00E919";
    }
    else {
        diceNum.style.color = "#D71640";
    }

}

function handleButtons() {
    let half = document.getElementById("half");
    let double = document.getElementById("double");
    half.addEventListener("click", () => {
        betInput.value = Number(betInput.value) / 2; // Ensure value is treated as a number
    })
    double.addEventListener("click", () => {
        betInput.value = Number(betInput.value) * 2; // Ensure value is treated as a number
    })
}
handleButtons()

function addModelopen() {
    let close = document.getElementById("close2");
    let addModel = document.getElementById("add-model");
    let addBtn = document.getElementById("add-btn");
    let amount = document.getElementById("cred");
    let secretKey = document.getElementById("secret")
    overlay.style.display = "block";
    addModel.style.left = "50%";
    addBtn.addEventListener("click", () => {
        if (secretKey.value == "99") {
            let currentAmt = localStorage.getItem("walletMoney");
            let afterAmt = Number(currentAmt) + Number(amount.value);
            localStorage.setItem("walletMoney", afterAmt);
            walletMoney.innerText = afterAmt.toLocaleString(); // Format with commas
            addModel.style.left = "-100%";
            overlay.style.display = "none";
        }
        else {
            getNotice("Invalid credentials !", "no")
        }
    })
    close.addEventListener("click", () => {
        addModel.style.left = "-100%";
        overlay.style.display = "none";
    })
}

function getNotice(mssg, screen) {
    if (screen == "yes") {
        overlay.style.display = "block";
    }
    note.innerText = mssg;
    if (screen == "yes") {
        setTimeout(() => {
            overlay.style.display = "none";
        }, 3000);
    }
    tl = gsap.timeline()
    tl.to(model, {
        left: "2%",
        delay: -1,
        duration: .3,
    })
    tl.to("#line", {
        left: "-100%",
        duration: 3,
        ease: "none"
    })
    tl.to(model, {
        left: "-100%",
        duration: .3,
    })
    document.getElementById("line").style.left = 0;
    close.addEventListener("click", () => {
        gsap.to(model, {
            left: "-100%",
            duration: .3,
        })
        if (screen == "yes") {
            overlay.style.display = "none";
        }
    })
}

function auto() {
    let autoBetBtn = document.getElementById("auto-btn");
    let profitDisp = document.getElementById("made-money");
    let timeoutBtn = document.getElementById("timeout-btn");

    let isAutoBetting = false;
    let totalProfit = 0;
    let timeoutDurations = [500, 100, 10];
    let timeoutIndex = 0;
    let timeoutDuration = timeoutDurations[timeoutIndex];

    timeoutBtn.addEventListener("click", () => {
        timeoutIndex = (timeoutIndex + 1) % timeoutDurations.length;
        timeoutDuration = timeoutDurations[timeoutIndex];

        let buttonText;
        if (timeoutDuration === 10) {
            buttonText = "Instant";
        } else if (timeoutDuration === 100) {
            buttonText = "Faster";
        } else if (timeoutDuration === 500) {
            buttonText = "Normal";
        }
        timeoutBtn.innerText = buttonText;
    });



    autoBtn.addEventListener("click", () => {
        allAutoComp.forEach(e => {
            e.style.display = "block";
            document.getElementById("btn").style.display = "none";
        });
    })

    autoBetBtn.addEventListener("click", () => {
        timeoutBtn.style.display = "block";
        let baseBet = Number(document.getElementById("money").value);
        isAutoBetting = !isAutoBetting;
        autoBetBtn.innerText = isAutoBetting ? "Stop Autobet" : "Start Autobet";

        timeoutIndex = 0;
        timeoutDuration = timeoutDurations[timeoutIndex];
        timeoutBtn.innerText = "Normal";

        totalProfit = 0;
        let winCount = 0;
        let looseCount = 0;
        profitDisp.innerText = totalProfit.toLocaleString(); // Format with commas

        let dispWins = document.getElementById("wincount");
        let dispLoose = document.getElementById("loosecount");
        let stoploss = Number(document.getElementById("stop-inp").value);
        let rolloverVal = Number(document.getElementById("roll-over-inp").innerText);
        let multiplierVal = Number(document.getElementById("mlt").value);
        let lootOverlay = document.getElementById("loot-overlay");
        let totalMoney = Number(walletMoney.innerText.replace(/,/g, '')); // Remove commas for calculation

        // Get the strategy
        let storedStrategies = JSON.parse(localStorage.getItem("allStrat"));
        let strat;
        storedStrategies.forEach(e=>{
            if(e.isActive == true){
                strat = e;
            }
        })
        let currentBet = baseBet;

        if (!isAutoBetting) {
            getNotice(`Autobet is Stopped. Total Profit: ${totalProfit.toLocaleString()}`);
            timeoutBtn.style.display = "none";
            return;
        }

        function placeBet() {
            if (!isAutoBetting || totalMoney <= stoploss) {
                lootOverlay.style.display = "none";
                getNotice(`Autobet is Stopped. Total Profit: ${totalProfit.toLocaleString()}`);
                timeoutIndex = 0;
                return;
            }

            lootOverlay.style.display = "block";
            timeoutBtn.style.display = "block";

            let rn = Math.floor(Math.random() * 10000) / 100;
            if (currentBet > totalMoney && isAutoBetting) {
                lootOverlay.style.display = "none";
                timeoutBtn.style.display = "none";
                getNotice("Autobet stopped", "no")
                isAutoBetting = false;
                autoBetBtn.innerText = "Start Autobet";
                return;
            } else {
                totalMoney -= currentBet;
                if (rn >= rolloverVal) {
                    let profit = currentBet * multiplierVal;
                    totalProfit += profit - currentBet; // Update total profit
                    totalMoney += profit;
                    winCount++;
                    walletMoney.innerText = totalMoney.toLocaleString(); // Format with commas
                    winaud.volume = .5;
                    winaud.play();
                    animateDice(profit, rn, timeoutDuration);
                } else {
                    totalProfit -= currentBet; // Deduct bet amount from total profit
                    looseCount++;
                    walletMoney.innerText = totalMoney.toLocaleString(); // Format with commas
                    animateDice(0, rn, timeoutDuration);
                }

                if (strat && strat.isActive) {
                    let allConditions = strat.condition;
                    allConditions.forEach(condition => {
                        if (rn >= rolloverVal && 'win' in condition) {
                            let toDo = condition.win;
                            if (toDo === "reset") {
                                currentBet = baseBet;
                            } else if ('inc' in toDo) {
                                currentBet *= toDo.inc;
                            } else if ('dec' in toDo) {
                                currentBet /= toDo.dec;
                            }
                        } else if (rn < rolloverVal && 'loose' in condition) {
                            let toDo = condition.loose;
                            if (toDo === "reset") {
                                currentBet = baseBet;
                            } else if ('inc' in toDo) {
                                currentBet *= toDo.inc;
                            } else if ('dec' in toDo) {
                                currentBet /= toDo.dec;
                            }
                        }
                    });
                    document.getElementById("money").value = currentBet;
                }

                // Update displays for wins and losses
                dispWins.innerText = winCount.toLocaleString(); // Format with commas
                dispLoose.innerText = looseCount.toLocaleString(); // Format with commas
                profitDisp.innerText = totalProfit.toLocaleString(); // Format with commas
                localStorage.setItem("walletMoney", totalMoney);
            }

            setTimeout(placeBet, timeoutDuration); // Call placeBet again after 0.5 seconds
        }

        placeBet();
    });
}
auto()

function useStratergy() {
    let useBtn = document.getElementById("stratergy");
    let useStratModel = document.getElementById("use-strat-model");
    let dsplStrat = document.getElementById("using");
    let close3 = document.getElementById("close3");

    useBtn.addEventListener("click", () => {
        useStratModel.style.display = "block";
        overlay.style.display = "block";
    });

    close3.addEventListener("click", () => {
        useStratModel.style.display = "none";
        overlay.style.display = "none";
    });

    let createmodel = document.getElementById("create-strat-model");
    let openModelBtn = document.getElementById("create-strat");
    let close4 = document.getElementById("close4");

    openModelBtn.addEventListener("click", () => {
        createmodel.style.display = "block";
    });

    close4.addEventListener("click", () => {
        createmodel.style.display = "none";
    });

    // Add new condition
    document.getElementById("add-condition").addEventListener("click", () => {
        let conditionBox = document.getElementById("condition-box");
        let newCondition = document.createElement("div");
        newCondition.classList.add("condition");

        newCondition.innerHTML = `
            <select name="on" class="design">
                <option value="win">win</option>
                <option value="loose">loose</option>
            </select>
            <div class="bottom-cond">
                <select name="do" class="design hlf">
                    <option value="inc">increase</option>
                    <option value="dec">decrease</option>
                    <option value="reset">reset</option>
                </select>
                <input type="text" class="design hlf" placeholder="times">
            </div>
            <button class="remove-condition">Remove</button>
        `;
        
        // Add event listener to the remove button
        newCondition.querySelector(".remove-condition").addEventListener("click", () => {
            newCondition.remove();
        });

        conditionBox.appendChild(newCondition);
    });

    // Handle the "Done" button click
    document.getElementById("done").addEventListener("click", () => {
        let name = document.getElementById("inp-name").value;
        let conditions = [];
        
        document.querySelectorAll("#condition-box .condition").forEach(conditionDiv => {
            let onCondition = conditionDiv.querySelector('[name="on"]').value;
            let doAction = conditionDiv.querySelector('[name="do"]').value;
            let timesValue = conditionDiv.querySelector('.bottom-cond input').value;

            let condition = {};
            if (doAction === "reset") {
                condition[onCondition] = "reset";
            } else if (doAction === "inc" || doAction === "dec") {
                condition[onCondition] = { [doAction]: parseFloat(timesValue) };
            }
            conditions.push(condition);
        });

        let newStrat = {
            name: name,
            isActive: false,
            condition: conditions
        };

        let storedStrategiesString = localStorage.getItem("allStrat");
        let storedStrategies = storedStrategiesString ? JSON.parse(storedStrategiesString) : [];

        storedStrategies.push(newStrat);

        localStorage.setItem("allStrat", JSON.stringify(storedStrategies));

        document.getElementById("inp-name").value = "";
        document.getElementById("condition-box").innerHTML = "";

        document.getElementById("create-strat-model").style.display = "none";
        overlay.style.display = "none";

        updateStrategyButtons();
    });

    function updateStrategyButtons() {
        let storedStrategiesString = localStorage.getItem("allStrat");
        let storedStrategies = storedStrategiesString ? JSON.parse(storedStrategiesString) : [];
        let allStratsDiv = document.getElementById("all-strats");

        allStratsDiv.innerHTML = "";

        storedStrategies.forEach((strat, index) => {
            let stratBtnDiv = document.createElement("div");
            stratBtnDiv.classList.add("strat-btn");
            stratBtnDiv.id = `strat-btn-${index}`;

            stratBtnDiv.innerHTML = `
                <p>${strat.name}</p>
                <button class="delete-strat"><i class="ri-delete-bin-7-line"></i></button>
            `;

            stratBtnDiv.querySelector("p").addEventListener("click", () => {
                storedStrategies.forEach(s => s.isActive = false);
                strat.isActive = true;
                localStorage.setItem("allStrat", JSON.stringify(storedStrategies));
                dsplStrat.innerText = `Using: ${strat.name}`;
                useStratModel.style.display = "none";
                overlay.style.display = "none";
            });

            stratBtnDiv.querySelector(".delete-strat").addEventListener("click", () => {
                storedStrategies.splice(index, 1);
                localStorage.setItem("allStrat", JSON.stringify(storedStrategies));
                updateStrategyButtons();
            });

            allStratsDiv.appendChild(stratBtnDiv);
        });
    }

    updateStrategyButtons();
}

useStratergy();


