import { checkIfNan, checkMissingValue, checkPositiveNumber, replacerForUndefined,
    ValidationError, VALIDATION_ERROR_MESSAGE, validateInput } from '../../helpers.js'

describe('checkIfNan', () => {
    describe('should return true', () => {
        test('three', () => {
            const test = checkIfNan('three');
            expect(test).toBe(true);
        });
        test('undefined', () => {
            const test = checkIfNan(undefined);
            expect(test).toBe(true);
        });
    });
    describe('should return false', () => {
        test('3', () => {
            const test = checkIfNan(3);
            expect(test).toBe(false);
        });
        test('0', () => {
            const test = checkIfNan(0);
            expect(test).toBe(false);
        });
        test('-2', () => {
            const test = checkIfNan(-2);
            expect(test).toBe(false);
        });
        test('-0.002', () => {
            const test = checkIfNan(-0.002);
            expect(test).toBe(false);
        });
        test('0.0314E+2', () => {
            const test = checkIfNan(0.0314E+2);
            expect(test).toBe(false);
        });
    });

});

describe('checkMissingValue', () => {
    describe('should return true', () => {
        test('empty string', () => {
            const test = checkMissingValue('');
            expect(test).toBe(true);
        });
        test('null', () => {
            const test = checkMissingValue(null);
            expect(test).toBe(true);
        });
        test('undefined', () => {
            const test = checkMissingValue(undefined);
            expect(test).toBe(true);
        });
        test('false', () => {
            const test = checkMissingValue(false);
            expect(test).toBe(true);
        });
    });
    describe('should return false', () => {
        test('3', () => {
            const test = checkMissingValue(3);
            expect(test).toBe(false);
        });
        test("three", () => {
            const test = checkMissingValue('three');
            expect(test).toBe(false);
        });
        test('true', () => {
            const test = checkMissingValue(true);
            expect(test).toBe(false);
        });
        test('0', () => {
            const test = checkMissingValue(0);
            expect(test).toBe(false);
        })
    });
});

describe('checkPositiveNumber', () => {
    describe('should return true', () => {
        test('3 ', () => {
            const test = checkPositiveNumber(3);
            expect(test).toBe(true);
        });
        test('0.0000001 ', () => {
            const test = checkPositiveNumber(0.0000001);
            expect(test).toBe(true);
        });
    });
    describe('should return false', () => {
        test('0 ', () => {
            const test = checkPositiveNumber(0);
            expect(test).toBe(false);
        });
        test('-3', () => {
            const test = checkPositiveNumber(-3);
            expect(test).toBe(false);
        });
    });
});

describe('validateInput', () => {
    describe('should pass validation', () => {
        test('{ side: 3 }', () => {
            const result = validateInput({ side: 3 });
            expect(result).toStrictEqual({});
        });
        test('{ side: "3" }', () => {
            const result = validateInput({ side: '3' });
            expect(result).toStrictEqual({});
        });
        test('{}', () => {
            const result = validateInput({});
            expect(result).toStrictEqual({});
        });
        test('{ width: 3, height: 2 }', () => {
            const result = validateInput({ width: 3, height: 2 });
            expect(result).toStrictEqual({});
        });
        test('{ width: "3", height: "2" }', () => {
            const result = validateInput({ width: "3", height: "2" });
            expect(result).toStrictEqual({});
        });
    });
    describe('should fail validation', () => {
        test('{ side: "" }', () => {
            try {
                validateInput({ side: "" });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.info).toBeDefined();
                expect(message.info).toBe(VALIDATION_ERROR_MESSAGE);
                expect(message.side).toBeDefined();
                expect(message.side.missing).toBeDefined();
                expect(message.side.notPositive).toBeUndefined();
            }
        });
        test('{ side: undefined }', () => {
            try {
                validateInput({ side: undefined });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.side).toBeDefined();
                expect(message.side.missing).toBeDefined();
                expect(message.side.notPositive).toBeUndefined();
            }
        });
        test('{ side: null }', () => {
            try {
                validateInput({ side: undefined });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.side).toBeDefined();
                expect(message.side.missing).toBeDefined();
                expect(message.side.notPositive).toBeUndefined();
            }
        });
        test('{ side: 0 }', () => {
            try {
                validateInput({ side: 0 });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.side).toBeDefined();
                expect(message.side.missing).toBeUndefined();
                expect(message.side.notPositive).toBeDefined();
            }
        });
        test('{ side: "0" }', () => {
            try {
                validateInput({ side: "0" });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.side).toBeDefined();
                expect(message.side.missing).toBeUndefined();
                expect(message.side.notPositive).toBeDefined();
            }
        });
        test('{ side: -2 }', () => {
            try {
                validateInput({ side: -2 });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.side).toBeDefined();
                expect(message.side.missing).toBeUndefined();
                expect(message.side.notPositive).toBeDefined();
            }
        });
        test('{ side: "-2" }', () => {
            try {
                validateInput({ side: "-2" });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.side).toBeDefined();
                expect(message.side.missing).toBeUndefined();
                expect(message.side.notPositive).toBeDefined();
            }
        });
        test('{ width: 3, height: "" }', () => {
            try {
                validateInput({ width: 3, height: "" });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.width).toBeUndefined();
                expect(message.height).toBeDefined();
                expect(message.height.missing).toBeDefined();
                expect(message.height.notPositive).toBeUndefined();
            }
        });
        test('{ width: 3, height: null }', () => {
            try {
                validateInput({ width: 3, height: null });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.width).toBeUndefined();
                expect(message.height).toBeDefined();
                expect(message.height.missing).toBeDefined();
                expect(message.height.notPositive).toBeUndefined();
            }
        });
        test('{ width: "3", height: null }', () => {
            try {
                validateInput({ width: "3", height: null });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.width).toBeUndefined();
                expect(message.height).toBeDefined();
                expect(message.height.missing).toBeDefined();
                expect(message.height.notPositive).toBeUndefined();
            }
        });
        test('{ width: undefined, height: null }', () => {
            try {
                validateInput({ width: undefined, height: null });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.width).toBeDefined();
                expect(message.width.missing).toBeDefined();
                expect(message.width.notPositive).toBeUndefined();
                expect(message.height).toBeDefined();
                expect(message.height.missing).toBeDefined();
                expect(message.height.notPositive).toBeUndefined();
            }
        });
        test('{ width: "undefined", height: null }', () => {
            try {
                validateInput({ width: "undefined", height: null });
            } catch (err) {
                const { message, name } = err;
                expect(name).toBe(ValidationError.name);
                expect(message.width).toBeDefined();
                expect(message.width.missing).toBeUndefined();
                expect(message.width.notPositive).toBeDefined();
                expect(message.height).toBeDefined();
                expect(message.height.missing).toBeDefined();
                expect(message.height.notPositive).toBeUndefined();
            }
        });
    });
});

describe('replacerForUndefined', () => {
    test('expect undefined values to be filtered with JSON.stringify()', () => {
        const data = { a: undefined, b: false, c: true };
        const result = Object.keys(JSON.parse(JSON.stringify(data))).length;
        expect(result).toBe(2);
    });
    
    test('expect undefined values to NOT be filtered when replace function is passed', () => {
        const data = { a: undefined, b: false, c: true };
        const resultWithReplacer = Object.keys(JSON.parse(JSON.stringify(data, replacerForUndefined))).length;
        expect(resultWithReplacer).toBe(3);
    });
});
