import { ModelType } from "../model/ModeType";
import { Metric } from "../model/Metric";

const url1 = "http://localhost:5000/metric/updateMetric";
const url2 = "http://localhost:5000/metric/addMetric";

export default class MetricController {
  constructor() {}
  async updateMetric(metric) {
    try {
      const res = await fetch(url1, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metric: [
            {
              id: metric.getId(),
              metricName: metric.getMetricName(),
              metricValue: metric.getMetricValue(),
            },
          ],
        }),
      });
      const data = await res.json();
      return true;
    } catch (error) {
      return false;
    }
  }
  async addMetric(metric,modelid) {
    try {
      const res = await fetch(url2, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
              metricName: metric.getMetricName(),
              metricValue: metric.getMetricValue(),
              modelId: modelid
           
        }),
      });
      const data = await res.json();
      return true;
    } catch (error) {
      return false;
    }
  }
}
