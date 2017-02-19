import { Network } from "ionic-native";

export class CheckNetwork {
    constructor() {

    }
    checkNetwork() {
        return Network.type;
    }
}