import {TrainingSession} from "../model/TrainingSession";
import { Sample } from "../model/Sample";
const url1 = "http://localhost:5000/trainingsession/getSampleByModel";
const url2 = "http://localhost:5000/trainingsession/addTrainingSession";
const url3 = "http://localhost:5000/trainingsession/removeTrainingSession";

export default class TrainingSessionController {
  async getSampleByModel(model) {
    const res = await fetch(url1, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelTypeId: model.getModelType(),
        modelId: model.getId(),
        limit: window.currentLimit,
        page: window.currentPage,
      }),
    });
    const data = await res.json()
    window.total = data.total
    return data.trainingSession.map(m=>{
        return new TrainingSession(m.id,model,new Sample(m.sample.id,m.sample.sampleName, m.sample.label,m.sample.filePath,null))
    })
  }
  async addTrainingSession(ts){
    console.log("window.selectAll:", window.selectAll);
    const res = await fetch(url2,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body : JSON.stringify({
            trainingSession:{
                modelId: ts.getModel().getId(),
                sample: [{sampleId: ts.getSample().getId()}

                ]
            },
            selectAll: window.selectAll 
        })
    })
    if(res.status != 200){
      return false
    }
    const data = await res.json();
    
    return true;
  }
  async removeTrainingSession(tsId){
    const res = await fetch(url3,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body : JSON.stringify({
            trainingSessionid: tsId
        })
    })
     if(res.status != 200){
      return false
    }
    const data = await res.json();
    return true;
  }
  
}
