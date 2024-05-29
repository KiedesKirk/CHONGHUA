class Queue {
    constructor() {
        this.items = [];
        this.processedItems = [];
        this.parkedCars = []; // New array for parked cars
        this.pickupQueue = []; // New array for pick-up queue
    }

    enqueue(item) {
        this.items.push(item);
        this.updateDisplay();
    }

    dequeue() {
        if (this.items.length === 0) {
            alert("Queue is empty");
        } else {
            const processedItem = this.items.shift();
            this.processedItems.push(processedItem);
            this.updateDisplay();
        }
    }

    clearProcessed() {
        this.processedItems = [];
        this.updateProcessedDisplay();
    }

    moveToParked() {
        const parkedCarsElement = document.getElementById('parkedCarsList');
        const readyQueue = this.processedItems;

        if (readyQueue.length === 0) {
            alert("Ready Queue is empty");
        } else {
            const readyItem = readyQueue.shift();
            const parkedCarElement = document.createElement('li');
            parkedCarElement.textContent = readyItem;
            parkedCarsElement.appendChild(parkedCarElement);
            this.parkedCars.push(readyItem); // Add item to parked cars array
            this.updateDisplay();
        }
    }

    enqueuePickup(item) {
        this.pickupQueue.push(item);
        this.updatePickupDisplay();
    }

    readyForPickup() {
        const pickupReadyElement = document.getElementById('pickupReadyList');
        const pickupQueue = document.getElementById('pickupQueueList');
    
        
        if (pickupQueue.children.length === 0) {
            alert("Pick-up queue is empty");
        } else {
            const readyItem = pickupQueue.children[0].textContent;
    
            const readyItemElement = document.createElement('li');
            readyItemElement.textContent = readyItem;
    
            pickupReadyElement.appendChild(readyItemElement);
    
            this.pickupQueue.shift();
    
            this.updatePickupDisplay();
        }
    }
    

    updateDisplay() {
        const queueElement = document.getElementById('parkingQueueList');
        queueElement.innerHTML = '';
        this.items.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.textContent = item;
            queueElement.appendChild(itemElement);
        });

        const processedQueueElement = document.getElementById('processedQueueList');
        processedQueueElement.innerHTML = '';
        this.processedItems.forEach(item => {
            const processedItemElement = document.createElement('li');
            processedItemElement.textContent = item;
            processedQueueElement.appendChild(processedItemElement);
        });
    }

    updateProcessedDisplay() {
        const processedQueueElement = document.getElementById('processedQueueList');
        processedQueueElement.innerHTML = '';
        this.processedItems.forEach(item => {
            const processedItemElement = document.createElement('li');
            processedItemElement.textContent = item;
            processedQueueElement.appendChild(processedItemElement);
        });
    }

    updatePickupDisplay() {
        const pickupQueueElement = document.getElementById('pickupQueueList');
        pickupQueueElement.innerHTML = '';
        this.pickupQueue.forEach(item => {
            const pickupItemElement = document.createElement('li');
            pickupItemElement.textContent = item;
            pickupQueueElement.appendChild(pickupItemElement);
        });
    }
}

const queue = new Queue();

// Add a function to populate the textbox with parked car IDs
function populatePickupTextBox() {
    const pickupTextBox = document.getElementById('pickupTextBox');
    pickupTextBox.value = queue.parkedCars.join(', ');
}

// Call the function when the page loads to populate the textbox initially
populatePickupTextBox();

function enqueue() {
    const newItem = document.getElementById('newParkingItem').value;
    if (newItem.trim() !== '') { // Ensure newItem is not empty
        queue.enqueue(newItem);
        document.getElementById('newParkingItem').value = ''; // Clear the input field after adding
    } else {
        alert("Please enter a valid ID number");
    }
}

function dequeue() {
    queue.dequeue();
}

function clearProcessed() {
    queue.clearProcessed();
}

function moveToParked() {
    queue.moveToParked();
}

function addToPickupQueue() {
    const pickupItemId = parseInt(document.getElementById('pickupItem').value, 10);
    console.log('Input ID:', pickupItemId); // Debugging input

    if (isNaN(pickupItemId)) {
        alert("Please enter a valid parked car ID number");
        return;
    }

    console.log('Parked Cars:', queue.parkedCars); // Debugging parked cars array
    const parkedCarIndex = queue.parkedCars.findIndex(carId => parseInt(carId, 10) === pickupItemId);
    if (parkedCarIndex === -1) {
        alert("No car with the specified ID is available for pick-up.");
        return;
    }

    const parkedCarId = queue.parkedCars.splice(parkedCarIndex, 1)[0];
    queue.enqueuePickup(parseInt(parkedCarId, 10)); // Convert to integer before enqueuing

    const parkedCarsList = document.getElementById('parkedCarsList');
    const parkedCarElements = parkedCarsList.getElementsByTagName('li');
    for (let i = 0; i < parkedCarElements.length; i++) {
        if (parseInt(parkedCarElements[i].textContent, 10) === pickupItemId) {
            parkedCarsList.removeChild(parkedCarElements[i]);
            break;
        }
    }

    document.getElementById('pickupItem').value = '';
}

function readyForPickup() {
    queue.readyForPickup();
}
function retrieveCar() {
    const readyPickupElement = document.getElementById('pickupReadyList');
    const pickedUpCarsElement = document.getElementById('pickupCarsList');

    if (readyPickupElement.children.length === 0) {
        alert("Ready for Pick-up is empty");
    } else {
        const readyItem = readyPickupElement.children[0].textContent;
        const pickedUpCarElement = document.createElement('li');
        pickedUpCarElement.textContent = readyItem;
        pickedUpCarsElement.appendChild(pickedUpCarElement);
        readyPickupElement.removeChild(readyPickupElement.children[0]);
    }
}

