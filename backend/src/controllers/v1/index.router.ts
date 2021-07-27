import {Router, Request, Response} from "express";
import { createSurvey, deleteSurvey, getAllUsersSurveys, getSurvey, updateSurvey } from '../../businessLogic/surveys';

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    res.send("V1");
})

router.get("/surveys", async (req: Request, res: Response) => {
    const userEmail = req.user.email;
    console.log(userEmail)
    const userSurveys = await getAllUsersSurveys(userEmail);
    res.status(200).send(JSON.stringify(userSurveys));
})

router.post("/surveys", async (req: Request, res: Response) => {
    const { email } = req.user;
    const { title, description, questions } = req.body;

    if (!title) return res.status(400).send('Missing title');

    const surveyData = {
        public: false,
        ownerId: email,
        title,
        description,
        questions
    };

    const newSurvey = await createSurvey(surveyData)
    res.status(201).send(newSurvey);
})


router.get("/surveys/:sid", async (req: Request, res: Response) => {
    const {email} = req.user;
    const {sid} = req.params;
    if(!email || !sid) res.status(400).send();

    try{
    const survey = await getSurvey(sid, email);
    res.status(200).send(JSON.stringify(survey));
    }
    catch(err){
        if(err.message === 'Forbidden'){
            res.status(403).send();
        }
        else if(err.message === "Not Found") res.status(404).send();
        res.status(500).send();
    }
})

router.patch("/surveys/:sid", async (req: Request, res: Response) => {
    const {email} = req.user;
    const {sid} = req.params;
    const updatedFields = req.body;

    if(!email || !sid) res.status(400).send();

    try{
        await updateSurvey(sid, email, updatedFields);
        res.status(200).send();
    }
    catch(err){
        if(err.message === 'Forbidden'){
            res.status(403).send();
        }
        else if(err.message === "Not Found") res.status(404).send();
        res.status(500).send();
    }
})

router.delete("/surveys/:sid", async (req: Request, res: Response) => {
    const {email} = req.user;
    const {sid} = req.params;
    if(!email || !sid) res.status(400).send();

    try{
        await deleteSurvey(sid, email);
        res.status(200).send();
    }
    catch(err){
        if(err.message === 'Forbidden'){
            res.status(403).send();
        }
        else if(err.message === "Not Found") res.status(404).send();
        res.status(500).send();
    }
})

export const IndexRouter: Router = router;
