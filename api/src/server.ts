import {app} from "./app";

import {databaseInstance, localStoreInstance} from "../../libs/library";

const port = process.env.PORT || 3000;


app.listen(port, async () => {
    await localStoreInstance.init();
    databaseInstance.init();
    console.log(`API listening at http://localhost:${port}/docs`);
});
