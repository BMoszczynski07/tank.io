class Random {
  generate = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  randomfloat = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  constructor() {}
}

export default Random;
