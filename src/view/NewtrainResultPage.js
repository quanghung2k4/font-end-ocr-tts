import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import "./RetrainResultPage.css";
import MetricController from "../controller/MetricController";
import ModelController from "../controller/ModelController";
import { Model } from "../model/Model";
import { Metric } from "../model/Metric";
import { useEffect } from "react";

const metricController = new MetricController();
const modelController = new ModelController();

export default function NewTrainDetailPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state.metric);
  console.log(state.modelName);
  console.log("model type", state.typeModel);
  console.log(state.modelId);
  console.log(state.startTime);
  console.log(state.endTime);
  console.log(state.admin_id);

  useEffect(() => {
  const addMetrics = async () => {
    for (const metric of state.metric) {
      try {
        await metricController.addMetric(
          new Metric(null, metric.value, metric.name),
          state.modelId
        );
      } catch (err) {
        console.log("Error adding metric:", err);
      }
    }

    try {
      const model = new Model(
        state.modelId,
        state.modelName,
        null,
        state.startTime,
        state.endTime,
        state.typeModel,
        state.admin_id,
        null
      );
      await modelController.updateModel(model);
    } catch (err) {
      console.log(err);
    }
  };

  addMetrics();
}, [state]);

  return (
    <div className="result-page">
      <h2 className="result-title">
        Quản trị viên / Huấn luyện / Kết quả mô hình
      </h2>

      <div className="result-container">
        {/* Tên mô hình */}
        <div className="form-row">
          <h3 style={{ marginRight: "10px" }}>Tên mô hình</h3>
          <Input value={state.modelName} readOnly />
        </div>

        {/* Các metric */}
        <div className="metrics">
          {state.metric.map((m) => (
            <div className="form-row" key={m.name}>
              <p className="label">{m.name}</p>
              <Input value={m.value + (m.name == "Accuracy" || m.name == "Precision" 
                || m.name=="Recall" || m.name == "F1-score" ? " %":"")} readOnly />
            </div>
          ))}
        </div>

        {/* Nút trở lại */}
        <div className="btn-container">
          <Button type="primary" onClick={() => navigate(-1)}>
            Trở lại
          </Button>
        </div>
      </div>
    </div>
  );
}
