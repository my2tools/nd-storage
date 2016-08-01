'use strict'

var $ = require('nd-jquery')
var chai = require('chai')
var expect = chai.expect
var Storage = require('../index')

/* globals describe,it*/
describe('storage', function() {
  it('new storage', function() {
    expect(Storage).to.be.a('function')
    expect(new Storage()).to.be.an('object')
  })

  describe('session storage',  function() {
    var sto = new Storage('YY-', -1)

    it('clear', function() {
      sto.clear()
      expect(sto.keys().length).to.equal(0)
    })

    it('set/get data', function(done) {
      sto.set('x', '890501')
      setTimeout(function(){
        expect(sto.get('x')).to.equal('890501')
        done()
      }, 0)
    })

    it('remove', function() {
      sto.remove('x')
      expect(sto.get('x')).to.equal(null)
    })

    it('expire', function(done) {
      sto.set('y', '890501', 1)
      setTimeout(function(){
        expect(sto.get('y')).to.equal(null)
        done()
      }, 1500)
    })

    it('keys', function(done) {
      sto.clear()
      sto.set('x', '890501')
      sto.set('y', '890501')
      setTimeout(function(){
        expect(sto.keys().length).to.equal(2)
        done()
      }, 0)
    })
  })

  describe('local storage',  function() {
    var sto = new Storage()

    it('clear', function() {
      sto.clear()
      expect(sto.keys().length).to.equal(0)
    })

    it('set/get data', function(done) {
      sto.set('x', '890501')
      setTimeout(function(){
        expect(sto.get('x')).to.equal('890501')
        done()
      }, 0)
    })

    it('remove', function() {
      sto.remove('x')
      expect(sto.get('x')).to.equal(null)
    })

    it('expire', function(done) {
      sto.set('y', '890501', 1)
      setTimeout(function(){
        expect(sto.get('y')).to.equal(null)
        done()
      }, 1500)
    })

    it('keys', function(done) {
      sto.clear()
      sto.set('x', '890501')
      sto.set('y', '890501')
      setTimeout(function(){
        expect(sto.keys().length).to.equal(2)
        done()
      }, 0)
    })
  })
})
