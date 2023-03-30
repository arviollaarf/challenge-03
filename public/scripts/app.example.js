class App {
  constructor() {
    this.driver;
    this.passenger;
    this.tanggal;
    this.time;

    this.loadButton = document.getElementById("search-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init(filter) {
    this.loadButton.onclick = () => {
      const driver = document.getElementById("driver-type").value == "true";
      const passenger = document.getElementById("passenger-value").value;
      const tanggal = document.getElementById("tanggal").value;
      const time = document.getElementById("time").value;

      this.driver = driver;
      this.passenger = parseInt(passenger);
      this.tanggal = tanggal;
      this.time = time;

      this.load();
    };
  }

  run = () => {
    if (Car.list.length > 0) {
      Car.list.forEach((car) => {
        const node = document.createElement("div");
        node.className = "col-md-4";
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    } else {
      const warn = document.createElement("div");
      warn.className = "col-md-12";
      warn.innerHTML = `<div class="card mx-auto" style="width: 25rem; background-color: #fccccc">
       <div class="card-body">
       <h5 class="card-title text-center my-auto" style="font-size: 15px;"> Data Tidak Ada!</h5>
        </div>
       </div>`;
      this.carContainerElement.appendChild(warn);
    }
  };

  //load data cars from json
  async load() {
    let combineDate = new Date(`${this.tanggal} ${this.time}`);
    let cars;
    if (isNaN(this.passenger)) {
      cars = await Binar.listCars(
        (a) => a.available === this.driver && a.availableAt > combineDate
      );
    } else {
      cars = await Binar.listCars(
        (a) =>
          a.available === this.driver &&
          a.capacity == this.passenger &&
          a.availableAt > combineDate
      );
    }

    Car.init(cars);
    this.clear();
    this.run();
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
