import { ModelType } from "./ModeType"

export class Sample {
  /**@type {int} */
  #id
  /**@type {string} */
  #sampleName
  /**@type {string} */
  #label
  /**@type {string} */
  #filePath
  /**@type {ModelType} */
  #type
  constructor(id = null, sampleName = null, label = null, filePath = null, type = null) {
    this.#id = id;
    this.#sampleName = sampleName;
    this.#label = label;
    this.#filePath = filePath;
    this.#type = type;
  }
  // Getter & Setter cho id
  getId() {
    return this.#id;
  }
  setId(id) {
    this.#id = id;
  }

  // Getter & Setter cho sampleName
  getSampleName() {
    return this.#sampleName;
  }
  setSampleName(name) {
    this.#sampleName = name;
  }

  // Getter & Setter cho label
  getLabel() {
    return this.#label;
  }
  setLabel(label) {
    this.#label = label;
  }

  // Getter & Setter cho filePath
  getFilePath() {
    return this.#filePath;
  }
  setFilePath(path) {
    this.#filePath = path;
  }

  // Getter & Setter cho type
  getType() {
    return this.#type;
  }
  setType(type) {
    this.#type = type;
  }
}
