/**
 * Created by ilyapt on 02/10/16.
 */

'use strict';

var scraper = require('../insta-scraper')
        , should = require('should');



describe("getAccountInfo for verified Obama's account", function(){
	var error, json;

	before(function(done){
		scraper.getAccountInfo('barackobama', function(lerror,ljson){
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function(){
		should.not.exist(error);
	});
	it("account id should be 10206720", function(){
		Number(json.id).should.be.equal(10206720);
	});
	it("account should be verified", function(){
		json.is_verified.should.be.true;
	});
	it("media nodes should be array with length is 12", function(){
		json.media.nodes.should.be.instanceof(Array).and.have.lengthOf(12);
	});
});


describe("getAccountInfo for private account", function(){
	var error, json;

	before(function(done){
		scraper.getAccountInfo('charlottedicalypso', function(lerror,ljson){
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function(){
		should.not.exist(error);
	});
	it("account id should be 231709675", function(){
		Number(json.id).should.be.equal(231709675);
	});
	it("account should be private", function(){
		json.is_private.should.be.true;
	});
	it("media nodes should be empty array", function(){
		json.media.nodes.should.be.instanceof(Array).and.have.lengthOf(0);
	});
});


describe("getAccountInfo for empty account", function(){
	var error, json;

	before(function(done){
		scraper.getAccountInfo('shalomharlow', function(lerror,ljson){
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function(){
		should.not.exist(error);
	});
	it("account id should be 1954726141", function(){
		Number(json.id).should.be.equal(1954726141);
	});
	it("account should not be private", function(){
		json.is_private.should.not.be.true;
	});
	it("media nodes should be empty array", function(){
		json.media.nodes.should.be.instanceof(Array).and.have.lengthOf(0);
	});
});


describe("getAccountMedia with max_id for Obama's account", function(){
	var error, json;

	before(function(done){
		scraper.getAccountMedia('barackobama', '1226249064641389716', function(lerror,ljson){
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function(){
		should.not.exist(error);
	});
	it("result should be array with length is 20", function(){
		json.should.be.instanceof(Array).and.have.lengthOf(20);
	});
	it("mediaid of first result should be 1218311842646648471_10206720", function(){
		json[0].id.should.be.equal('1218311842646648471_10206720');
	});
});


describe("getAccountMedia for private account", function(){
	var error, json;

	before(function(done){
		scraper.getAccountMedia('charlottedicalypso', function(lerror,ljson){
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function(){
		should.not.exist(error);
	});
	it("result should be empty array", function(){
		json.should.be.instanceof(Array).and.have.lengthOf(0);
	});
});


describe("getAccountMedia for empty account", function(){
	var error, json;

	before(function(done){
		scraper.getAccountMedia('shalomharlow', function(lerror,ljson){
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function(){
		should.not.exist(error);
	});
	it("result should be empty array", function(){
		json.should.be.instanceof(Array).and.have.lengthOf(0);
	});
});


describe("getMediaByTag with eng tag word", function(){
	var error, json;

	before(function(done){
		scraper.getMediaByTag('cute', function(lerror,ljson){
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function(){
		should.not.exist(error);
	});
	it("top_posts should be array with length is 9", function(){
		json.top_posts.nodes.should.be.instanceof(Array).and.have.lengthOf(9);
	});
	it("media should be array with length greater or equal 12", function(){
		json.media.nodes.should.be.instanceof(Array);
		json.media.nodes.length.should.not.be.below(12);
	});
});


describe("getMediaByTag with rus tag word", function(){
	var error, json;

	before(function(done){
		scraper.getMediaByTag('красотка', function(lerror,ljson){
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function(){
		should.not.exist(error);
	});
	it("top_posts should be array with length is 9", function(){
		json.top_posts.nodes.should.be.instanceof(Array).and.have.lengthOf(9);
	});
	it("media should be array with length greater or equal 12", function(){
		json.media.nodes.should.be.instanceof(Array);
		json.media.nodes.length.should.not.be.below(12);
	});
});


describe("getMediaByLocationId for NY", function(){
	var error, json;

	before(function(done){
		scraper.getMediaByLocationId('212988663', function(lerror,ljson){
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function(){
		should.not.exist(error);
	});
	it("location name should be 'New York, New York'", function(){
		json.name.should.be.equal('New York, New York');
	});
	it("latitude should be 40.7142", function(){
		Number(json.lat).should.be.equal(40.7142);
	});
	it("longitude should be -74.0064", function(){
		Number(json.lng).should.be.equal(-74.0064);
	});
	it("top_posts should be array with length is 9", function(){
		json.top_posts.nodes.should.be.instanceof(Array).and.have.lengthOf(9);
	});
	it("media should be array with length greater or equal 12", function(){
		json.media.nodes.should.be.instanceof(Array);
		json.media.nodes.length.should.not.be.below(12);
	});
});


describe("getMediaByCode for code BIdPmjVht7V", function() {
	var error, json;

	before(function (done) {
		scraper.getMediaByCode('BIdPmjVht7V', function (lerror, ljson) {
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function () {
		should.not.exist(error);
	});
	it("owner's id should be 10206720", function(){
		json.owner.id.should.be.equal('10206720');
	});
	it("media id should be 1305268086987218645", function(){
		json.id.should.be.equal('1305268086987218645');
	});
});


describe("generalSearch for word thebest", function() {
	var error, json;

	before(function (done) {
		scraper.generalSearch('thebest', function (lerror, ljson) {
			error = lerror; json = ljson;
			done();
		});
	});

	it("error should not exist", function () {
		should.not.exist(error);
	});
	it("hashtags should be array", function(){
		json.hashtags.should.be.instanceof(Array);
	});
	it("users should be array", function(){
		json.users.should.be.instanceof(Array);
	});
	it("places should be array", function(){
		json.places.should.be.instanceof(Array);
	});
});


describe("generalQuery for user id 10206720", function() {
	var error, json;

	before(function (done) {
		scraper.generalQuery('ig_user(10206720){id,username,is_verified}'
			, function (lerror, ljson) {
				error = lerror; json = ljson;
				done();
			});
	});

	it("error should not exist", function () {
		should.not.exist(error);
	});
	it("status should be ok", function(){
		json.status.should.be.equal('ok');
	})
	it("username should be barackobama", function () {
		json.username.should.be.equal('barackobama');
	});
	it("account should be verified", function () {
		json.is_verified.should.be.true;
	});
});