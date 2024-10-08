import ReachableItem from "../ReachableItem.js";

export default class Checkpoint extends ReachableItem {
    static get itemName() { return 'Checkpoint'; }
    static get color() { return '#00f'; }
    static get reachedColor() { return '#aaf'; }
    static get code() { return 'C'; }
}