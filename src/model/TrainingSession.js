import { Model } from "./Model";

export class TrainingSession {
  /**@type {int} */
  #id;
  /**@type {Model} */
  #model;  // Model
  /**@type {Sample} */
  #sample; // Sample
  constructor(id = null, model = null, sample = null) {
    this.#id = id;
    this.#model = model;
    this.#sample = sample;
  }

  getId() { return this.#id; }
  setId(id) { this.#id = id; }
  getModel() { return this.#model; }
  setModel(m) { this.#model = m; }

  getSample() { return this.#sample; }
  setSample(s) { this.#sample = s; }
}