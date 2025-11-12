import React, { useState, useEffect } from "react";
import { Button, Spin, Pagination, Select, Input } from "antd";
import "./RetrainPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import ModelTypeController from "../controller/ModelTypeController";
import ModelController from "../controller/ModelController";
import TrainingSessionController from "../controller/TrainingSessionController";
import { TrainingSession } from "../model/TrainingSession";
import { Sample } from "../model/Sample";
import SampleController from "../controller/SampleController";
import { Model } from "../model/Model";

const modelTypeController = new ModelTypeController();
const sampleController = new SampleController();
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

export default function NewTrainPage() {
  const [modelType, setModelType] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainLoading, setTrainLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentModelType, setCurrentModelType] = useState(null);
  const [currentModel, setCurrentModel] = useState(null);
  const [modelName, setModelName] = useState(null)

  const navigate = useNavigate();
  const location = useLocation();
  const { admin_id } = location.state || {};

  const sample = new Sample()
  // Phân trang
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // lấy model type
  useEffect(() => {
    modelTypeController.getAllType().then((data) => {
      const mapdata = data.map((item) => ({
        value: item.getId(),
        label: item.getTypeName(),
      }));
      setModelType(mapdata);
    });
  }, []);

  // Chọn hoặc bỏ chọn tất cả
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(
        files.map((f) => f.getId()).filter((id) => id != null)
      );
    }
    setSelectAll(!selectAll);
  };

  //Chọn riêng từng file
  const handleSelect = (sampleId) => {
    if (selectAll) return;
    setSelectedFiles((prev) =>
      prev.includes(sampleId)
        ? prev.filter((p) => p !== sampleId)
        : [...prev, sampleId]
    );
  };

  // huấn luyện
  const handleTrain = async () => {
    if (selectedFiles.length === 0) {
      alert("Vui lòng chọn ít nhất một mẫu để huấn luyện!");
      return;
    }
    if (modelName === null) {
      alert("Chưa nhập tên");
      return;
    }
    setTrainLoading(true);
    const id = await modelController.addModel(new Model(null,modelName))
    console.log("id:", id);
    var model = new Model(id,modelName)
    setCurrentModel(model)

    for (var tmp of selectedFiles) {
      const sample = new Sample(tmp);

        await trainingSessionController.addTrainingSession(
            new TrainingSession(null, model, sample)
        );
    }
    const startTime = new Date();
    
    const res = await fetch("http://localhost:5000/train/newtrain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelId: model.getId(),
        modelName: model.getModelName(),
      }),
    });
    const data = await res.json();
    setTrainLoading(false);
    const endTime = new Date();

    navigate("/detailnewtrain", {
      state: {
        modelName: model.getModelName(),
        modelId: model.getId(),
        metric: data.metric,
        startTime: formatDateTime(startTime),
        endTime: formatDateTime(endTime),
        typeModel: currentModelType.value,
        admin_id: admin_id,
      },
    });
  };
  // type change
  const onChangeType = async (value) => {
    window.page = page;
    window.limit = limit;
    const sample = await sampleController.getSampleByType(value);
    console.log(sample);
    setTotal(window.total)

    
    setCurrentModelType(modelType.find((mt) => (mt.value = value)));
    setFiles(sample);
    setLoading(false)
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!currentModelType) return;
      setLoading(true);
      window.page = page;
      window.limit = limit;
      const sample = await sampleController.getSampleByType(
        currentModelType.value
      );
      setFiles(sample);
      if (selectAll) {
        setSelectedFiles((prev) => [
          ...prev,
          ...sample.map((f) => f.getId()).filter((id) => !prev.includes(id)),
        ]);
      }
      setLoading(false);
    };
    fetchData();
  }, [page, limit, currentModelType]);

  const handleName = (e)=>{
    setModelName(e.target.value)    
  }
  return (
    <div className="train-page">
      <h2 className="train-title">Quản trị viên / Huấn luyện</h2>

      <span className="train-select">
        <span> Chọn loại mô hình: </span>
        <Select
          placeholder="Chọn loại mô hình"
          optionFilterProp="label"
          onChange={onChangeType}
          options={modelType}
        />
        <div style={{display:"flex",margin:"5px 5px", gap:"14px"}}>
          <span> Tên mô hình: </span>
          <Input placeholder="Nhập tên mô hình" required onChange={handleName}/>
        </div>
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
              <div key={f.getId()} className="train-item">
                <div className="train-sample">
                  <b>{f.getSampleName()}</b>
                  <audio
                    controls
                    src={`http://localhost:5000${f.getFilePath()}`}
                    className="audio-player"
                  />
                </div>
                <div className="train-label">
                  {f.getLabel() || "Không có nhãn"}
                </div>
                <div className="train-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(f.getId())}
                    onChange={() => handleSelect(f.getId())}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Phân trang */}
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
