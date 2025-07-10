<script lang="ts">
  import "../styles/main.scss";
  import Random from "../utilities/Random";

  class Main {
    protected tankList: Tank[] = [];
    protected grid: HTMLDivElement | null =
      document.querySelector(".main__grid");

    createTank = (x: number, y: number) => {
      if (this.tankList.length >= 10) return;

      const tank = new Tank(x, y, this.grid, this.tankList);
      this.tankList.push(tank);

      tank.appendTank();
      tank.moveTank();
    };

    loadGrid = () => {
      const width = Math.floor(window.innerWidth / 20);
      const height = Math.floor(window.innerHeight / 20);

      const gridVertical = document.querySelector(".main__grid__vertical");
      const gridHorizontal = document.querySelector(".main__grid__horizontal");

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
    tank: HTMLDivElement;
    moveInterval!: number;

    constructor(
      public x: number,
      public y: number,
      private grid: HTMLDivElement | null,
      private tankList: Tank[]
    ) {
      this.tank = document.createElement("div");
    }

    appendTank = () => {
      this.tank.classList.add("main__tank");

      const random = new Random();
      const randomTank = `main__tank-${random.generate(1, 3)}`;
      this.tank.classList.add(randomTank);

      this.tank.style.position = "absolute";
      this.tank.style.top = `${this.y}px`;
      this.tank.style.left = `${this.x}px`;

      this.grid?.appendChild(this.tank);
    };

    moveTank = () => {
      const random = new Random();
      const speed = random.generate(100, 150);

      this.moveInterval = setInterval(() => {
        const dx = random.randomfloat(-1, 1);
        const dy = random.randomfloat(-1, 1);

        this.x += dx + (dx < 0 ? -speed : speed);
        this.y += dy + (dy < 0 ? -speed : speed);

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

      const index = this.tankList.indexOf(this);
      if (index !== -1) {
        this.tankList.splice(index, 1);
      }

      setTimeout(() => {
        this.grid?.removeChild(this.tank);
      }, 1000);
    };
  }

  document.addEventListener("DOMContentLoaded", () => {
    const main = new Main();
    const random = new Random();

    main.loadGrid();

    setInterval(() => {
      for (let i = 0; i < 3; i++) {
        const side = random.generate(1, 2);
        const y = random.generate(0, window.innerHeight - 100);

        const x = side === 1 ? -100 : window.innerWidth + 100;
        main.createTank(x, y);
      }
    }, 1000);
  });
</script>

<div class="main">
  <h1 class="main__title">Tank.io</h1>

  <div class="main__grid">
    <div class="main__grid__vertical"></div>

    <div class="main__grid__horizontal"></div>
  </div>
</div>
