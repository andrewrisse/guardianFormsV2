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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const express_1 = require("express");
const surveys_1 = require("../../businessLogic/surveys");
const router = express_1.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("V1");
}));
router.get("/surveys", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.user.email;
    console.log(userEmail);
    const userSurveys = yield surveys_1.getAllUsersSurveys(userEmail);
    res.status(200).send(JSON.stringify(userSurveys));
}));
router.post("/surveys", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const { title, description, questions } = req.body;
    if (!title)
        return res.status(400).send('Missing title');
    const surveyData = {
        public: false,
        ownerId: email,
        title,
        description,
        questions
    };
    const newSurvey = yield surveys_1.createSurvey(surveyData);
    res.status(200).send(newSurvey);
}));
router.get("/surveys/:sid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const { sid } = req.params;
    if (!email || !sid)
        res.status(400).send();
    try {
        const survey = yield surveys_1.getSurvey(sid, email);
        res.status(200).send(JSON.stringify(survey));
    }
    catch (err) {
        if (err.message === 'Forbidden') {
            res.status(403).send();
        }
        else if (err.message === "Not Found")
            res.status(404).send();
        res.status(500).send();
    }
}));
router.patch("/surveys/:sid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const { sid } = req.params;
    const updatedFields = req.body;
    if (!email || !sid)
        res.status(400).send();
    try {
        yield surveys_1.updateSurvey(sid, email, updatedFields);
        res.status(200).send();
    }
    catch (err) {
        if (err.message === 'Forbidden') {
            res.status(403).send();
        }
        else if (err.message === "Not Found")
            res.status(404).send();
        res.status(500).send();
    }
}));
router.delete("/surveys/:sid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const { sid } = req.params;
    if (!email || !sid)
        res.status(400).send();
    try {
        const survey = yield surveys_1.deleteSurvey(sid, email);
        res.status(200).send(JSON.stringify(survey));
    }
    catch (err) {
        if (err.message === 'Forbidden') {
            res.status(403).send();
        }
        else if (err.message === "Not Found")
            res.status(404).send();
        res.status(500).send();
    }
}));
exports.IndexRouter = router;
//# sourceMappingURL=index.router.js.map