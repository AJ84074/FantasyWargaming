var fs = require('fs');
var io = require('socket.io').listen(88);

io.on('connection', function(socket) {
    socket.on('roll', function(data){
		if (data.player==''){
			socket.emit('err',{message:'You must enter your name.'});
		} else {
			var pc = {};
			pc.player = data.player;
			pc = createRolls(pc);
			socket.emit('result', pc);
			fs.writeFile(pc.player+'.txt', JSON.stringify(pc), function(err){
				if (err) {
					console.log(err);
				}
			});
		}
	});
});

function createRolls(pc) {
	pc = rollAttrSet(pc);
	return pc;
}

function rollAttrSet(pc) {
	var dice = 4;
	pc.physique = roll(dice);
	pc.heightFemale = (53+pc.physique).formatInchesToFeetAndInches();
	pc.heightMale = (55+pc.physique).formatInchesToFeetAndInches();
	pc.agility = roll(dice);
	pc.endurance = roll(dice);
	pc.weightFemale = (10+(pc.endurance*10));
	pc.weightMale = (30+(pc.endurance*10));
	pc.intelligence = roll(dice);
	pc.faith = roll(dice);
	pc.charisma = roll(dice);
	pc.appearance = roll(dice);
	pc.bravery = roll(dice);
	pc.socialclass = 11;
	pc.leadership = ((2*pc.charisma)+(pc.appearance)+(pc.physique)+(pc.intelligence)+(pc.bravery)+(4*pc.socialclass))/10;
	pc.greed = roll(dice);
	pc.selfishness = roll(dice);
	pc.lust = roll(dice);
	pc.bonus = die(1,6)+die(1,6)-7;
	pc.bogeys = [];
	var numBogeys = die(1,3);
	var bogeyCount = 0;
	var bogeys = [];
	var extraFlag = false;
	for(var i=1;i<=numBogeys;i++) {
		extraFlag = false;
		var r = die(1,100);
		bogeyCount+=1;
		if (r>=(100-bogey.length+1)) {
			var newBogey = bogey[r-(100-bogey.length+1)];
			if(newBogey=='Roll an additional 1d3 bogeys'){
				extraFlag = true;
				var addRolls=die(1,3);
				numBogeys+=addRolls;
			}
			pc.bogeys.push({bogey: '(' + r.pad(2) + ') ' + bogey[r-(100-bogey.length+1)] + ((extraFlag) ? ' (roll was '+ addRolls + ')' : '')});
			if (newBogey.search('\\+2 Agility')!=-1) {
				pc.agility+=2;
console.log('Agility +2');
			}
			if (newBogey.search('\\-2 Agility')!=-1) {
				pc.agility-=2;
console.log('Agility -2');
			}
			if (newBogey.search('\\+2 Appearance')!=-1) {
				pc.appearance+=2;
console.log('Appearance +2');
			}
			if (newBogey.search('\\-2 Appearance')!=-1) {
				pc.appearance-=2;
console.log('Appearance -2');
			}
			if (newBogey.search('\\+2 Bravery')!=-1) {
				pc.bravery+=2;
console.log('Bravery +2');
			}
			if (newBogey.search('\\-2 Bravery')!=-1) {
				pc.bravery-=2;
console.log('Bravery -2');
			}
			if (newBogey.search('\\+2 Charisma')!=-1) {
				pc.charisma+=2;
console.log('Charisma +2');
			}
			if (newBogey.search('\\-2 Charsima')!=-1) {
				pc.charisma-=2;
console.log('Charisma -2');
			}
			if (newBogey.search('\\+2 Endurance')!=-1) {
				pc.endurance+=2;
console.log('Endurance +2');
			}
			if (newBogey.search('\\-2 Endurance')!=-1) {
				pc.endurance-=2;
console.log('Endurance -2');
			}
			if (newBogey.search('\\+2 Faith')!=-1) {
				pc.faith+=2;
console.log('Faith +2');
			}
			if (newBogey.search('\\-2 Faith')!=-1) {
				pc.faith-=2;
console.log('Faith -2');
			}
			if (newBogey.search('\\+2 Intelligence')!=-1) {
				pc.intelligence+=2;
console.log('Intelligence +2');
			}
			if (newBogey.search('\\-2 Intelligence')!=-1) {
				pc.intelligence-=2;
console.log('Intelligence -2');
			}
			if (newBogey.search('\\+2 Physique')!=-1) {
				pc.physique+=2;
console.log('Physique +2');
			}
			if (newBogey.search('\\-2 Physique')!=-1) {
				pc.physique-=2;
console.log('Physique -2');
			}
			if (newBogey.search('\\+2 Greed')!=-1) {
				pc.greed+=2;
console.log('Greed +2');
			}
			if (newBogey.search('\\-2 Greed')!=-1) {
				pc.greed-=2;
console.log('Greed -2');
			}
			if (newBogey.search('\\+2 Lust')!=-1) {
				pc.lust+=2;
console.log('Lust +2');
			}
			if (newBogey.search('\\-2 Lust')!=-1) {
				pc.lust-=2;
console.log('Lust -2');
			}
			if (newBogey.search('\\+2 Selfishness')!=-1) {
				pc.selfishness+=2;
console.log('Selfishness +2');
			}
			if (newBogey.search('\\-2 Selfishness')!=-1) {
				pc.selfishness-=2;
console.log('Selfishness -2');
			}
			// Recalculate Leadership
			pc.leadership = ((2*pc.charisma)+(pc.appearance)+(pc.physique)+(pc.intelligence)+(pc.bravery)+(4*pc.socialclass))/10;
			// Leadership Bonuses
			if (newBogey.search('\\+1 Leadership')!=-1) {
				pc.leadership+=1;
console.log('Leadership +1');
			} 
			if (newBogey.search('\\+2 Leadership')!=-1) {
				pc.leadership+=2;
console.log('Leadership +2');
			} 
			if (newBogey.search('\\-1 Leadership')!=-1) {
				pc.leadership-=-1;
console.log('Leadership -1');
			} 
			if (newBogey.search('\\-2 Leadership')!=-1) {
				pc.leadership-=2;
console.log('Leadership -2');
			} 
		} else {
			pc.bogeys.push({bogey: '(' + r.pad(2) + ') Roll resulted in nothing.'});
		}
	}
	return pc;
}

