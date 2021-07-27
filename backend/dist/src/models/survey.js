"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const question_1 = require("./question");
const surveySchema = new mongoose_1.default.Schema({
    public: { type: Boolean, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    ownerId: { type: String, required: true },
    questions: { type: [question_1.questionSchema], default: [], required: false },
    responsesId: { type: String }
});
exports.default = mongoose_1.default.models.Survey || mongoose_1.default.model('Survey', surveySchema);
//# sourceMappingURL=survey.js.map