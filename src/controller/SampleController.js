import { Model } from "../model/Model";
import { Sample } from "../model/Sample";

const url1 = "http://localhost:5000/sample/getSampleByType";

export default class SampleController {
    async getSampleByType(type){
        const res = await fetch(url1, {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                typeModelId: type,
                limit: window.limit,
                page: window.page
            }),
            
            
        })
        const data = await res.json()
        window.total = data.total
        return data.sample.map((s)=> new Sample(s.id,s.sampleName,s.label,s.filePath))
    }
}