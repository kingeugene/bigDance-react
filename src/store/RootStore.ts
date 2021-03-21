import { createBrowserHistory, History } from "history";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";

const browserHistory: History = createBrowserHistory();
const routingStore: RouterStore = new RouterStore();
export const history = syncHistoryWithStore(browserHistory, routingStore);

class RootStore {
    private router: RouterStore;

    constructor() {
        this.router = routingStore;
    }
}

export default new RootStore();
