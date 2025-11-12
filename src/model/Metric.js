export class Metric {
  /**@type {int} */
  #id;
  /**@type {float} */
  #metricValue;
  /**@type {string} */
  #metricName;

  constructor(id, metricValue, metricName) {
    this.#id = id;
    this.#metricValue = metricValue;
    this.#metricName = metricName;
  }

  getId() { return this.#id; }
  setId(id) { this.#id = id; }

  getMetricValue() { return this.#metricValue; }
  setMetricValue(val) { this.#metricValue = val; }

  getMetricName() { return this.#metricName; }
  setMetricName(name) { this.#metricName = name; }
}