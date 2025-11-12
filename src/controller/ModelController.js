import { ModelType } from "../model/ModeType";
import { Model } from "../model/Model";

const url1 = "http://localhost:5000/model/getModelByType";
const url2 = "http://localhost:5000/model/updateModel";
const url3 = "http://localhost:5000/model/addModel";

export default class ModelController {
  constructor() {}
  async getModelByType(type) {
    const res = await fetch(url1, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ typeId: type, tbladminid: window.admin_id}),
    });
    const data = await res.json();
    return data.model.map(
      (item) =>
        new Model(
          item.id,
          item.modelName,
          null,
          null,
          null,
          item.type,
          item.admin,
          item.metrics || []
        )
    );
  }
  async updateModel(model) {
    try {
      const res = await fetch(url2, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: {
            id: model.getId(),
            modelName: model.getModelName(),
            startTime: model.getStartTime(),
            endTime: model.getEndTime(),
            admin_id: model.getAdmin(),
            tblmodeltypeid: model.getModelType()|| null
          },
        }),
      });
      const data = await res.json();
      return true;
    } catch (error) {
      return false;
    }
  }
  async addModel(model) {
    try {
      const res = await fetch(url3, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: {
            modelName: model.getModelName(),
          },
        }),
      });
      const data = await res.json();
      return data.id;
    } catch (error) {
      return error;
    }
  }
}
