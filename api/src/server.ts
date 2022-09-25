import {app} from "./app";

import {localStoreInstance} from "../../libs/library";

const port = process.env.PORT || 3000;


app.listen(port, async () => {
    await localStoreInstance.init();
    console.log(`API listening at http://localhost:${port}/docs`);
});
