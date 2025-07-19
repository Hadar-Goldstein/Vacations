import { expect } from 'chai';
import { calculate } from '../../src/2-utils/calculate';


describe('Calculate', () => {

  describe('toTitleCase', () => {
    it('should convert a sentence to title case and ignore extra spaces)', () => {
      const result = calculate.toTitleCase("   hello    world  ");
      expect(result).to.equal("Hello World");
    });

    it('should return an empty string when input is empty', () => {
      const result = calculate.toTitleCase("");
      expect(result).to.equal("");
    });

    it('should handle single-word input', () => {
      const result = calculate.toTitleCase("javascript");
      expect(result).to.equal("Javascript");
    });
  });

  describe('capitalizedTitle', () => {
    it('should capitalize every word in the sentence', () => {
      const result = calculate.capitalizedTitle("vacation booking system");
      expect(result).to.equal("Vacation Booking System");
    });

    it('should return the original value if it is empty or falsy', () => {
      expect(calculate.capitalizedTitle("")).to.equal("");
      expect(calculate.capitalizedTitle(null as any)).to.equal(null);
      expect(calculate.capitalizedTitle(undefined as any)).to.equal(undefined);
    });

    it('should handle words with mixed casing', () => {
      const result = calculate.capitalizedTitle("hELLo WoRLd");
      expect(result).to.equal("Hello World");
    });
  });

});
