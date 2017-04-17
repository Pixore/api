
const { expect } = require('chai')
const { hexToRgb } = require('../color')

describe('src/components/utils/color.js', () => {
  describe('When hexToRgb function get a hex color', () => {
    it('should return a rgb color', () => {
      expect(hexToRgb('fff')).to.be.deep.equal({r: 255, g: 255, b: 255})
      expect(hexToRgb('ffffff')).to.be.deep.equal({r: 255, g: 255, b: 255})
      expect(hexToRgb('#fff')).to.be.deep.equal({r: 255, g: 255, b: 255})
      expect(hexToRgb('#ffffff')).to.be.deep.equal({r: 255, g: 255, b: 255})
      expect(hexToRgb('#000')).to.be.deep.equal({r: 0, g: 0, b: 0})
      expect(hexToRgb('#000000')).to.be.deep.equal({r: 0, g: 0, b: 0})
      expect(hexToRgb('#00FFFF')).to.be.deep.equal({r: 0, g: 255, b: 255})
      expect(hexToRgb('#0FF')).to.be.deep.equal({r: 0, g: 255, b: 255})
    })
  })
  describe('When hexToRgb function get an invalid hex color', () => {
    it('should return a null', () => {
      expect(hexToRgb('f_f')).to.be.null
      expect(hexToRgb('ffff')).to.be.null
      expect(hexToRgb('56465')).to.be.null
    })
  })
})
