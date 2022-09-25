import {timeConvert} from "../helper/TimeConvert";

describe("Convert to Seconds", function () {
    it("1Second to seconds", async function () {
        let text = ["1S", "1s"]
        text.forEach(t => {
            expect(timeConvert(t))
                .toEqual(1)
        })
    });

    it("23Second to seconds", async function () {
        let text = ["23S", "23s"]
        text.forEach(t => {
            expect(timeConvert(t))
                .toEqual(23)
        })
    });

    it("1Minutes to seconds", async function () {
        const text = "1"
        const seconds: number = timeConvert(text)

        expect(seconds).toEqual(60);
    });

    it("50Minutes to seconds", async function () {
        const text = "50"
        const seconds: number = timeConvert(text)

        expect(seconds).toEqual(60 * 50);
    });

    it("2Hours to seconds", async function () {
        let text = ["2H", "2h"]
        text.forEach(t => {
            expect(timeConvert(t))
                .toEqual(60 * 60 * 2)
        })
    });

    it("2Day to seconds", async function () {
        let text = ["2D", "2d"]
        text.forEach(t => {
            expect(timeConvert(t))
                .toEqual(60 * 60 * 24 * 2)
        })
    });


    it("2Week to seconds", async function () {
        let text = ["2W", "2w"]
        text.forEach(t => {
            expect(timeConvert(t))
                .toEqual(60 * 60 * 24 * 7 * 2)
        })
    });


    it("2Month to seconds", async function () {
        let text = ["2M"]
        text.forEach(t => {
            expect(timeConvert(t))
                .toEqual(60 * 60 * 24 * 7 * 30 * 2)
        })
    });

});
