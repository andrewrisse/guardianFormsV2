"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.questionSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    questionText: { type: String, required: true },
    scaleType: {
        type: String,
        enum: [
            'dichotomous',
            'numericalRating',
            'likert',
            'ranking',
            'semanticDifferential'
        ],
        default: 'likert',
        required: true
    },
    responsesId: { type: String, required: false }
});
exports.default = mongoose_1.default.models.Question ||
    mongoose_1.default.model('Question', exports.questionSchema);
//# sourceMappingURL=question.js.map