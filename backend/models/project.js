
const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({

    project_name: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    project_no: { type: String, required:false},
    work_order_no: { type: String, required:false},
    client: { type: String, default:'' },
    budget: { type: String, required:false},
    category: { type: [String], default: [] },
    start_date: { type: String, required: false },
    end_date: { type: String, required: false },
    supervisor: { type: [String], default: [] },
    progress_bar: { type: String, required:false},
    status: { type: String, default: "CREATED" },
    ID: { type: String, required: false, unique: false },
    priority: { type: String, default: "LOW" },
    departments: { type: [String], default: [] },
    assigned_to:{type: String, required:false},
    description: { type: String, required: false, default: "No Description Available!" },

    //task
    task: [{
        task_name: String,
        t_startDate: String,
        t_endDate:String,
        assigned_to: String
      }],

        request:[{
          m_sno: String,
          m_date: String,
          m_name: String,
          m_note: String,
          m_quantity: String
        }],
        receive:[{
          mr_party: String,
          mr_date: String,
          mr_material: String,
          mr_quantity: String,
          mr_note: String,
          mr_challan: String,
          mr_attachment: {
            type: [
                {
                    url: { type: String },
                    file_name: { type: String },
                }
            ], required: false, default: []
        },
        }],

       purchase: [{
          mp_party: String,
          mp_materials: String,
          mp_subtotal: String,
          mp_manualCharge: String,
          mp_overallDiscount: String,
          mp_totalAmount: String,
          mp_paidAmount: String,
          mp_costCode: String,
          mp_reference: String,
          mp_note: String,
          mp_attachment: String
        }],
        

      
    

});

const projectModel = mongoose.model('project', projectSchema);
module.exports = projectModel;