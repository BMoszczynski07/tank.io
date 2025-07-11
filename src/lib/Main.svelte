<script lang="ts">
  import "../styles/main.scss";
  import Random from "../utilities/Random";

  class Main {
    constructor() {}

    protected tankList: Tank[] = [];
    protected grid: HTMLDivElement | null =
      document.querySelector(".main__grid");

    createTank = (x: number, y: number) => {
      if (this.tankList.length >= 10) return;

      const tank = new Tank(x, y, this.grid, this.tankList);
      this.tankList.push(tank);

      tank.appendTank();
      tank.moveTank();
      tank.rotateTank();
      tank.shoot();
    };

    loadGrid = () => {
      const width = Math.floor(window.innerWidth / 20);
      const height = Math.floor(window.innerHeight / 20);

      const gridVertical = document.querySelector(".main__grid__vertical");
      const gridHorizontal = document.querySelector(".main__grid__horizontal");

      if (gridVertical) gridVertical.innerHTML = "";
      if (gridHorizontal) gridHorizontal.innerHTML = "";

      for (let i = 0; i < width; i++) {
        const el = document.createElement("span");
        el.classList.add("main__grid-element__vertical");
        gridVertical?.appendChild(el);
      }

      for (let j = 0; j < height; j++) {
        const el = document.createElement("span");
        el.classList.add("main__grid-element__horizontal");
        gridHorizontal?.appendChild(el);
      }
    };
  }

  class Tank {
    tank!: HTMLDivElement;
    moveInterval!: number;
    rotateInterval!: number;
    angle!: number;
    dx!: number;
    dy!: number;
    speed!: number;
    type!: number;

    constructor(
      public x: number,
      public y: number,
      private grid: HTMLDivElement | null,
      private tankList: Tank[]
    ) {}

    shoot = () => {
      switch (this.type) {
        case 1:
          break;

        case 2:
          break;

        case 3:
          break;
      }
    };

    rotateTank = () => {
      const random = new Random();

      this.rotateInterval = setInterval(() => {
        const angle = random.generate(-180, 180);

        this.tank.style.transform = `rotate(${angle}deg)`;
      }, 400);
    };

    appendTank = () => {
      const random = new Random();
      const randomTankNum = random.generate(1, 3);
      this.type = randomTankNum;
      const randomTank = `main__tank-${randomTankNum}`;

      const tankOverlay = document.createElement("div");

      const tank = document.createElement("div");

      tankOverlay.classList.add("main__tank__overlay");

      tank.classList.add("main__tank");
      tank.classList.add(randomTank);

      tankOverlay.appendChild(tank);

      this.grid?.appendChild(tankOverlay);

      this.tank = tankOverlay;
      this.tank.style.position = "absolute";
      this.tank.style.top = `${this.y}px`;
      this.tank.style.left = `${this.x}px`;
    };

    moveTank = () => {
      const random = new Random();
      const speed = random.generate(75, 100);
      this.speed = speed;

      this.moveInterval = setInterval(() => {
        const dx = random.randomfloat(-1, 1);
        const dy = random.randomfloat(-1, 1);

        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const normalizedDx = dx / magnitude;
        const normalizedDy = dy / magnitude;

        this.x += normalizedDx * this.speed;
        this.y += normalizedDy * this.speed;

        this.dx = dx;
        this.dy = dy;

        this.tank.style.left = `${this.x}px`;
        this.tank.style.top = `${this.y}px`;

        if (
          this.x < -100 ||
          this.y < -100 ||
          this.x > window.innerWidth + 100 ||
          this.y > window.innerHeight + 100
        ) {
          this.destroyTank();
        }
      }, 250);
    };

    destroyTank = () => {
      clearInterval(this.moveInterval);
      clearInterval(this.rotateInterval);

      const index = this.tankList.indexOf(this);
      if (index !== -1) {
        this.tankList.splice(index, 1);
      }

      setTimeout(() => {
        this.grid?.removeChild(this.tank);
      }, 1000);
    };
  }

  const submit = (e: Event) => {
    e.preventDefault();
  };

  document.addEventListener("DOMContentLoaded", () => {
    const main = new Main();
    const random = new Random();

    main.loadGrid();

    window.addEventListener("resize", main.loadGrid);

    setInterval(() => {
      for (let i = 0; i < 6; i++) {
        const side = random.generate(1, 2);
        const y = random.generate(0, window.innerHeight - 100);

        const x = side === 1 ? -100 : window.innerWidth;
        main.createTank(x, y);
      }
    }, 1000);
  });
</script>

<div class="main">
  <h1 class="main__title">Tank.io</h1>

  <form on:submit={submit} class="main__game-form">
    <div class="main__form-inputs">
      <div class="main__select-game-mode__overlay">
        <select class="main__select-game-mode">
          <option class="main__game-mode__option" selected>Normal</option>
          <option class="main__game-mode__option">Maze</option>
          <option class="main__game-mode__option">Territory Conquest</option>
          <option class="main__game-mode__option">2 Teams</option>
          <option class="main__game-mode__option">4 Teams</option>
          <option class="main__game-mode__option">Boss</option>
          <option class="main__game-mode__option">Sandbox</option>
        </select>

        <div class="main__select-game-mode__bg"></div>
      </div>

      <div class="main__select-region__overlay">
        <select class="main__select-region">
          <option class="main__region__option" selected>Localhost</option>
        </select>

        <div class="main__select-region__bg"></div>
      </div>
    </div>

    <input type="text" class="main__form-input" placeholder="Type nickname" />

    <div class="main__play-btn__overlay">
      <button type="submit" class="main__play-btn">Play</button>

      <div class="main__play-btn__bg"></div>
    </div>
  </form>

  <div class="main__grid">
    <div class="main__grid__vertical"></div>

    <div class="main__grid__horizontal"></div>
  </div>
</div>
