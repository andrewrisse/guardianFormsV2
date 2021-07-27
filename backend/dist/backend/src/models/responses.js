"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const responseSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    response: { type: Number, required: true }
});
const responsesSchema = new mongoose_1.default.Schema({
    responses: { type: [responseSchema], required: true, default: [] },
    ownerId: { type: String, required: true }
});
exports.default = mongoose_1.default.models.Responses || mongoose_1.default.model('Responses', responsesSchema);
//# sourceMappingURL=responses.js.map