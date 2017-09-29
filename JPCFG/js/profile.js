function qs(search_for1,search_for2) {
		var query = window.location.search.substring(1);
		var parms = query.split('&');
		var results =[];
		for (var i=0; i<parms.length; i++) {
			var pos = parms[i].indexOf('=');
			if (pos > 0  && search_for1 == parms[i].substring(0,pos)) {
				results.push(parms[i].substring(pos+1));
			}
			if (pos > 0  && search_for2 == parms[i].substring(0,pos)) {
				results.push(parms[i].substring(pos+1));
			}
		}
		console.log(results);
		return results;
	}

$( document ).ready(function() {
  var results = qs('id','type');
	if (results[1] == 'receiver') {
		if (results[0] == 1) {
			$('#name').text('Alice Tay');
			$('#contactNumber').text('81143567');
			$('#address').text('#12-03, Block 10, Serangoon Ave, Singapore 356875');
			$('#kidDetailField').removeClass('hidden');
			$('#kidDetail').text('6-year-old boy');
			$('#fee').text('8 to 10 per hour');
			$('#age').text('29');
			$('#img').attr('src','./img/Alice.jpg');
		}
		if (results[0] == 2) {
			$('#name').text('Michelle Lee');
			$('#contactNumber').text('98765432');
			$('#address').text('Tampines Street 10, #02-13, Singapore 414212');
			$('#kidDetailField').removeClass('hidden');
			$('#kidDetail').text('2-year-old boy');
			$('#fee').text('10 per hour');
			$('#age').text('35');
			$('#img').attr('src','./img/michelle.jpg');
		}
		if (results[0] == 3) {
			$('#name').text('Ava Wong');
			$('#contactNumber').text('96672312');
			$('#address').text('Hougang Avenue 3, #03-15, Singapore 530123');
			$('#kidDetailField').removeClass('hidden');
			$('#kidDetail').text('1-year-old boy');
			$('#fee').text('10 per hour');
			$('#age').text('31');
			$('#img').attr('src','./img/avawong.jpg');
		}
	} else {
		if (results[0] == 2) {
			$('#name').text('Shi Kai Ng');
			$('#contactNumber').text('91234567');
			$('#address').text('10 Eunos Road 8, #05-33, Tampines avenue 1, Singapore 408600');
			$('#numOfKidsField').removeClass('hidden');
			$('#numOfKids').text('2');
			$('#descriptionField').removeClass('hidden');
			$('#description').text(' ');
			$('#age').text('26');
			$('#ratingField').removeClass('hidden');
			$('#rating').html('&#11088 &#11088');
			$('#img').attr('src','./img/shikai.jpg');
			$('#fee').text('15 per hour');
		}
		if (results[0] == 5) {
			$('#name').text('Guan Hoe');
			$('#contactNumber').text('93482934');
			$('#address').text('12-01, 14 Queen Street ,Singapore 12345');
			$('#numOfKidsField').removeClass('hidden');
			$('#numOfKids').text('1');
			$('#descriptionField').removeClass('hidden');
			$('#description').text('no kids between age 2 - 8');
			$('#age').text('22');
			$('#ratingField').removeClass('hidden');
			$('#rating').html('&#11088 &#11088 &#11088');
			$('#img').attr('src','./img/guanhoe.jpg');
			$('#fee').text('10 per hour');
		}
		if (results[0] == 6) {
			$('#name').text('Ying Nan');
			$('#contactNumber').text('93482934');
			$('#address').text('12-01, 14 Queen Street ,Singapore 12345');
			$('#numOfKidsField').removeClass('hidden');
			$('#numOfKids').text('1');
			$('#descriptionField').removeClass('hidden');
			$('#description').text('no kids between age 2 - 8');
			$('#age').text('22');
			$('#ratingField').removeClass('hidden');
			$('#rating').html('&#11088 &#11088 &#11088 &#11088');
			$('#img').attr('src','./img/yingnan.jpg');
			$('#fee').text('10 per hour');
		}
		if (results[0] == 7) {
			$('#name').text('Foo Liang Hong');
			$('#contactNumber').text('93482934');
			$('#address').text('79 Anson Road #10-03 Anson Road, Singapore 079906');
			$('#numOfKidsField').removeClass('hidden');
			$('#numOfKids').text('1');
			$('#descriptionField').removeClass('hidden');
			$('#description').text('I have a cat. I have 10 years of experience in baby sitting. I will make sure your children gets the best care possible');
			$('#age').text('33');
			$('#ratingField').removeClass('hidden');
			$('#rating').html('&#11088 &#11088 &#11088 &#11088 &#11088');
			$('#img').attr('src','./img/fooliang.jpg');
			$('#fee').text('5 per hour');
		}
	}
});
