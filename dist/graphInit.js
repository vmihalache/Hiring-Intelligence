"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const graphBuilder_1 = require("./graphBuilder");
// Create an Express application
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Specify the port number for the server
const port = Number(process.env.PORT) || 3008;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
app.post("/mockJson", async (req, res) => {
    // Execute the Graph!
    console.log("Received request body:");
    console.log(req.body);
    console.log(Object.keys(req.body));
    let result;
    try {
        const incomingThreadId = req.headers["threadid"] || req.headers["thread_id"];
        result = await graphBuilder_1.intelligenceGraph.invoke({
            userQuestion: req.body.userQuestion,
        }, {
            configurable: {
                thread_id: incomingThreadId
            }
        });
        console.log("\n=====START======");
        console.log("Graph result: ", result);
        console.log("\n=====END======");
    }
    catch (error) {
        const details = error instanceof Error ? error.message : String(error);
        console.log("RAW ERROR:", details);
        console.log("RAW ERROR2:", error);
        const messages = {
            numberOfCountries: "Please compare no more than two countries at a time.",
            metricExists: "I couldn't identify a valid metric to compare. Please try a different metric.",
            minimumYear: "The requested years are invalid. Please try again with valid years. The minimum is 2025.",
        };
        const reason = details.replace("Invalid plannerValidator: ", "");
        return res.status(500).json({
            error: messages[reason] ?? "I couldn't process your request. Please try again."
        });
    }
    // res.send("Check the console for the output!");
    res.json(result);
});
//# sourceMappingURL=graphInit.js.map