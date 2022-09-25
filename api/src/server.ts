import {app} from "./app";

import {localStoreInstance} from "../../libs/library";
import cors from "cors";

const port = process.env.PORT || 3000;


app.use(
    cors({
        origin: "*",
    })
);

app.listen(port, async () => {
    await localStoreInstance.init();
    console.log(`API listening at http://localhost:${port}/docs`);
});