function roll(n) {
	var a = Array(n);
	for (var i = 0; i < n; i++)
		a[i] = Math.floor(Math.random() * 6) + 1;
	a = a.sort().slice(n - 3, n);
	return a[0] + a[1] + a[2];
}

function die(min, max) {
	return Math.round((Math.random() * (max - min) + min));
}

Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
}

Number.prototype.formatInchesToFeetAndInches = function() {
	var inches = this;
	var feet = Math.floor(inches/12).toFixed(0);
	inches%=12;
	return feet + "'" + inches + "\"";
}

var bogey = [
	"Red Hair : +2 Charisma, +2 Appearance, +2 Bravery, +2 Leadership; you have been touched by the gods; you ignore Ugly or Repulsive",
	"Inept Climber : You can't climb, the best you can do is hold yourself in position",
	"Talented Climber : +2 to all Climbing checks and you climb well",
	"Inept Rider : You can't rind any animal, the best you can do is sit on a mount",
	"Talented Rider :  +2 to all Riding checks and you ride well",
	"Inept Singer : You can't sing at all and not for magical or religious purposes",
	"Talented Singer : +2 to all Singing checks and you sing well",
	"Inept Swimmer : You can't swim and begin to drown as soon as you enter water",
	"Talented Swimmer : +2 to all Swimming checks and you swim well",
	"Inept Thief : You can't steal and are always seen or caught when making any thieving attempt",
	"Talented Thief : +2 to all Stealing checks and you steal well",
	"Inept Tracker : You can't track anything ever",
	"Talented Tracker : +2 to all Tracking checks and you track well",
	"Artless Adventurer : You are not able to take combat levels",
	"Gifted Adventurer : +2 to all combat rolls and rolls to overcome obstacles, you require 1 additional point of damage to be scored to suffer negative effects in combat and never suffer from any specific negative combat effect for longer than 1 round or flurry",
	"Artless Magician : You are not able to take magic levels",
	"Gifted Magician : +2 to all magic rolls, you regain mana at double the normal rate",
	"Artless Miracleworker : You are not able to take religious levels",
	"Gifted Miracleworker : +2 to all religious rolls, piety gains are doubled and piety losses are halved", 
	"Weak : -2 Physique",
	"Strong : +2 Physique",
	"Clumsy : -2 Agility",
	"Agile : +2 Agility",
	"Sickly : -2 Endurance",
	"Healthy : +2 Endurance",
	"Dull : -2 Intelligence",
	"Sharp : +2 Intelligence",
	"Faithless : -2 Faith",
	"Devout : +2 Faith",
	"Shy : -2 Charisma",
	"Affable : +2 Charisma",
	"Ugly : -2 Appearance",
	"Beautiful : +2 Appearance",
	"Craven : -2 Bravery",
	"Fearless : +2 Bravery",
	"Miserly : +2 Greed",
	"Generous : -2 Greed",
	"Narcissistic : +2 Selfishness",
	"Altruistic : -2 Selfishness",
	"Wanton : +2 Lust",
	"Chaste : -2 Lust",
	"Pariah : -2 Leadership",
	"Influential : +2 Leadership",
	"Susceptibility to Alcohol : All alcohol, drugs, narcotics, and poisons take half as much to affect you, half the normal time to affect you, last twice as long, and have double any numerical effects",
	"Resistance to Alcohol : All alcohol, drugs, narcotics, and poisons take twice as much to affect you, take twice as long to affect you, last half as long, and have half any numerical effects",
	"Susceptibility to Fatigue : You take half as long to get fatigued and take twice as long to recover from fatigue",
	"Resistance to Fatigue : You take twice as long to get fatigued and take half as long to recover from fatigue",
	"Susceptibility to Infection : You are highly susceptable to illness and infection",
	"Resistance to Infection : You are highly resistance to illness and infection",
	"Susceptibiity to Pain : All damage received is considered doubled (but not actually doubled) but only for the purposes of remaining conscious or resisting torture",
	"Resistance to Pain : Take half damage (round up) from all sources",
	"Poor Eyesight : -2 Agility, cannot read or see anything clearly beyond 30 feet",
	"Keen Eyesight : You can see twice as far as normal, 50% chance to spot concealed things within 30 feet, immune to visual illusions",
	"Poor Hearing : You can only hear the loudest noises and you never whisper",
	"Keen Hearing : You can hear twice as far as normal, 50% change to hear concealed things within 30 feet, immune to auditory illusions",
	"Poor Smell : You can only smell overwhelming odors",
	"Keen Smell : You can identify famililar things by smell, 50% chance to smell concealed things with a familiar or strong odor within 30 ft, immune to olfactory illusions",
	"Insomnia : Fitful sleeper, always tired, difficult to surprise while sleeping",
	"Like a Log : Sound sleeper able to sleep anywhere under any conditions, very easy to surprise while sleeping",
	"Belligerent : -2 Leadership, takes offense at any and all criticism",
	"Born Leader : +2 Leadership, never takes offense",
	"Weak Mind : Always fails morale and control tests",
	"Strong Mind : Never fails morale or control tests",
	"Bad Luck : -1 on all Luck rolls",
	"Good Luck : +1 on all Luck rolls",
	"Bad with Animals : Animals (non-sentient) do not like you, you cannot own pets, mounts are difficult for you to control, you can never ride well",
	"Good with Animals : Animals (non-sentient) really like you, you easily own pets and can teach them tricks, mounts easily trust and obey you, you can ride and ride well",
	"Inoffensive : You have difficulty inspiring Anger in others, oppoents you target for Anger control tests have a +4 Bravery for the attempt",
	"Taunting : You can easily inspire Anger in others, opponents you target for Anger control tests have a -4 Bravery for the attempt",
	"Bumbler : You have difficulty inspiring Greed in others, opponents you target for Greed control tests have a -4 Greed for the attempt",
	"Grifter : You can easily inspire Greed in others, opponents you target for Greed control tests have a +4 Greed for the attempt",
	"Repulsive : You have difficulty inspiring Lust in others, opponents you target for Lust control tests have a -4 Lust for the attempt",
	"Seductive : You can easily inspire Lust in others, opponents you target for Lust control tests have a +4 Lust for the attempt",
	"Selfishness Penalty : You have difficulty inspiring Selfishness in others, opponents you target for Selfishness control tests have a -4 Selfishness for the attempt",
	"Selfishness Bonus : You can easily inspire Selfishness in others, opponents you target for Selfishness control tests have a +4 Selfishness for the attempt",
	"Haunted : You are haunted by ghosts",
	"Medium : You can see and speak to ghosts",
	"Obsessive Gambler : You will never refuse to bet or game",
	"Sense of Location : You always know true north and your position relative to previous places",
	"Oblivious : You have trouble following activity that is going one around you, you always go last",
	"Aware : You are always able to follow activity that is going on around you, you always go frst",
	"Kleptomania : You always steal small things and must succeed in a Greed control test to keep from stealing any small worthless items around you",
	"Gift of Tongues : You can learn or decipher any written or spoken language or page of inscriptions within a day, you can automatically read and write well, and you can start as a scholar",
	"Psychopath : You enjoy killing so much that must succeed in a Selfishness control test to keep from killing opponents, captives, or anyone that is helpless",
	"Healing Hands : Once per day you can heal 1d6 Endurance on a single target you touch",
	"Phobia : Fear of water, heights, spiders, or snakes so you either can't swim or climb, or you are paralyzed with fear or flee in terror from spiders or snakes",
	"Oracle : As long as you faithfully serve a god or goddess you have been chosen as one of their oracles, you can answer any questions that prove you speak for your god or goddess, and the god or goddess automatically grants all miracles that further their prophecies",
	"Persecuted : Something about you causes people to target you for verbal and physical violence, you are usually the go to target for verbal or physical abuse",
	"Roll an additional 1d3 bogeys",
	"Something Abhorrent (GM may or may not tell you)",
	"Something Wonderful (GM may or may not tell you)"
];
