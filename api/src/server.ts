import {app} from "./app";

import {localStoreInstance, mdatabase} from "../../libs/library";

const port = process.env.PORT || 3000;


app.listen(port, async () => {
    await localStoreInstance.init();
    mdatabase.init(true);
    console.log(`API listening at http://localhost:${port}/docs`);
});
