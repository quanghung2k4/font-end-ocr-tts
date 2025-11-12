import React, { useState, useEffect } from "react";
import { Button, Spin, Pagination, Select } from "antd";
import "./RetrainPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import ModelTypeController from "../controller/ModelTypeController";
import ModelController from "../controller/ModelController";
import TrainingSessionController from "../controller/TrainingSessionController";
import { TrainingSession } from "../model/TrainingSession";
import { Sample } from "../model/Sample";

const modelTypeController = new ModelTypeController();
const modelController = new ModelController();
const trainingSessionController = new TrainingSessionController();

function formatDateTime(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    " " +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds())
  );
}

export default function RetrainPage() {
  const [modelType, setModelType] = useState([]);
  const [modelName, setModelName] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainLoading, setTrainLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [removeTrain, setRemoveTrain] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { admin_id } = location.state || {};
  window.admin_id = admin_id;
  // Phân trang
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // lấy model type
  useEffect(() => {
    async function fetchData() {
      await modelTypeController.getAllType().then((data) => {
      const mapdata = data.map((item) => ({
        value: item.getId(),
        label: item.getTypeName(),
      }));
      setModelType(mapdata);
    });
    }
   fetchData()
  }, []);

  // Chọn hoặc bỏ chọn tất cả
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(
        files.map((f) => f.getSample().getId()).filter((id) => id != null)
      );
    }
    window.selectAll = !selectAll; 
    setSelectAll(!selectAll);
  };

  //Chọn riêng từng file
  const handleSelect = (f) => {
    if (selectAll) return;
    const sampleId = f.getSample().getId();
    const trainingSessionId = f.getId();
    if (trainingSessionId === null) {
      let found = removeTrain.find((r) => r.sampleId === sampleId);
      if (found) {
        f.setId(found.trainingSessionId);
        setRemoveTrain((prev) => prev.filter((p) => p.sampleId !== sampleId));

      } else {
        setSelectedFiles((prev) =>
          prev.includes(sampleId)
            ? prev.filter((p) => p !== sampleId)
            : [...prev, sampleId]
        );
      }
    } else {
      f.setId(null);
      var remove = { sampleId: sampleId, trainingSessionId: trainingSessionId };
      setRemoveTrain((prev) =>
        prev.includes(remove) ? [...prev] : [...prev, remove]
      );
    }
  };

  // huấn luyện
  const handleTrain = async () => {
    if (selectedFiles.length === 0) {
      alert("Chọn thêm ít nhất một mẫu để huấn luyện");
      return;
    }
    setTrainLoading(true);
    //them traningsession
    for (var tmp of selectedFiles) {
      const sample = new Sample(tmp);

      await trainingSessionController.addTrainingSession(
        new TrainingSession(null, currentModel, sample)
      );
    }
    // xoa trainingsession
    for(var tmp of removeTrain){
      await trainingSessionController.removeTrainingSession(tmp.trainingSessionId)
    }

    const startTime = new Date();

    const res = await fetch("http://localhost:5000/train/retrain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelId: currentModel.getId(),
        modelName: currentModel.getModelName(),
      }),
    });
    const data = await res.json();
    setTrainLoading(false);
    const endTime = new Date();
    console.log("get Metric:", currentModel);

    navigate("/detail", {
      state: {
        modelName: currentModel.getModelName(),
        modelId: currentModel.getId(),
        metricOld: currentModel.getMetric(),
        metric: data.metric,
        startTime: formatDateTime(startTime),
        endTime: formatDateTime(endTime),
        admin_id: admin_id,
      },
    });
  };
  // type change
  const onChangeType = async (value) => {
    const models = await modelController.getModelByType(value);
    const data = models.map((m) => ({
      value: m.getId(),
      label: m.getModelName(),
      raw: m,
    }));
    setModelName(data);
  };

  //model change
  const onChangeModel = async (value) => {
    const option = modelName.find((o) => o.value == value);
    window.currentPage = page;
    window.currentLimit = limit;
    setCurrentModel(option.raw);
    const trainingSession = await trainingSessionController.getSampleByModel(
      option.raw
    );
    setTotal(window.total);
    setFiles(trainingSession);
    if (selectAll) {
      setSelectedFiles((prev) => [
        ...prev,
        ...trainingSession
          .map((f) => f.getSample().getId())
          .filter((id) => !prev.includes(id)),
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!currentModel) return;
      setLoading(true);
      window.currentPage = page;
      window.currentLimit = limit;
      const trainingSession = await trainingSessionController.getSampleByModel(
        currentModel
      );
      setFiles(trainingSession);
      if (selectAll) {
        setSelectedFiles((prev) => [
          ...prev,
          ...trainingSession
            .map((f) => f.getSample().getId())
            .filter((id) => !prev.includes(id)),
        ]);
      }
      setLoading(false);
    };
    fetchData();
  }, [page, limit, currentModel]);
  window.selectAll = selectAll
  console.log(window.selectAll);
  
  return (
    <div className="train-page">
      <h2 className="train-title">Quản trị viên / Huấn luyện lại</h2>

      <span className="train-select">
        <span> Chọn loại mô hình: </span>
        <Select
          placeholder="Chọn loại mô hình"
          optionFilterProp="label"
          onChange={onChangeType}
          options={modelType}
        />
        <span> Chọn mô hình: </span>
        <Select
          placeholder="Chọn mô hình"
          optionFilterProp="label"
          onChange={onChangeModel}
          options={modelName}
        />
      </span>

      <div className="train-container">
        <div className="train-header">
          <span className="col-sample">Mẫu</span>
          <span className="col-label">Nhãn</span>
          <span
            className="col-select select-all"
            onClick={handleSelectAll}
            style={{ cursor: "pointer", color: "#1890ff" }}
          >
            {selectAll ? "Bỏ chọn tất cả" : "Chọn tất cả"}
          </span>
        </div>

        {loading ? (
          <div className="train-loading">
            <Spin tip="Đang tải danh sách file..." />
          </div>
        ) : (
          <div className="train-list">
            {files.map((f) => (
              <div key={f.getSample().getId()} className="train-item">
                <div className="train-sample">
                  <b>{f.getSample().getSampleName()}</b>
                  <audio
                    controls
                    src={`http://localhost:5000${f.getSample().getFilePath()}`}
                    className="audio-player"
                  />
                </div>
                <div className="train-label">
                  {f.getSample().getLabel() || "Không có nhãn"}
                </div>
                <div className="train-checkbox">
                  <input
                    type="checkbox"
                    checked={
                      f.getId() != null ||
                      selectedFiles.includes(f.getSample().getId())
                    }
                    onChange={() => handleSelect(f)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*Phân trang */}
      <div className="pagination">
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          showSizeChanger
          showTotal={(total) => `Tổng ${total} mẫu`}
          onChange={(p, size) => {
            setPage(p);
            setLimit(size);
          }}
        />
      </div>

      <div className="train-actions">
        <Button
          type="primary"
          loading={trainLoading}
          onClick={handleTrain}
          className="train-btn"
        >
          Huấn luyện
        </Button>
      </div>
    </div>
  );
}
