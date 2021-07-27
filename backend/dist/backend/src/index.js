"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Allows access to .env file variables
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_router_1 = require("./controllers/v1/index.router");
const authenticator_1 = __importDefault(require("./middleware/authenticator"));
const connectToDb_1 = __importDefault(require("./dataLayer/connectToDb"));
const app = express_1.default();
const PORT = process.env.PORT || 8080;
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(authenticator_1.default);
app.use("/api/v1", index_router_1.IndexRouter);
app.locals.db = connectToDb_1.default();
// Root URI call
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("/api/v1/");
}));
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`press CTRL+C to stop server`);
});
//# sourceMappingURL=index.js.map