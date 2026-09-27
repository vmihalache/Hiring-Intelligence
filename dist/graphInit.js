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
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
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
        console.error("Error occurred while invoking graph:", error);
        return res.status(500).json({
            error: "Graph execution failed",
            details: error instanceof Error ? error.message : String(error)
        });
    }
    // res.send("Check the console for the output!");
    res.json(result);
});
//# sourceMappingURL=graphInit.js.map