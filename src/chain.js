import Victor from 'victor';
import Segment from './segment';

class Chain {
    constructor(length, segMag, anchor) {
        this.length = length;
        this.anchor = anchor;
        this.segments = [];

        const maxThickness = 10;

        for (var i = 0; i < length; i++) {
            let parent = this.segments[i - 1];
            let parentPos = parent === undefined ? new Victor(300, 300) : parent.b.clone();
            let thickness = maxThickness * (1 - i / length);

            this.segments.push(new Segment(parentPos, segMag, thickness));
        }
    }

    printSegments() {
        for (var i = 0; i < this.segments.length; i++) {
            let segment = this.segments[i];
            console.log(segment);
        }
    }

    getEndVector() {
        let end = this.segments[this.segments.length - 1];
        return end.b.clone();
    }

    moveTowards(x, y) {
        for (var i = this.segments.length - 1; i >= 0; i--) {
            let segment = this.segments[i];
            let child = this.segments[i + 1];
            let target = child === undefined ? new Victor(x, y) : child.a.clone();

            segment.moveTowards(target.x, target.y);
        }

        if (this.anchor !== undefined) {
            this.anchorChainTo(this.anchor.x, this.anchor.y);
        }
    }

    anchorChainTo(x, y) {
        let base = new Victor(x, y);

        for (var i = 0; i < this.segments.length; i++) {
            let segment = this.segments[i];
            let parent = this.segments[i - 1];
            let parentPos = parent === undefined ? base : parent.b.clone();

            segment.anchorTo(parentPos.x, parentPos.y);
        }
    }

    draw(context) {
        for (var i = 0; i < this.segments.length; i++) {
            let segment = this.segments[i];
            segment.draw(context);
        }
    }
}

export default Chain;
