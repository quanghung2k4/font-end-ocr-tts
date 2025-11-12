import { ModelType } from "./ModeType";

export class Model {
  /**@type {int} */
  #id;
  /**@type {string} */
  #modelName;
  /**@type {float} */
  #trainingDuration;
  /**@type {Datetime} */
  #startTime;
  /**@type {Datetime} */
  #endTime;
  /**@type {ModelType} */
  #type; // Model
  /**@type {Admin} */
  #admin;     // Admin
  /**@type {Metric []} */
  #metric;    // Metric
  constructor(id = null, modelName= null, trainingDuration= null, startTime= null, endTime= null, modelType= null, admin= null, metric= null) {
    this.#id = id;
    this.#modelName = modelName;
    this.#trainingDuration = trainingDuration;
    this.#startTime = startTime;
    this.#endTime = endTime;
    this.#type = modelType;
    this.#admin = admin;
    this.#metric = metric;
  }

  getId() { return this.#id; }
  setId(id) { this.#id = id; }

  getModelName() { return this.#modelName; }
  setModelName(name) { this.#modelName = name; }

  getTrainingDuration() { return this.#trainingDuration; }
  setTrainingDuration(d) { this.#trainingDuration = d; }

  getStartTime() { return this.#startTime; }
  setStartTime(t) { this.#startTime = t; }

  getEndTime() { return this.#endTime; }
  setEndTime(t) { this.#endTime = t; }

  getModelType() { return this.#type; }
  setModelType(mt) { this.#type = mt; }

  getAdmin() { return this.#admin; }
  setAdmin(a) { this.#admin = a; }

  getMetric() { return this.#metric; }
  setMetric(m) { this.#metric = m; }
}